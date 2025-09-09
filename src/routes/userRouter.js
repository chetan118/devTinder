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
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set().add(loggedInUser._id.toString());
    connectionRequests.forEach((connectionRequest) => {
      hideUsersFromFeed.add(connectionRequest.toUserId.toString());
      hideUsersFromFeed.add(connectionRequest.fromUserId.toString());
    });
    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.json({
        message: "Users fetched successfully",
        page,
        no_of_users: users.length,
        users,
      });
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

userRouter.get("/ispremium", userAuth, async (req, res) => {
  try {
    const user = req.user.toJSON();
    if (user.isPremium) {
      return res.json({ isPremium: true });
    }
    return res.json({ isPremium: false });
  } catch (err) {
    res.status(400).send("Error checking if user is premium " + err.message);
  }
});

module.exports = { userRouter };
