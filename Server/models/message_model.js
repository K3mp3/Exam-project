const { default: mongoose } = require("mongoose");

const messageModel = mongoose.Schema([
  { customerId: String, customerMessage: String, date: Date },
]);

module.exports = mongoose.model("messageModel", messageModel);
