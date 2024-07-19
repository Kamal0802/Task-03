const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "enter the userName"],
    minlength: 5,
  },

  email: {
    type: String,
    required: [true, "enter the email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "enter the password"],
    minlength: 5,
  },
  phoneNumber: {
    type: Number,
    required: [true, "enter the phone number"],
  },

  address: {
    type: String,
    required: [true, "enter the address"],
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: [true, "enter the pincode"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
