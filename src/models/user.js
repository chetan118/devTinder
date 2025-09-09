const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      validate(emailId) {
        if (!validator.isEmail(emailId)) {
          throw new Error("Invalid Email Address: " + emailId);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      validate(password) {
        if (!validator.isStrongPassword(password)) {
          throw new Error("Enter a strong password");
        }
      },
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
      validate(photoUrl) {
        if (!validator.isURL(photoUrl)) {
          throw new Error("Invalid Photo URL: " + photoUrl);
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
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DevTinderSecretKey", {
    expiresIn: "7d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
