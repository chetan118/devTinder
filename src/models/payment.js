const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
