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

async function getMessages(req, res, next) {
  try {
    const { from, to } = req.body;

    const data = await Messages.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });

    if (!data) {
      return res.status(500).json({ ok: false });
    }

    const messages = data.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });

    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
}

module.exports = { saveMessage, getMessages };
