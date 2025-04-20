const { createClient } = require("redis");

const client = createClient();

client.on("error", err => {
  console.log(`Error connecting to redis: ${err}`);
});

client.connect().then(() => {
  console.log("Connected to Redis");
});

module.exports = client;
