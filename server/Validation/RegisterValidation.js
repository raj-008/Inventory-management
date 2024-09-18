const { body } = require("express-validator");
const User = require("../Models/UserModel");

const RegisterValidation = () => {
  return [
    body("fname").notEmpty().withMessage("First Name is required"),
    body("lname").notEmpty().withMessage("Last Name is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter correct email")
      .custom(async (value, { req }) => {
        if (value) {
          const user = await User.findOne({ email: value });
          if (user) {
            throw new Error("Email is already exists");
          }
        }
        return true;
      }),
    body("phone")
      .optional()
      .custom(async (value, { req }) => {
        if (value) {
          const user = await User.findOne({ phone: value });
          if (user) {
            throw new Error("Phone number is already exists");
          }
        }
        return true;
      }),
    body("company").notEmpty().withMessage("Company Name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("cpassword")
      .notEmpty()
      .withMessage("Consfirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords & Confirm password do not match");
        }
        return true;
      }),
  ];
};

module.exports = {
  RegisterValidation,
};
