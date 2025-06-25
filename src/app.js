const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

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
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000),
    });
    res.send("User successfully logged in");
  } catch (err) {
    res.status(400).send("Failed to login " + err.message);
  }
});

app.get("/profile", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Failed to fetch profile - " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    // Logic for sending connection request
    res.send(req.user.firstName + " sent a connection request");
  } catch (err) {
    res.status(400).send("Failed to send connection request - " + err.message);
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
