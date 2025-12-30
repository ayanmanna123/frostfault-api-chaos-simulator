const express = require("express");
const router = express.Router();
const MockApi = require("../models/MockApi.model");

const chaosMiddleware = require("../middlewares/chaos.middleware");
const rateLimitMiddleware = require("../middlewares/rateLimit.middleware");
const requestLogger = require("../middlewares/requestLogger");

const { serveMockApi } = require("../controllers/serveMock.controller");

// Catch-all mock API handler
router.all(
  /.*/,
  async (req, res, next) => {
    const endpoint = req.originalUrl.replace(/^\/mock/, "");

    const mockApi = await MockApi.findOne({
      endpoint,
      method: req.method,
    });

    if (!mockApi) {
      return res.status(404).json({ error: "Mock API not found" });
    }

    req.mockApi = mockApi;
    res.locals.mockApi = mockApi; // ✅ ADD THIS
    next();
  },
  rateLimitMiddleware,
  chaosMiddleware,
  requestLogger,
  serveMockApi
);

module.exports = router;
