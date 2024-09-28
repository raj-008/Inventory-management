const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

const app = require("./app");

mongoose.promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/inventory").then(() => {
  console.log("Database connection established");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("APP is Running");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
