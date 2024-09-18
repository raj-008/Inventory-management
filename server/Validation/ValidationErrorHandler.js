const { validationResult } = require("express-validator");
const CustomError = require("../Utils/CustomError");

module.exports = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }

  return req;
};
