const express = require("express");
const cors = require("cors");

const app = express();

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
