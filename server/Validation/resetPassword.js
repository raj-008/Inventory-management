const { body } = require("express-validator");

const resetPassword = () => {
  return [
    body("password").notEmpty().withMessage("Password is required"),
    body("cpassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords & Confirm password do not match");
        }

        return true;
      }),
  ];
};

module.exports = {
  resetPassword,
};
