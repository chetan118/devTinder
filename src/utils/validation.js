const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;
  if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
    throw new Error("Invalid Name");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
  if (skills && (!Array.isArray(skills) || skills.length > 10)) {
    throw new Error("Skills must be an array with at most 10 items");
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
