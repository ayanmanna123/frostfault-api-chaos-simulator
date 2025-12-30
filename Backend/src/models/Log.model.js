const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    requestId: String,
    endpoint: String,
    method: String,
    statusCode: Number,
    latency: Number,
    errorType: String,
    maxLatency: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);
