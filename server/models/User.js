const mongoose = require("mongoose");

//Create Schema
const UserSchema = mongoose.Schema({
  uid: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
