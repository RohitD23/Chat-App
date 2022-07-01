const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
