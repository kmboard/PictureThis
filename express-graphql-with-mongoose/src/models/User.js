const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  contact_info: { type: String, required: true },
  profilePic: { type: String, required: true },
  tagline: { type: String, required: true },
  desription: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
