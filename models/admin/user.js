const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

let userModel = mongoose.model("users", userSchema);

module.exports = {
  userModel: userModel,
  saveUser: function (user) {
    return user.save();
  },
  getUserByUsername: function (username) {
    return userModel.find({ username: username });
  },
};
