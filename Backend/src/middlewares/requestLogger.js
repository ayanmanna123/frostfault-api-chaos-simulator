const Log = require("../models/Log.model");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  const start = Date.now();
  const requestId = uuidv4();

  res.on("finish", async () => {
    const latency = Date.now() - start;

    await Log.create({
      requestId,
      endpoint: req.mockApi?.endpoint || req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      latency,
      errorType: res.statusCode >= 400 ? "ERROR" : null,
      maxLatency: res.locals.mockApi?.chaosConfig?.latency?.max ?? null,
    });
  });

  next();
};
