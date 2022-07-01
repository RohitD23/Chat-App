const express = require("express");

const {
  getUserId,
  addNewUser,
  loginUser,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/session", getUserId);

authRouter.post("/register", addNewUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
