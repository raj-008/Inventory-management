const Brand = require("../Models/BrandModel");
require("dotenv").config();
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const GetLoggedInUser = require("../Utils/GetLoggedInUser");
const CustomError = require("../Utils/CustomError");

exports.show = asyncErrorHandler(async (req, res) => {

  const user = await GetLoggedInUser(req);
  const userId = user._id;
  
  const data = await Brand.find({ user_id: userId });
  
  return sendResponse(res, "Brands Retrived successfully", data);
});

exports.store = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const input = req.body;
  input.user_id = userId;

  const brand = await Brand.findOne({ name: input.name, user_id : userId });

  if(brand) throw new CustomError("Brand already exist", 404);

  const data = Brand.create(input);

  return sendResponse(res, "Brand saved successfully", data);
});

exports.edit = asyncErrorHandler(async (req, res) => {
  const data = await Brand.findById(req.params.id);

  return sendResponse(res, "Brand Retrived successfully", data);
});

exports.update = asyncErrorHandler(async (req, res) => {

  ValidationErrorHandler(req);

  const id = req.params.id;
  const input = req.body;

  const brand = await Brand.findOne({ name: input.name, _id: { $ne: id } });

  if(brand) throw new CustomError("Brand already exist", 404);
  
  const data = await Brand.updateOne({ _id: id }, input);

  return sendResponse(res, "Brand updated successfully", data);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Brand.deleteOne({ _id: id });

  return sendResponse(res, "Brand deleted successfully", data);
});
