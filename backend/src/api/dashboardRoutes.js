const express = require("express");
const router = express.Router();
const { getNetWorth } = require("../core/dashboardHandler");

router.post("/dashboard/networth", getNetWorth);

module.exports = router;
