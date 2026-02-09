const mongoose = require("mongoose");
module.exports.connectToMongoDB = mongoose
  .connect(process.env.url_MongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
module.exports = connectDB;
