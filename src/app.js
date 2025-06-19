const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth");

const app = express();

app.get("/getUserData", (req, res) => {
  // try {
  // fetch user data from DB
  throw new Error("Some error occurred while fetching user data from DB");
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send("Something went wrong");
  // }
});

app.use("/", (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Something went wrong 2");
});

app.listen(7777, () => {
  console.log("Server is running and listening on port 7777...");
});
