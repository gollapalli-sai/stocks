// mongoose
const mongoose = require("mongoose");

// stock -> name, symbol, price

const stockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  imgUrl: String,
});

const Stock = mongoose.model("Stock", stockSchema); //create a collection

module.exports = { Stock };
