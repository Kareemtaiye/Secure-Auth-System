const mongoose = require("mongoose");

// Regex to validate IP address (IPv4 and IPv6)
const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Regex to validate a user-agent (basic structure validation)
const userAgentRegex = /^(Mozilla|Chrome|Safari|Opera|Edge)/;

const logsSchema = mongoose.Schema({
  tokenId: {
    type: String,
    required: [true, "Missing token ID"],
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Missing user ID"],
  },

  ip: {
    type: String,
    default: "",
    validate: {
      validator: function (val) {
        return val === "" || ipRegex.test(val);
      },
      message: "Invalid IP address format",
    },
  },

  userAgent: {
    type: String,
    default: "",
    validate: {
      validator: function (val) {
        return val === "" || userAgentRegex.test(val);
      },
      message: "Invalid user-agent format",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    required: [true, "Missing token expiry date"],
  },

  revoked: {
    type: Boolean,
    default: false,
  },

  reason: {
    type: String,
    required: [true, "Missing REASON!"],
    enum: {
      values: ["rotated", "issued", "logout", "force-logout", "expire"],
      message: "Invalid token issuing reason",
    },
  },
});

const TokenLogs = mongoose.model("Tokenlogs", logsSchema);

module.exports = TokenLogs;
