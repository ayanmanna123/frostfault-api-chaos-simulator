const express = require("express");
const router = express.Router();

const {
  createMockApi,
  getAllMockApis,
  getMockApiById,
  updateMockApi,
  exportMockApi,
  importMockApi
} = require("../controllers/mock.controller");

// CREATE
router.post("/create", createMockApi);

// LIST
router.get("/", getAllMockApis);

// EXPORT (JSON)
router.get("/:id/export", exportMockApi);

// GET ONE
router.get("/:id", getMockApiById);

// UPDATE
router.put("/:id", updateMockApi);

// IMPORT
router.post("/import", importMockApi);

module.exports = router;
