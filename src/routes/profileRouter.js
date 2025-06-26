const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Failed to fetch profile - " + err.message);
  }
});

module.exports = { profileRouter };
