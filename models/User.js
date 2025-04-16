const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: [7, "The minimum character for the username is 7"],
    maxLength: [40, "The maximum character for the username is 40"],
  },

  email: {
    type: String,
    unique: [true, "This email is already registered with an account "],
    trim: true,
    required: [true, "Please provide your email address"],
    validate: [validator.isEmail, "Please provide a valid email"],
    lower: true,
  },

  password: {
    type: String,
    minLength: [8, "The minimum length for the password field is 8"],
    required: [true, "Password field is required"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Password confirm field is required"],
    validate: {
      validator: function (val) {
        this.password === val;
      },
      message: "Password and password confirm are not the same",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
