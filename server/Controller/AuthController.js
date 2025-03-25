const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const PasswordResetToken = require("../Models/PasswordResetToken");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const CustomError = require("./../Utils/CustomError");
const util = require("util");
const ValidationErrorHandler = require("../Validation/ValidationErrorHandler");
const emailVerificationMail = require("../Utils/EmailVerificationMail");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.login = asyncErrorHandler(async (req, res, next) => {
  ValidationErrorHandler(req);

  const { email, password } = req.body;
  if (!email || !password) {
    const error = new CustomError("Please fill all the details", 401);
    return next(error);
  }

  const user = await User.findOne({ email }).select("+password");
  const userId = user._id;

  if (!user.status) {
    const token = signToken(user._id);
    const reciver = user.email;
    emailVerificationMail(token, reciver, userId);
    throw new CustomError("Please verify your email,  A verification mail sent to your registerd email", 401);
  }

  if (!user || !(await user.comparePasswordInDb(password, user.password))) {
    const error = new CustomError("Please try again with the correct credentials", 401);
    return next(error);
  }

  const token = signToken(user._id);
  return sendResponse(res, "User LoggedIn Successfully", { token, user });
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new CustomError("User does not found !", 400);
    return next(error);
  }

  const resetToken = await PasswordResetToken.findOne({ user_id: user._id });

  const token = signToken(user._id);

  if (resetToken) {
    await PasswordResetToken.updateOne({ user_id: user._id.toString() }, { $set: { token: token } });
  } else {
    await PasswordResetToken.create({ user_id: user._id, token: token, expired_at: new Date(Date.now() + 1000 * 60 * 10) });
  }

  sendResetPasswordMail(token, user.email, user._id);

  res.status(200).json({ status: 200, success: true, message: "Reset password link sent to your registered mail !", data: user });
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  ValidationErrorHandler(req);

  const { token, password, userId } = req.body;

  const userData = await PasswordResetToken.findOne({ user_id: userId }).limit(1).sort({ $natural: -1 });

  if (!userData) {
    const error = new CustomError("Something went wrong, Please Try again !", 500);
    return next(error);
  }

  if (userData.token != token) {
    const error = new CustomError("Invalid token !", 401);
    return next(error);
  }

  if (!userData) {
    const error = new CustomError("User not found !", 401);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

  const deleteToken = await PasswordResetToken.deleteMany({ user_id: userId });

  if (user.acknowledged && deleteToken.acknowledged) {
    return sendResponse(res, "Password reset successfully !", 401);
  }
});

const sendResetPasswordMail = (token, receiver, userId) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT, // Your Mailtrap SMTP port
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_FROM,
    to: receiver,
    subject: "Password Reset Mail From Inventory",
    text: "This is a test email sent using Nodemailer with Mailtrap.",
    html: `<p>You requested a password reset</p>
      <p>Click this <a href="${process.env.FRONT_URL}/reset-password/${token}/${userId}">link</a> to set a new password.</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

exports.protect = asyncErrorHandler(async (req, res, next) => {
  // 1. Read The Token  & Check is exist
  const authToken = req.headers.authorization;
  let token;
  if (authToken && authToken.startsWith("Bearer")) {
    token = authToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomError("You are not allowed to this url, Please login again", 401));
  }
  // 2. Validate the token
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_KEY);
  // 3. If the User Exist
  const user = await User.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError("The user with given token does not exist", 400);
    next(error);
  }

  // 4. If the user chnage password after token issue
  if (user.isPasswordChanged(decodedToken.iat)) {
    const error = new CustomError("The Password has been chnaged recently, Please login again", 401);
    return next(error);
  }

  req.user = user;
  // 5. Allow User to access route
  next();
});

exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const error = new CustomError("You do not have permission to perform this action", 403);
      next(error);
    }
    next();
  };
};
