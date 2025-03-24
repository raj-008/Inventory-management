const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    customer_name: { type: String },
    date : {type : Date},
    bill_number : { type : Number, required : true },
    tax: { type: Number },
    total_amount: { type: Number },
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Bill", BillSchema);
