const mongoose = require("mongoose");

const MockApiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    endpoint: {
      type: String,
      required: true,
      unique: true
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      default: "GET"
    },

    successResponse: {
      type: Object,
      required: true
    },

    chaosConfig: {
      errorProbability: {
        type: Number,
        default: 0 // 0 to 1
      },

      latency: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 }
      },

      errorStatusCode: {
        type: Number,
        default: 500
      },

      malformedResponse: {
        type: Boolean,
        default: false
      }
    },

    rateLimit: {
      limit: { type: Number, default: 0 }, // requests
      windowMs: { type: Number, default: 60000 } // 1 minute
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockApi", MockApiSchema);
