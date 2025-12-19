const express = require("express");
const { planFinance } = require("../../logic/planning/plannercontroller");

const router = express.Router();

router.post("/plan", planFinance);

module.exports = router;
