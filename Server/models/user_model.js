const { default: mongoose } = require("mongoose");

const storedUser = mongoose.Schema({
    userame: String,
    email: String,
    password: String,
    magicToken: String,
});

module.exports = mongoose.model("storedUser", storedUser);