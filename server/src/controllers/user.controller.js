const axios = require("axios");
const { Buffer } = require("buffer");

const Users = require("../models/user.model");

const AVATAR_API = `https://api.multiavatar.com`;

async function getUser(req, res, next) {
  try {
    const userId = req.cookies.user;

    const user = await Users.findOne(userId, [
      "username",
      "avatarImage",
      "_id",
    ]);
    if (!user) {
      return res.status(400).json({ ok: false });
    }

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const userId = req.params.userId;

    const users = await Users.find({ _id: { $ne: userId } }, [
      "username",
      "avatarImage",
      "_id",
    ]);

    if (!users) {
      return res.status(400).json({ ok: false });
    }

    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
}

async function getAvatars(req, res) {
  try {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${AVATAR_API}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer.from(image.data);
      data.push(buffer.toString("base64"));
    }

    if (!data) return res.status(500).json({ ok: false });

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ ok: false });
  }
}

async function setAvatar(req, res, next) {
  try {
    const userId = req.params.userId;
    const { avatarImage } = req.body;

    const user = await Users.findByIdAndUpdate(
      userId,
      {
        avatarImage,
        isAvatarSet: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ ok: false });
    }

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUser, getAllUsers, getAvatars, setAvatar };
