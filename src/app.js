const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

app.use(express.json()); // middleware for converting JSON data in req.body to JS object

app.post("/signup", async (req, res) => {
  // create a new instance of the User Model
  const user = new User(req.body);
  try {
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
