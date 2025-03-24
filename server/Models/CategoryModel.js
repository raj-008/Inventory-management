const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
