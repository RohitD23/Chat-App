const express = require("express");

const {
  getUser,
  getAllUsers,
  getAvatars,
  setAvatar,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/:userId", getAllUsers);
userRouter.get("/avatars", getAvatars);

userRouter.post("/avatars/:userId", setAvatar);

module.exports = userRouter;
