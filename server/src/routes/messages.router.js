const express = require("express");
const {
  saveMessage,
  getMessages,
} = require("../controllers/messages.controller");

const mssgRouter = express.Router();

mssgRouter.post("/save", saveMessage);
mssgRouter.post("/get", getMessages);

module.exports = mssgRouter;
