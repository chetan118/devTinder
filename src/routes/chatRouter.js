const express = require("express");
const { Chat } = require("../models/chat");
const { User } = require("../models/user");
const { userAuth } = require("../middlewares/auth");

const chatRouter = express.Router();

chatRouter.get("/fetch/:targetUserId", userAuth, async (req, res) => {
  const userId = req.user._id;
  const { targetUserId } = req.params;
  try {
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    return res.status(404).json({ message: "User not found" });
  }
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json({ ...chat.toObject(), messages: chat.messages.slice(-100) });
  } catch (err) {
    res.status(400).json({ msg: "Error fetching chat history" });
  }
});

module.exports = { chatRouter };
