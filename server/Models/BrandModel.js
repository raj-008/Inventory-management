const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const BrandSchema = mongoose.Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Brand", BrandSchema);
