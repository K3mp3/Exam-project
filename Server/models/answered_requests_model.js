const { default: mongoose } = require("mongoose");

const repairShopsAnsweredRequests = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  location: String,
  registrationNumber: String,
  troubleshootTime: String,
  message: String,
});

module.exports = mongoose.model(
  "repairShopsAnsweredRequests",
  repairShopsAnsweredRequests
);
