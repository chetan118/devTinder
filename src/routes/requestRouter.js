const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const { ConnectionRequest } = require("../models/connectionRequest");

const requestRouter = express.Router();

const sendEmail = require("../utils/sendEmail");

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;
    const allowedStatuses = ["ignored", "interested"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status: ${status}`,
      });
    }
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
      });
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();

    if (status === "interested") {
      const subject = `A new request from ${req.user.firstName}`;
      const body = `${req.user.firstName} is ${status} in ${toUser.firstName}`;
      const emailRes = await sendEmail.run(subject, body);
      console.log(emailRes);
    }

    res.json({
      message:
        status === "ignored"
          ? `${req.user.firstName} has ${status} ${toUser.firstName}`
          : `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to send connection request - " + err.message });
  }
});

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatuses = ["accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status: " + status });
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate(
      "fromUserId",
      "firstName lastName age gender photoUrl about skills"
    );
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
      message:
        "Connection request from " +
        connectionRequest.fromUserId.firstName +
        " was " +
        status,
      data,
    });
  } catch (err) {
    res
      .status(400)
      .send("Failed to review the connection request - " + err.message);
  }
});
module.exports = { requestRouter };
