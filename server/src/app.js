const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/user.router");

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
