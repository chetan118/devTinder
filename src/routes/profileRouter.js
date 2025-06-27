const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const { User } = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Failed to fetch profile - " + err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid edit request");
    }
    const user = req.user;
    Object.keys(req.body).forEach(
      (field) => (req.user[field] = req.body[field])
    );
    await user.save();
    res.json({
      message: `${user.firstName}, your profile has been updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("Failed to update profile - " + err.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const isOldPasswordValid = await user.validatePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new Error("Invalid credentials");
    }
    if (!validator.isStrongPassword(req.body.newPassword)) {
      throw new Error("Please use a strong new password");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;
    await user.save();
    res.json({
      message: `${user.firstName}, your password has been updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("Failed to update password - " + err.message);
  }
});

module.exports = { profileRouter };
