const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/feed", userAuth, async (req, res) => {
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

module.exports = { userRouter };
