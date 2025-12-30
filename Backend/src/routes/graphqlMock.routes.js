const express = require("express");
const router = express.Router();
const MockApi = require("../models/MockApi.model");
const chaosMiddleware = require("../middlewares/chaos.middleware");

router.post(
  "/",
  async (req, res, next) => {
    if (!req.body.query) {
      return res.status(400).json({ error: "GraphQL query is required" });
    }

    const mockApi = await MockApi.findOne({ type: "GRAPHQL" });
    if (!mockApi) {
      return res.status(404).json({ error: "GraphQL mock not found" });
    }

    req.mockApi = mockApi;
    next();
  },
  chaosMiddleware,
  (req, res) => {
    res.json({ data: req.mockApi.graphqlResponse });
  }
);

module.exports = router;
