const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quoteSchema = new Schema({
  name: String,
  role: String,
  company: String,
  picture: String,
  linkedIn: String,
});

module.exports = mongoose.model("Students", quoteSchema);
