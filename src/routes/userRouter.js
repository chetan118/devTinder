const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const { ConnectionRequest } = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName age gender photoUrl about skills"
    );
    res.json({
      message: `Fetched all pending connection requests for ${loggedInUser.firstName}`,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error fetching connection requests - " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
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
