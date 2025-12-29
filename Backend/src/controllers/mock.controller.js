const MockApi = require("../models/MockApi.model");

// Create new mock API
exports.createMockApi = async (req, res) => {
  try {
    const mockApi = await MockApi.create(req.body);

    res.status(201).json({
      success: true,
      data: mockApi
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
