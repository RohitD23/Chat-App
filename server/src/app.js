const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const authRouter = require("./routes/user.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", () => {
  res.status(200);
});

module.exports = app;
