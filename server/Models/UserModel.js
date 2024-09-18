const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

//Schema

const UserSchema = mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    phone: { type: String, required: true, index: { unique: true } },
    company: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: Boolean, default: 1 },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Encrypt the password before saving it
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePasswordInDb = async function (psw, pswDB) {
  return await bcrypt.compare(psw, pswDB);
};

UserSchema.methods.isPasswordChanged = (JWTTimeStamp) => {
  if (this.updatedAt) {
    let pswChangeTimeStamp = parseInt(this.updatedAt / 1000, 10);
    return JWTTimeStamp < pswChangeTimeStamp;
  }
};

module.exports = mongoose.model("User", UserSchema);
