const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const connectDB = require("./database/db");

const PORT = process.env.PORT || 8000;
const HOST = "127.0.0.1";

connectDB();

app.listen(PORT, HOST, () => {
  console.log(
    `🚀 Server running at http://${HOST}:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
