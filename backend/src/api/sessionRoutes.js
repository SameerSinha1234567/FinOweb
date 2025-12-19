const express = require("express");
const router = express.Router();
const { createSession } = require("../core/sessionCreator");

router.post("/session/create", createSession);

module.exports = router;
