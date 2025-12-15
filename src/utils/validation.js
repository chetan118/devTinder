const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
    throw new Error("Invalid Name");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateProfileEditData = function (req) {
  const allowedUpdateFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isValidEditRequest = Object.keys(req.body).every((field) =>
    allowedUpdateFields.includes(field)
  );
  return isValidEditRequest;
};

module.exports = { validateSignupData, validateProfileEditData };
