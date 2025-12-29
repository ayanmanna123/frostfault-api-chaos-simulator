const express = require("express");
const router = express.Router();
const {
  getSummary,
  getErrorDistribution,
  getTraffic,
  getLogs
} = require("../controllers/analytics.controller");

router.get("/summary", getSummary);
router.get("/errors", getErrorDistribution);
router.get("/traffic", getTraffic);
router.get("/logs", getLogs);
module.exports = router;
