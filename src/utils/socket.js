const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat.js");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    },
  });

  /**
   * Generates a deterministic SHA-256 room ID for a pair of users.
   * Sorting IDs ensures the same room is used regardless of who initiates.
   * @param {string} userId
   * @param {string} targetUserId
   * @returns {string} hex-encoded SHA-256 hash
   */
  const getSecretRoomId = (userId, targetUserId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("_"))
      .digest("hex");
  };

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " joined the room " + roomId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        if (!text || !text.trim()) return;
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " : " + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text: trimmedText,
          });
          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, lastName, text: trimmedText });
        } catch (err) {
          console.log("Error saving message to the database", err);
        }
      }
    );
    socket.on("disconnect", () => { console.log("Socket disconnected:", socket.id); });
  });
};

module.exports = { initializeSocket };
