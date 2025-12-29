const MockApi = require("../models/MockApi.model");
const { mockApiSchema } = require("../validators/mock.validator");

// Create new mock API
exports.createMockApi = async (req, res) => {
  const { error } = mockApiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    const mockApi = await MockApi.create(req.body);
    res.status(201).json({ success: true, data: mockApi });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllMockApis = async (req, res) => {
  const apis = await MockApi.find().sort({ createdAt: -1 });
  res.json(apis);
};

// 2️⃣ GET SINGLE MOCK API
exports.getMockApiById = async (req, res) => {
  const api = await MockApi.findById(req.params.id);
  if (!api) {
    return res.status(404).json({ error: "Mock API not found" });
  }
  res.json(api);
};

// 3️⃣ UPDATE MOCK API (chaos / rateLimit / response)
exports.updateMockApi = async (req, res) => {
  const allowedFields = ["chaosConfig", "rateLimit", "successResponse"];

  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field]) updates[field] = req.body[field];
  });

  const updated = await MockApi.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });

  res.json(updated);
};

// 4️⃣ EXPORT MOCK API SCENARIO
exports.exportMockApi = async (req, res) => {
  const api = await MockApi.findById(req.params.id);

  if (!api) {
    return res.status(404).json({ error: "Mock API not found" });
  }

  // remove internal fields
  const exportData = {
    name: api.name,
    endpoint: api.endpoint,
    method: api.method,
    successResponse: api.successResponse,
    chaosConfig: api.chaosConfig,
    rateLimit: api.rateLimit,
  };

  res.json(exportData);
};

// 5️⃣ IMPORT MOCK API SCENARIO
exports.importMockApi = async (req, res) => {
  try {
    const imported = await MockApi.create(req.body);
    res.status(201).json({
      message: "Mock API imported successfully",
      data: imported,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


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
