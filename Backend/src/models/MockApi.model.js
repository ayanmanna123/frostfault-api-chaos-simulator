const mongoose = require("mongoose");

const MockApiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["REST", "GRAPHQL"],
      default: "REST"
    },

    // REST only
    endpoint: {
      type: String,
      required: function () {
        return this.type === "REST";
      }
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: function () {
        return this.type === "REST";
      },
      default: "GET"
    },

    successResponse: {
      type: Object,
      required: function () {
        return this.type === "REST";
      }
    },

    // GRAPHQL only
    graphqlResponse: {
      type: Object,
      required: function () {
        return this.type === "GRAPHQL";
      }
    },

    chaosConfig: {
      errorProbability: { type: Number, default: 0 },
      latency: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 }
      },
      errorStatusCode: { type: Number, default: 500 },
      malformedResponse: { type: Boolean, default: false }
    },

    rateLimit: {
      limit: { type: Number, default: 0 },
      windowMs: { type: Number, default: 60000 }
    }
  },
  { timestamps: true }
);

// Unique only for REST APIs
MockApiSchema.index(
  { endpoint: 1, method: 1 },
  { unique: true, partialFilterExpression: { type: "REST" } }
);

module.exports = mongoose.model("MockApi", MockApiSchema);
