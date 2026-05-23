// mongoose
const mongoose = require("mongoose");

// user -> name, email, password

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema); //create a collection

module.exports = { User };
