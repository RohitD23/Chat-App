const bcrypt = require("bcrypt");

const Users = require("../models/user.model");

async function getUserId(req, res, next) {
  try {
    const username = req.cookies.user;
    if (!username) {
      return res.status(400).json({ ok: false });
    } else {
      return res.status(200).json({ username });
    }
  } catch (err) {
    next(err);
  }
}

const saltRounds = 10;
async function addNewUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck)
      return res
        .status(400)
        .json({ ok: false, error: "Username already exists" });

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ ok: false, error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({ ok: false, error: "Failed to Register" });
    }

    res.cookie("user", user.username, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function logInUser(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ ok: false, error: "Incorrect Username or Password" });
    }

    res.cookie("user", user.username, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

async function logOutUser(req, res, next) {
  try {
    res.clearCookie("user");
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserId, logOutUser, addNewUser, logInUser };
