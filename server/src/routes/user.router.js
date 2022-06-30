const express = require("express");

const { addNewUser, verifyUser } = require("../controllers/user.controller");

const authRouter = express.Router();

authRouter.post("/register", addNewUser);
authRouter.post("/login", verifyUser);

module.exports = authRouter;
