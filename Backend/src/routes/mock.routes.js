const express = require("express");
const router = express.Router();

const {
  createMockApi,
  getAllMockApis,
  getMockApiById,
  updateMockApi,
  exportMockApi,
  importMockApi,
  deleteMockApi
} = require("../controllers/mock.controller");

// CREATE
router.post("/create", createMockApi);

// LIST
router.get("/", getAllMockApis);

// EXPORT
router.get("/:id/export", exportMockApi);

// GET ONE
router.get("/:id", getMockApiById);

// UPDATE
router.put("/:id", updateMockApi);

// DELETE ✅
router.delete("/:id", deleteMockApi);

module.exports = router;
