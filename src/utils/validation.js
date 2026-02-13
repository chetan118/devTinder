const validator = require("validator");

const MAX_SKILLS = 10;

/**
 * Validates signup request data.
 * Checks: firstName and lastName are non-empty, emailId is a valid email,
 * password meets strength requirements, and skills (if provided) is an array of ≤10 items.
 * @throws {Error} if any validation rule fails
 */
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;
  if (!firstName || !firstName.trim()) {
    throw new Error("First name is required");
  }
  if (!lastName || !lastName.trim()) {
    throw new Error("Last name is required");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
  if (skills && (!Array.isArray(skills) || skills.length > MAX_SKILLS)) {
    throw new Error("Skills must be an array with at most 10 items");
  }
};

/**
 * Validates profile edit request data.
 * Only allows updates to: firstName, lastName, emailId, age, gender, photoUrl, about, skills.
 * @returns {boolean} true if all fields are in the allowed list
 */
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
