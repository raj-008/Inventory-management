const Category = require("../Models/CategoryModel");
require("dotenv").config();
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");

exports.show = asyncErrorHandler(async (req, res) => {
  const data = await Category.find({});

  return sendResponse(res, "Categories Retrived successfully", data);
});

exports.store = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const { name } = req.body;

  const data = await Category.create({ name: name });

  return sendResponse(res, "Category saved successfully", data);
});

exports.edit = asyncErrorHandler(async (req, res) => {
  const data = await Category.findById(req.params.id);

  return sendResponse(res, "Categories Retrived successfully", data);
});

exports.update = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const id = req.params.id;

  const data = await Category.updateOne({ _id: id }, req.body);

  return sendResponse(res, "Category updated successfully", data);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Category.deleteOne({ _id: id });

  return sendResponse(res, "Category deleted successfully", data);
});
