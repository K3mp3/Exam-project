const { default: mongoose } = require("mongoose");

const contactRepairShops = mongoose.Schema({
  customerId: String,
  customerName: String,
  customerEmail: String,
  repairShopEmail: String,
  repairShopName: String,
  location: String,
  registrationNumber: String,
  troubleshootTime: String,
  customerMessage: [
    {
      message: String,
      date: Date,
    },
  ],
  repairShopAnswer: [
    {
      message: String,
      date: Date,
    },
  ],
  priceOffer: String,
  answeredByRepairShop: Boolean,
});

module.exports = mongoose.model("contactRepairShops", contactRepairShops);
