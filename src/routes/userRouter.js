const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const { ConnectionRequest } = require("../models/connectionRequest");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: `Fetched all pending connection requests for ${loggedInUser.firstName}`,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error fetching connection requests - " + err.message);
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: `Accepted connections for ${loggedInUser.firstName}`,
      data: data,
    });
  } catch (err) {
    res.status(400).send("Error fetching connections - " + err.message);
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
