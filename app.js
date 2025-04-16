const express = require("express");

const authRouter = require("./routes/authRoutes");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/auth", authRouter);

// app.use("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: "Cannot find this url on the server",
//   });
// });

module.exports = app;
