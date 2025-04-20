const TokenLogs = require("../models/TokenLogs");

module.exports = async (
  userId,
  ip,
  userAgent,
  expiresAt,
  reason,
  revoked = false
) => {
  const log = await TokenLogs.create({
    userId,
    ip,
    userAgent,
    expiresAt,
    reason,
    revoked,
  });

  console.log(`Token Logged: ${log}`);
};
