const User = require("../Models/UserModel");
require("dotenv").config();
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const CustomError = require("./../Utils/CustomError");
const jwt = require("jsonwebtoken");
const sendEmailVerificationMail = require("../Utils/EmailVerificationMail");
const PasswordResetToken = require("../Models/PasswordResetToken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

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
  const userId = user._id;
  const email = user.email;
  const token = signToken(userId);

  sendEmailVerificationMail(token, email, userId);

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

exports.verifyEmail = asyncErrorHandler(async (req, res, next) => {
  const { token, userId } = req.body;

  
  const tokenData = await PasswordResetToken.findOne({ user_id: userId }).limit(1).sort({ $natural: -1 });

  if (!tokenData) {
    const error = new CustomError("Something went wrong, Please Try again !", 500);
    return next(error);
  }

  if (tokenData.token != token) {
    const error = new CustomError("Invalid token !", 401);
    return next(error);
  }

  if (!tokenData) {
    const error = new CustomError("User not found !", 401);
    return next(error);
  }

  const user = await User.updateOne({ _id: userId }, { $set: { status: true } });

  const deleteToken = await PasswordResetToken.deleteMany({ user_id: userId });

  if (user.acknowledged && deleteToken.acknowledged) {
    return sendResponse(res, "Email Verified successfully !", 401);
  }
});
