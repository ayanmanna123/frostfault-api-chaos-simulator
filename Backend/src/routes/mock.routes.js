const express = require("express");
const router = express.Router();
const { createMockApi } = require("../controllers/mock.controller");

// Create mock API
router.post("/create", createMockApi);

module.exports = router;
