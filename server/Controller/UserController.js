const User = require("../Models/UserModel");
// const bcrypt = require("bcrypt");
require("dotenv").config();
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const CustomError = require("./../Utils/CustomError");
const jwt = require("jsonwebtoken");

exports.create = asyncErrorHandler(async (req, res, next) => {
  ValidationErrorHandler(req);

  const { password, cpassword, ...otherData } = req.body;

  if (password !== cpassword) {
    const error = new CustomError("Password and confirm password do not match!", 401);
    return next(error);
  }

  if (typeof password !== "string") {
    const error = new CustomError("Password must be a string", 401);
    return next(error);
  }

  const user = await User.create(req.body);

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });

  return sendResponse(res, "Data saved successfully", { token, user });
});

exports.read = asyncErrorHandler(async (req, res) => {
  const data = await User.find({ status: { $eq: 1 } });
  return sendResponse(res, "Data retrived successfully", data);
});

exports.update = asyncErrorHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  const data = await User.updateOne({ _id: id }, rest);

  return sendResponse(res, "Data updated successfully", data);
});

exports.delete = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;
  const data = await User.deleteOne({ _id: id });

  return sendResponse(res, "Data deleted successfully", data);
});
