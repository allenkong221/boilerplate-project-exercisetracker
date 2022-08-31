const mongoose = require("mongoose");

let exerciseSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date,
  _id: String
});

module.exports = mongoose.model("Exercise", exerciseSchema);