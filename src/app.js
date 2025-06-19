const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("Admin Data Sent");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User Deleted by Admin");
});

app.get("/user/login", (req, res) => {
  res.send("User Login Page");
});

app.get("/user/:userId", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.delete("/user/:userId", userAuth, (req, res) => {
  res.send("User Deleted");
});

app.listen(7777, () => {
  console.log("Server is running and listening on port 7777...");
});
