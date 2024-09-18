const Brand = require("../Models/BrandModel");
require("dotenv").config();
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");

exports.show = asyncErrorHandler(async (req, res) => {
  const data = await Brand.find({});

  return sendResponse(res, "Brands Retrived successfully", data);
});

exports.store = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const data = Brand.create(req.body);

  return sendResponse(res, "Brand saved successfully", data);
});

exports.update = asyncErrorHandler(async (req, res) => {

  ValidationErrorHandler(req);

  const id = req.params.id;

  const data = await Brand.updateOne({ _id: id }, req.body);

  return sendResponse(res, "Brand updated successfully", data);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Brand.deleteOne({ _id: id });

  return sendResponse(res, "Brand deleted successfully", data);
});
