const socket = require("socket.io");
const crypto = require("crypto");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

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
    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " : " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = { initializeSocket };
