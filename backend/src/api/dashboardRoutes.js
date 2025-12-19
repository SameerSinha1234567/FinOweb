const express = require("express");
const router = express.Router();
const { getNetWorth } = require("../core/dashboardHandler");

// Route to get net worth
router.post("/dashboard/networth", getNetWorth);

module.exports = router;
