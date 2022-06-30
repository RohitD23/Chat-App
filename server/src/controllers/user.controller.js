const bcrypt = require("bcrypt");

const Users = require("../models/user.model");

const saltRounds = 10;
async function addNewUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck)
      return res.status(400).json({ error: "Username already exists" });

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ ok: true, user });
  } catch (error) {
    next(error);
  }
}

async function verifyUser(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect Username or Password" });
    }

    return res.status(200).json({ ok: true, user });
  } catch (error) {
    next(error);
  }
}

module.exports = { addNewUser, verifyUser };
