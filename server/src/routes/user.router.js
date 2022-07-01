const express = require("express");

const { getAvatars, setAvatar } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/avatars", getAvatars);

userRouter.post("/avatars/:userId", setAvatar);

module.exports = userRouter;
