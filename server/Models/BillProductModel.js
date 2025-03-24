const mongoose = require("mongoose");

const BillProductSchema = mongoose.Schema(
  {
    bill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true },
    price : {type : Number, require : true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("BillProduct", BillProductSchema);
