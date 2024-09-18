const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Schema

const PasswordResetSchema = mongoose.Schema(
  {
    user_id: { type: String, required: true },
    token: { type: String, required: true },
    expired_at: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("password_reset_tokens", PasswordResetSchema);
