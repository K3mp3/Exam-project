const { default: mongoose } = require("mongoose");

const storedUser = mongoose.Schema({
  name: String,
  location: String,
  phoneNumber: String,
  email: String,
  password: String,
  repairShop: Boolean,
  magicToken: String,
});

module.exports = mongoose.model("storedUser", storedUser);
