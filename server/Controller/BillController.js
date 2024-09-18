const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const Bill = require("../Models/BillModel");
const Product = require("../Models/ProductModel");
const CustomError = require("../Utils/CustomError");

exports.read = asyncErrorHandler(async (req, res) => {
  const bills = await Bill.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "brands",
        localField: "products.brand_id",
        foreignField: "_id",
        as: "products.brand",
      },
    },
    {
      $unwind: "$products.brand",
    },
    {
      $lookup: {
        from: "categories",
        localField: "products.category_id",
        foreignField: "_id",
        as: "products.categories",
      },
    },
    {
      $unwind: "$products.categories",
    },
    {
      $project: {
        "products.createdAt": 0,
        "products.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "categories.createdAt": 0,
        "categories.updatedAt": 0,
      },
    },
  ]);

  return sendResponse(res, "Bills Retrived Successfully", bills);
});

exports.create = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const productQty = await Product.findById(req.body.product_id).select({ qty: 1 });

  if (productQty.qty < req.body.qty) {
    throw new CustomError("Not enough quantity in your stock for this product");
  }

  const bill = await Bill.create(req.body);

  if (bill.createdAt) {
    productQty.qty = productQty.qty - bill.qty;
    await productQty.save();
  }

  return sendResponse(res, "Bill Created Successfully", bill);
});

exports.update = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const bill = await Bill.updateOne({ _id: req.params.id }, req.body);

  return sendResponse(res, "Bill updated successfully", bill);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const bill = await Bill.deleteOne({ _id: req.params.id });

  return sendResponse(res, "Bill deleted successfully", bill);
});
