const express = require("express");
const router = express.Router();
const MockApi = require("../models/MockApi.model");
const chaosMiddleware = require("../middlewares/chaos.middleware");
const { serveMockApi } = require("../controllers/serveMock.controller");

// Catch-all mock API handler (REGEX — FIXED)
router.all(/.*/, async (req, res, next) => {
  // remove "/mock" prefix
  const endpoint = req.originalUrl.replace(/^\/mock/, "");

  const mockApi = await MockApi.findOne({
    endpoint,
    method: req.method
  });

  if (!mockApi) {
    return res.status(404).json({ error: "Mock API not found" });
  }

  req.mockApi = mockApi;
  next();
}, chaosMiddleware, serveMockApi);

module.exports = router;
