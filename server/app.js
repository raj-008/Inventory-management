const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const CustomError = require("./Utils/CustomError");
const routes = require("./Routes/routes");
const globalErrorHandler = require("./Controller/errorController");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/api/v1", routes);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //     status: 'fail',  
  //     message: `Can't find ${req.originalUrl} on the server!`
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
