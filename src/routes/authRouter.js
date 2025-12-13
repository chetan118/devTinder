const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { User } = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000),
      httpOnly: true,
    });
    const userObj = savedUser.toObject();
    delete userObj.password;
    res.json({ message: "User Saved to the Database", data: userObj });
  } catch (err) {
    res.status(400).send("Failed to save User to the Database " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email Address " + emailId);
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000),
      httpOnly: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("Failed to login - " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully");
});

module.exports = { authRouter };
