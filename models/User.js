const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: [7, "The minimum character for the username is 7"],
    maxLength: [40, "The maximum character for the username is 40"],
    required: [true, "Please provide your username"],
  },

  email: {
    type: String,
    unique: [true, "This email is already registered with an account "],
    trim: true,
    required: [true, "Please provide your email"],
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

  isVerified: {
    type: Boolean,
    default: false,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;

  next();
});

userSchema.set("validate", function () {
  this.invalidate("username");
});

const User = mongoose.model("user", userSchema);

module.exports = User;
