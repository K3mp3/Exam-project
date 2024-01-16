const { default: mongoose } = require("mongoose");

const repairShopAnswer = mongoose.Schema({
  customerName: String,
  customerId: String,
  customerEmail: String,
  repairShopEmail: String,
  customerMessage: String,
  registrationNumber: String,
  priceOffer: String,
});

module.exports = mongoose.model("repairShopAnswer", repairShopAnswer);
