const Category = require("../Models/CategoryModel");
require("dotenv").config();
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const GetLoggedInUser = require("../Utils/GetLoggedInUser");
const CustomError = require("../Utils/CustomError");

exports.show = asyncErrorHandler(async (req, res) => {

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const data = await Category.find({ user_id : userId });

  return sendResponse(res, "Categories Retrived successfully", data);
});

exports.store = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const input = req.body;
  input.user_id = userId;

  const category = await Category.findOne({ name: input.name, user_id : userId });

  if(category) throw new CustomError("Category already exist", 404);

  const data = await Category.create(input);

  return sendResponse(res, "Category saved successfully", data);
});

exports.edit = asyncErrorHandler(async (req, res) => {
  const data = await Category.findById(req.params.id);

  return sendResponse(res, "Categories Retrived successfully", data);
});

exports.update = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const input = req.body;
  const id = req.params.id;

  const category = await Category.findOne({ name: input.name, user_id : userId, _id: { $ne: id } });

  if(category) throw new CustomError("Category already exist", 404);

  const data = await Category.updateOne({ _id: id }, input);

  return sendResponse(res, "Category updated successfully", data);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Category.deleteOne({ _id: id });

  return sendResponse(res, "Category deleted successfully", data);
});
