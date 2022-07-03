const express = require("express");

const {
  getUserId,
  logOutUser,
  addNewUser,
  logInUser,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/session", getUserId);
authRouter.get("/logout", logOutUser);

authRouter.post("/register", addNewUser);
authRouter.post("/login", logInUser);

module.exports = authRouter;
