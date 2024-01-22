const { default: mongoose } = require("mongoose");

const contactRepairShops = mongoose.Schema({
  customerId: String,
  name: String,
  email: String,
  location: String,
  registrationNumber: String,
  troubleshootTime: String,
  message: String,
});

module.exports = mongoose.model("contactRepairShops", contactRepairShops);
