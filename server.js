const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const connectDB = require("./database/db");

const { PORT, NODE_ENV } = process.env;

connectDB();

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at port ${PORT}`);
});
