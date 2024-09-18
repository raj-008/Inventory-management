const { body } = require("express-validator");

const loginValidation = () => {
  return [body("email").notEmpty().isEmail().withMessage("Invalid Email Address"), body("password").notEmpty().withMessage("Password is required")];
};

module.exports = {
  loginValidation,
};
