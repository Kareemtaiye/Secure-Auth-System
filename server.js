const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const PORT = process.env.PORT;

app.listen("127.0.0.1", PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
