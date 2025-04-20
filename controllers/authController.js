const User = require("../models/User");

const logTokenAction = require("../utilities/logTokenAction");
const redisClient = require("../config/redisClient");
const catAsyncError = require("../utilities/catchAsynError");
const generateTokens = require("../utilities/generateTokens");

exports.signup = catAsyncError(async function (req, res, next) {
  const { username, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  const { password: userPassword, __v, active, ...fields } = user.toObject();

  const { accessToken, refreshToken, tokenId } = await generateTokens(user._id);

  await redisClient.set(
    `refresh_token:${tokenId}`,
    JSON.stringify({
      userId: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    }),
    { EX: 7 * 24 * 60 * 60 }
  );

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      status: "success",
      data: {
        user: fields,
      },
      accessToken,
    });
});

exports.login = async function (req, res, next) {};

exports.logout = async function (req, res, next) {
  await redisClient.set(
    `refreshed_token:${res.cookie.refreshToken}`,
    "blacklisted"
  );

  // redisClient.set(`refresh_token:${}`)
  res.cookie("refreshToken", "Logged out", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    path: "/api/auth",
    maxAge: 0,
  });
};

exports.rotateToken = async function (req, res, next) {
  console.log(req.cookie);
  res.status(200).json({
    message: "Token rotated",
  });
};
