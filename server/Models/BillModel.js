const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true },
    description: { type: String },
    tax: { type: Number },
    total_amount: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Bill", BillSchema);
