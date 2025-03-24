const jwt = require("jsonwebtoken");
const util = require("util");  // ✅ Import util
const User = require("../Models/UserModel");  // Ensure this path is correct
const CustomError = require("../Utils/CustomError");  // Ensure this path is correct

   
const GetLoggedInUser = async (req) => {
    // 1. Read The Token  & Check is exist
    const authToken = req.headers.authorization;
    let token;
    if (authToken && authToken.startsWith("Bearer")) {
        token = authToken.split(" ")[1];
    }

    if (!token) {
        throw new CustomError("You are not allowed to this url, Please login again", 401);
    }
    // 2. Validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_KEY);
    // 3. If the User Exist
    const user = await User.findById(decodedToken.id);

    if (!user) {
        throw new CustomError("The user with given token does not exist", 400);
    }

    // 4. If the user chnage password after token issue
    if (user.isPasswordChanged(decodedToken.iat)) {
        throw new CustomError("The Password has been chnaged recently, Please login again", 401);
    }

    return user;
};

module.exports = GetLoggedInUser;