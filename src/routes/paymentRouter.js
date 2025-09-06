const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { razorpayInstance } = require("../utils/razorpay");

const paymentRouter = express.Router();

paymentRouter.post("/create", userAuth, async (req, res) => {
  try {
    console.log("Payment Creation Logic");
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
    // save the order in the database
    console.log(order);
    // return back the order details to the frontend from where this endpoint was called
    res.json({ order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = { paymentRouter };
