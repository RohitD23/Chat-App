const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json(`Helloo!`);
});

module.exports = app;
