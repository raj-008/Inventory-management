const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    bill_number : { type : Number, required : true },
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
