const express = require("express");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();

paymentRouter.post("/create", userAuth, async (req, res) => {
  console.log("Payment Creation Logic");
});

module.exports = { paymentRouter };
