const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const SettingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    key: { type: String },
    value: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Setting", SettingSchema);
