const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 150,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 48,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      minLength: 4,
      maxLength: 10,
      lowercase: true,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender is not supported - {VALUE}",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691051.jpg",
      validate(photoUrl) {
        try {
          new URL(photoUrl);
        } catch (e) {
          throw new Error(`${photoUrl} is not a valid url!`);
        }
      },
    },
    about: {
      type: String,
      default: "Hi, I'm new on DevTinder!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
