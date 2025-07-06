const User = require("../Models/UserModel");
const util = require("util");
const CustomError = require("./../Utils/CustomError");
const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
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
};

module.exports = AuthMiddleware;
