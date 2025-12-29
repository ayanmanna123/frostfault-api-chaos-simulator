const MockApi = require("../models/MockApi.model");

exports.serveMockApi = async (req, res) => {
  const mockApi = req.mockApi;

  res.status(200).json(mockApi.successResponse);
};
