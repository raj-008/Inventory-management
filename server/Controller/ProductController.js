const Product = require("../Models/ProductModel");
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.read = asyncErrorHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brands",
      },
    },
    {
      $unwind: "$categories",
    },
    {
      $unwind: "$brands",
    },
    {
      $project: {
        name: 1,
        qty: 1,
        unit: 1,
        description: 1,
        category_id: 1,
        amount: 1,
        brand_id: 1,
        createdAt: 1,
        updatedAt: 1,
        categories: {
          _id: 1,
          name: 1,
          status: 1,
        },
        brands: {
          _id: 1,
          name: 1,
          status: 1,
        },
      },
    },
  ]);

  return sendResponse(res, "Products retraived successfully", products);
});

exports.create = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const product = await Product.create(req.body);

  return sendResponse(res, "Product Created Successfully", product);
});

exports.edit = asyncErrorHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: { _id: new ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brands",
      },
    },
    {
      $unwind: "$categories",
    },
    {
      $unwind: "$brands",
    },
    {
      $project: {
        name: 1,
        qty: 1,
        unit: 1,
        description: 1,
        amount: 1,
        category_id: 1,
        brand_id: 1,
        createdAt: 1,
        updatedAt: 1,
        categories: {
          _id: 1,
          name: 1,
          status: 1,
        },
        brands: {
          _id: 1,
          name: 1,
          status: 1,
        },
      },
    },
  ]);

  const singleProduct = products.length > 0 ? products[0] : null;

  return sendResponse(res, "Product retraived successfully", singleProduct);
});

exports.update = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const product = await Product.updateOne({ _id: req.params.id }, req.body);

  return sendResponse(res, "Product updated successfully", product);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const product = await Product.deleteOne({ _id: req.params.id });

  return sendResponse(res, "Product deleted successfully", product);
});
