const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const Bill = require("../Models/BillModel");
const Category = require("../Models/CategoryModel");
const Brand = require("../Models/BrandModel");

exports.dashboardData = asyncErrorHandler(async (req, res) => {
  const totalCategories = await Category.countDocuments();
  const totalBrands = await Brand.countDocuments();

  const products = await Bill.aggregate([
    {
      $group: {
        _id: { $concat: { $toString: { $month: "$createdAt" } } },
        monthlySale: { $sum: "$total_amount" },
      },
    },
    {
      $group: {
        _id: null,
        totalSale: {
          $sum: "$monthlySale",
        },
        monthlySale: { $push: { monthYear: "$_id", amount: "$monthlySale" } },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let data = {
    totalCategories: totalCategories,
    totalBrands: totalBrands,
  };

  if (products.length) {
    data.productsData = products[0];
  } else {
    data.productsData = {};
  }

  return sendResponse(res, "Dashboard data get successfully", data);
});
