const User = require("../../Models/UserModel");
const { sendResponse } = require("../../Utils/ResponseUtils");
const asyncErrorHandler = require("../../Utils/asyncErrorHandler");

exports.getUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });

  return sendResponse(res, "Users retrived successfully", users);
});

exports.userStatus = asyncErrorHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  user.status = !user.status;
  await user.save();

  return sendResponse(res, "User status updated successfully", user);
});

exports.userDetails = asyncErrorHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  return sendResponse(res, "User details retraived successfully", user);
});
