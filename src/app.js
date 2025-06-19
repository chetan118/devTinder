const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

app.post("/signup", async (req, res) => {
  // create a new instance of the User Model
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@abc.com",
    password: "virat@123",
  });
  try {
    await user.save();
    res.send("User Saved to the Database");
  } catch (err) {
    res.status(400).send("Failed to save User to the Database " + err.message);
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
