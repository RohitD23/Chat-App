const Messages = require("../models/messages.model");

async function saveMessage(req, res, next) {
  try {
    const { from, to, msg } = req.body;

    const data = await Messages.create({
      message: msg,
      users: [from, to],
      sender: from,
    });

    if (!data) {
      return res.status(500).json({ ok: false });
    }

    return res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

module.exports = { saveMessage };
