const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/user/:userId/:name/:pass", (req, res) => {
  console.log(req.params);
  res.send({ firstname: "Akshay", lastname: "Saini" });
});

app.listen(7777, () => {
  console.log("Server is running and listening on port 7777...");
});
