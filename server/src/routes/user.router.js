const express = require("express");

const {
  getUser,
  getAllUsers,
  getAvatars,
  setAvatar,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/users/:username", getAllUsers);
userRouter.get("/avatars", getAvatars);

userRouter.post("/avatars/:username", setAvatar);

module.exports = userRouter;
