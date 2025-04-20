const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
} = process.env;

const generateTokens = async id => {
  const accessToken = await jwt.sign({ userId: id }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
  });

  const tokenId = uuidv4();

  const refreshToken = await jwt.sign(
    { userId: id, tokenId },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
    }
  );

  return { accessToken, refreshToken, tokenId };
};

module.exports = generateTokens;
