const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    unit: { type: String, default: "pcs" },
    amount: { type: Number, required: true },
    description: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
