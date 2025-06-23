const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); // middleware for converting JSON data in req.body to JS object
app.use(cookieParser()); // middleware for parsing cookies in requests

app.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Saved to the Database");
  } catch (err) {
    res.status(400).send("Failed to save User to the Database " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email Address " + emailId);
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id }, "DevTinderSecretKey");
    res.cookie("token", token);
    res.send("User successfully logged in");
  } catch (err) {
    res.status(400).send("Failed to login " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedToken = await jwt.verify(token, "DevTinderSecretKey");

    const { _id } = decodedToken;
    if (!_id) {
      throw new Error("UserId not found");
    }
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Failed to fetch profile - " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.get("/userById", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.body.userId });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send("User has been deleted");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const ALLOWED_UPDATES = ["gender", "photoUrl", "about", "skills"];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error(`Allowed Updates -> [${ALLOWED_UPDATES.slice()}]`);
    }
    if (req.body.skills.length > 10) {
      throw new Error("No more than 10 skills allowed per user");
    }
    const user = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      console.log("User Before Update", user);
      res.send("User has been updated");
    }
  } catch (err) {
    res.status(400).send("User Update Failed: " + err.message);
  }
});

app.patch("/userByEmail", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body,
      { runValidators: true }
    );
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      console.log("User Before Update", user);
      res.send("User has been updated");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.put("/userByEmail", async (req, res) => {
  try {
    // maybe we should use findOneAndReplace for put requests
    const user = await User.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body,
      { upsert: true, runValidators: true }
    );
    if (!user) {
      res.status(404).send("User Not Found, new user created");
    } else {
      console.log("User Before Update", user);
      res.send("User has been updated");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is running and listening on port 7777...");
    });
  })
  .catch(() => {
    console.log("Database connection failed!!!");
  });
