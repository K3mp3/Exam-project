const { default: mongoose } = require("mongoose");

const repairShopAnswer = mongoose.Schema({
  customerName: String,
  customerId: String,
  customerEmail: String,
  repairShopEmail: String,
  repairShopName: String,
  customerMessage: [String],
  repairShopAnswer: String,
  registrationNumber: String,
  priceOffer: String,
});

module.exports = mongoose.model("repairShopAnswer", repairShopAnswer);
