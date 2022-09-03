const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: { type: Number, required: true},
  date: Date,
  userId: String
});

module.exports = mongoose.model("Exercise", exerciseSchema);