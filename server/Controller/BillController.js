const { sendResponse } = require("../Utils/ResponseUtils");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const Bill = require("../Models/BillModel");
const Product = require("../Models/ProductModel");
const CustomError = require("../Utils/CustomError");
const BillProduct = require("../Models/BillProductModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const GetLoggedInUser = require("../Utils/GetLoggedInUser");

exports.read = asyncErrorHandler(async (req, res) => {

  const user = await GetLoggedInUser(req);
  const userId = user._id;

  const bills = await Bill.aggregate([
    {
      $match: { user_id: userId } 
    },
    {
      $lookup: {
        from: "billproducts",
        localField: "_id",
        foreignField: "bill_id",
        as: "billproducts",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "billproducts.product_id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "products.brand_id",
        foreignField: "_id",
        as: "brands",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "products.category_id",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $addFields: {
        billproducts: {
          $map: {
            input: "$billproducts",
            as: "bp",
            in: {
              _id: "$$bp._id",
              qty: "$$bp.qty",
              price: "$$bp.price",
              product_id: "$$bp.product_id",
              product: {
                $arrayElemAt: ["$products", { $indexOfArray: ["$products._id", "$$bp.product_id"] }],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        "billproducts.product_id": 1,
        "billproducts.qty": 1,
        "billproducts.price": 1,
        customer_name: 1,
        date: 1,
        bill_number: 1,
        tax: 1,
        total_amount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return sendResponse(res, "Bills Retrived Successfully", bills);
});

exports.getBillDeatils = asyncErrorHandler(async (req, res) => {
  
  const bills = await Bill.aggregate([
    {
      $match: { _id: new ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "billproducts",
        localField: "_id",
        foreignField: "bill_id",
        as: "billproducts",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "billproducts.product_id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "products.brand_id",
        foreignField: "_id",
        as: "brands",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "products.category_id",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $addFields: {
        billproducts: {
          $map: {
            input: "$billproducts",
            as: "bp",
            in: {
              _id: "$$bp._id",
              qty: "$$bp.qty",
              price: "$$bp.price",
              product_id: "$$bp.product_id",
              product: {
                $arrayElemAt: ["$products", { $indexOfArray: ["$products._id", "$$bp.product_id"] }],
              },
              product_name: {
                $getField: {
                  field: "name",
                  input: {
                    $arrayElemAt: ["$products", { $indexOfArray: ["$products._id", "$$bp.product_id"] }],
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        "billproducts.product_id": 1,
        "billproducts.qty": 1,
        "billproducts.price": 1,
        "billproducts.product_name": 1,
        customer_name: 1,
        date: 1,
        bill_number: 1,
        tax: 1,
        total_amount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  const bill = bills.length > 0 ? bills[0] : null;

  return sendResponse(res, "Bills Retrived Successfully", bill);
});

exports.create = asyncErrorHandler(async (req, res, next) => {
  ValidationErrorHandler(req);

  const user = await GetLoggedInUser(req);
  const userId = user.id;

  const isBillNumberExist = await Bill.exists({ bill_number: req.body.bill_number });

  if (isBillNumberExist) {
    return next(new CustomError("Bill Number already exits"));
  }

  const input = req.body;
  input.user_id = userId;

  const bill = await Bill.create(input);

  const products = input.items;

  for (let i = 0; i < products.length; i++) {
    const { qty, price, product_id } = products[i];

    const product = await Product.findById(product_id).select({ qty: 1, name: 1 });
    const productQty = product.qty;
    const productName = product.name;

    if (!product) {
      console.log(`Product Id : ${product_id} Does not exist`);
      continue;
    }

    if (qty == 0 || productQty < qty) {
      await Bill.deleteOne({ _id: bill._id });
      throw new CustomError(`${productName} has less stock`, 404);
    }

    const billProduct = await BillProduct.create({ bill_id: bill._id, qty: qty, price: price, product_id: product_id });

    if (billProduct.createdAt) {
      product.qty = productQty - billProduct.qty;
      await product.save();
    }
  }

  return sendResponse(res, "Bill Created Successfully", bill);
});

exports.update = asyncErrorHandler(async (req, res) => {
  ValidationErrorHandler(req);

  const updateBillId = req.params.id;

  const existingBillProducts = await BillProduct.find({ bill_id: updateBillId });

  const updatedProduct = [];

  const newbillItems = req.body.items;

  for (let i = 0; i < existingBillProducts.length; i++) {
    const existingItem = existingBillProducts[i];
    const existingItemProductId = existingItem.product_id;
    const existingItemQty = existingItem.qty;

    const product = await Product.findById(existingItemProductId).select({ qty: 1, name: 1 });
    const productId = product._id;
    const productName = product.name;
    const productQty = product.qty;

    const newItemQty = newbillItems.find((item) => item.product_id == product._id).qty;

    if (productQty + existingItemQty < newItemQty) {
      updatedProduct.forEach(async (it) => {
        await Product.updateOne({ _id: it.id }, it);
      });
      throw new CustomError(`${productName} has less stock`, 404);
    }

    updatedProduct.push({ id: productId, qty: productQty });

    if (product) {
      product.qty += existingItemQty;
      product.qty -= newItemQty;
      await product.save();
    }
  }

  await BillProduct.deleteMany({ bill_id: updateBillId });

  newbillItems.forEach((item) => (item.bill_id = updateBillId));

  await BillProduct.create(newbillItems);

  const bill = await Bill.updateOne({ _id: updateBillId }, req.body);

  return sendResponse(res, "Bill updated successfully", bill);
});

exports.destroy = asyncErrorHandler(async (req, res) => {
  const deleteBillId = req.params.id;
  
  const deleteBillItems = await BillProduct.deleteMany({ bill_id: deleteBillId });

  let bill = {};
  if (deleteBillItems) bill = await Bill.deleteOne({ _id: deleteBillId });

  return sendResponse(res, "Bill deleted successfully", bill);
});
