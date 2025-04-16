const User = require("../models/User");

const catAsyncError = require("../utilities/catchAsynError");

exports.signup = catAsyncError(async function (req, res, next) {
  console.log(req.body);
  const { username, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
exports.login = async function (req, res, next) {};
