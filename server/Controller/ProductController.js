const Product = require("../Models/ProductModel");
const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const mongoose = require("mongoose");
const CustomError = require("../Utils/CustomError");
const xlsx = require("xlsx");
const Brand = require("../Models/BrandModel");
const Category = require("../Models/CategoryModel");
const path = require("path");
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

exports.import = asyncErrorHandler(async (req, res) => {

  const fileObj = req.file;
  
  if (!fileObj) {
    throw new CustomError("File is not uploded", 404);
  }

  const extension = path.extname(fileObj.originalname).toLowerCase();
  
  if (extension != ".xlsx" && extension != ".xls") {
    throw new CustomError("File should be .xlsx or .xls only", 404);
  }

  // read excel data 
  const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  resData = [];

  for(const data of jsonData) {

    const {["Product Name"]: productName, Category: category,Brand: brand,Quantity: qty, Price: price, Unit: unit, Description: description} = data;  // convert Column name to field name

    if(productName == "" || category == "" || brand == "" || qty == "" || price == "") continue;

    const brandData =  await Brand.findOne({ name: brand });
    if(!brandData) continue;

    const categoryData = await Category.findOne({ name: category });
    if(!categoryData) continue;
    
    await Product.create({name : productName, qty :  qty, unit : unit, amount :  price, description : description, category_id : categoryData._id, brand_id : brandData._id, });
    
    resData.push(data);
  }

  return sendResponse(res, "Product imported Successfully", resData);
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
