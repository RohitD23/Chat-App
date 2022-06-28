const express = require("express");

const { addNewUser } = require("../controllers/register.controller");

const registerRouter = express.Router();

registerRouter.post("/", addNewUser);

module.exports = registerRouter;
