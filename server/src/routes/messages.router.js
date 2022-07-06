const express = require("express");
const { saveMessage } = require("../controllers/messages.controller");

const mssgRouter = express.Router();

mssgRouter.post("/save", saveMessage);

module.exports = mssgRouter;
