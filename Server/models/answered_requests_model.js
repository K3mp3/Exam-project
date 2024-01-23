const { default: mongoose } = require("mongoose");

const repairShopsAnsweredRequests = mongoose.Schema({
  customerId: String,
  customerName: String,
  customerEmail: String,
  repairShopEmail: String,
  repairShopName: String,
  location: String,
  registrationNumber: String,
  troubleshootTime: String,
  customerMessage: [String],
  repairShopAnswer: [String],
  priceOffer: String,
  answeredByRepairShop: Boolean,
  answeredByCustomer: Boolean,
});

module.exports = mongoose.model(
  "repairShopsAnsweredRequests",
  repairShopsAnsweredRequests
);
