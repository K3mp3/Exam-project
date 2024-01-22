const { default: mongoose } = require("mongoose");

const answerRepairShops = mongoose.Schema({
  customerName: String,
  customerId: String,
  customerNamemail: String,
  repairShopEmail: String,
  repairShopName: String,
  customerMessage: String,
  repairShopAnswer: String,
  priceOffer: String,
  registrationNumber: String,
});

module.exports = mongoose.model("answerRepairShops", answerRepairShops);
