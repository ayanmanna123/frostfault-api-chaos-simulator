const MockApi = require("../models/MockApi.model");
const { mockApiSchema } = require("../validators/mock.validator");
const Log = require("../models/Log.model"); // ✅ FIX

// ==========================
// CREATE MOCK API
// ==========================
exports.createMockApi = async (req, res) => {
  const { error } = mockApiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const mockApi = await MockApi.create(req.body);
    res.status(201).json({ success: true, data: mockApi });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==========================
// GET ALL MOCK APIS
// ==========================
exports.getAllMockApis = async (req, res) => {
  const apis = await MockApi.find().sort({ createdAt: -1 });
  res.json(apis);
};

// ==========================
// GET SINGLE MOCK API
// ==========================
exports.getMockApiById = async (req, res) => {
  const api = await MockApi.findById(req.params.id);
  if (!api) {
    return res.status(404).json({ error: "Mock API not found" });
  }
  res.json(api);
};

// ==========================
// UPDATE MOCK API
// ==========================
exports.updateMockApi = async (req, res) => {
  const allowedFields = [
    "chaosConfig",
    "rateLimit",
    "successResponse",
    "graphqlResponse"
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field]) updates[field] = req.body[field];
  });

  const updated = await MockApi.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );

  res.json(updated);
};

// ==========================
// EXPORT MOCK API
// ==========================
exports.exportMockApi = async (req, res) => {
  const api = await MockApi.findById(req.params.id);

  if (!api) {
    return res.status(404).json({ error: "Mock API not found" });
  }

  let exportData;

  if (api.type === "GRAPHQL") {
    exportData = {
      name: api.name,
      type: api.type,
      graphqlResponse: api.graphqlResponse,
      chaosConfig: api.chaosConfig,
      rateLimit: api.rateLimit
    };
  } else {
    exportData = {
      name: api.name,
      type: api.type,
      endpoint: api.endpoint,
      method: api.method,
      successResponse: api.successResponse,
      chaosConfig: api.chaosConfig,
      rateLimit: api.rateLimit
    };
  }

  res.json(exportData);
};

// ==========================
// IMPORT MOCK API
// ==========================
exports.importMockApi = async (req, res) => {
  const { error } = mockApiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const imported = await MockApi.create(req.body);
    res.status(201).json({
      message: "Mock API imported successfully",
      data: imported
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==========================
// GET LOGS
// ==========================
exports.getLogs = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const logs = await Log.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(logs);
};

// ==========================
// DELETE MOCK API
// ==========================
exports.deleteMockApi = async (req, res, next) => {
  try {
    const deleted = await MockApi.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Mock API not found"
      });
    }

    res.json({
      message: "Mock API deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};
