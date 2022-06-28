const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const registerRouter = require("./routes/register.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.use("/auth/register", registerRouter);
app.use("/", () => {
  res.status(200);
});

module.exports = app;
