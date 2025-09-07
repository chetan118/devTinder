const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { instance: razorpayInstance } = require("../utils/razorpay.js"); // destructure and rename the razorpay instance object
const { Payment } = require("../models/payment");

const paymentRouter = express.Router();

paymentRouter.post("/create", userAuth, async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        firstName: "value1",
        lastName: "value2",
        membershipType: "silver",
      },
    });
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON() });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = { paymentRouter };
