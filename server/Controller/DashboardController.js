const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const Bill = require("../Models/BillModel");
const Category = require("../Models/CategoryModel");
const Brand = require("../Models/BrandModel");
const BillProduct = require("../Models/BillProductModel");
const GetLoggedInUser = require("../Utils/GetLoggedInUser");

exports.dashboardData = asyncErrorHandler(async (req, res) => {

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const totalCategories = await Category.countDocuments({ user_id : userId });
  const totalBrands = await Brand.countDocuments({ user_id : userId });

  const products = await Bill.aggregate([
    {
      $match: { user_id: userId } 
    },
    {
      $group: {
        _id: { $concat: { $toString: { $month: "$date" } } },
        monthlySale: { $sum: "$total_amount" },
        billCount: { $sum: 1 }
      },
    },
    {
      $sort: { _id: 1 } 
    },
    {
      $group: {
        _id: null,
        totalSale: { $sum: "$monthlySale" },
        totalBillCount: { $sum: "$billCount" },
        monthlySale: { $push: { monthYear: "$_id", amount: "$monthlySale" } },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const categorySales = await BillProduct.aggregate([
    {
      $match: { user_id: userId } 
    },
    {
      $lookup: {
        from: "products", // Join with Product collection to get category details
        localField: "product_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" }, // Expand product details
    {
      $lookup: {
        from: "categories", // Join with Category collection to get category names
        localField: "productDetails.category_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" }, // Expand category details
    {
      $group: {
        _id: "$categoryDetails.name", // Group by category name
        category_wise_total_sale: { $sum: { $multiply: ["$price", "$qty"] } }, // Sum total sale per category
      },
    },
    {
      $sort: { category_wise_total_sale: -1 } // Sorting in descending order
    },
    {
      $project: {
        _id: 0,
        category_name: "$_id",
        category_wise_total_sale: 1,
      },
    },
  ]);
  
  let data = {
    totalCategories: totalCategories,
    totalBrands: totalBrands,
    categorySales : categorySales,
  };

  if (products.length) {
    data.productsData = products[0];
  } else {
    data.productsData = {};
  }

  return sendResponse(res, "Dashboard data get successfully", data);
});
