const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/send/interested/:userId", userAuth, async (req, res) => {
  try {
    // Logic for sending connection request
    const userId = req.params.userId;
    const requestedUser = await User.findById(userId);
    if (!requestedUser) {
      throw new Error("Requested User not found");
    }
    res.send(
      req.user.firstName +
        " sent a connection request to " +
        requestedUser.firstName
    );
  } catch (err) {
    res.status(400).send("Failed to send connection request - " + err.message);
  }
});

module.exports = { requestRouter };
