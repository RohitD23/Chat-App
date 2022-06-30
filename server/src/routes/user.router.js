const express = require("express");

const {
  addNewUser,
  loginUser,
  checkUserLoggedIn,
} = require("../controllers/user.controller");

const authRouter = express.Router();

authRouter.get("/", checkUserLoggedIn);
authRouter.post("/register", addNewUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
