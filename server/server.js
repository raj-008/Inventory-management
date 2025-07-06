const mongoose = require("mongoose");
require("dotenv").config();
const { connectMongoDB } = require("./connection.js");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

const app = require("./app");

connectMongoDB(process.env.URI)
.then(() => console.log("Database Connected"));

app.listen(process.env.PORT, () => {
  console.log("APP is Running");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
