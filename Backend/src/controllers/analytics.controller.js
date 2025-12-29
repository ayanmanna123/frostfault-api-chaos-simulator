const Log = require("../models/Log.model");

// 1️⃣ Summary: success rate & avg latency
exports.getSummary = async (req, res) => {
  const total = await Log.countDocuments();
  const success = await Log.countDocuments({ statusCode: { $lt: 400 } });
  const errors = total - success;

  const latencyAgg = await Log.aggregate([
    {
      $group: {
        _id: null,
        avgLatency: { $avg: "$latency" }
      }
    }
  ]);

  res.json({
    totalRequests: total,
    successRequests: success,
    errorRequests: errors,
    successRate: total === 0 ? 0 : ((success / total) * 100).toFixed(2),
    avgLatency: latencyAgg[0]?.avgLatency?.toFixed(2) || 0
  });
};

// 2️⃣ Error distribution
exports.getErrorDistribution = async (req, res) => {
  const errors = await Log.aggregate([
    {
      $match: { statusCode: { $gte: 400 } }
    },
    {
      $group: {
        _id: "$statusCode",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(errors);
};

// 3️⃣ Traffic over time (per minute)
exports.getTraffic = async (req, res) => {
  const traffic = await Log.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M",
            date: "$createdAt"
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(traffic);
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

