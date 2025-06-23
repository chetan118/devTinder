const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

app.use(express.json()); // middleware for converting JSON data in req.body to JS object

app.post("/signup", async (req, res) => {
  try {
    const ALLOWED_FIELDS = ["firstname", "lastname", "password", "emailId"];

    const isAllowedSignUp = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isAllowedSignUp) {
      throw new Error(`Allowed Fields -> [${ALLOWED_FIELDS.slice()}]`);
    }
    // create a new instance of the User Model
    const user = new User(req.body);
    await user.save();
    res.send("User Saved to the Database");
  } catch (err) {
    res.status(400).send("Failed to save User to the Database " + err.message);
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
