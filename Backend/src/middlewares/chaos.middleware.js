const { applyChaos } = require("../services/chaos.service");

module.exports = async (req, res, next) => {
  const chaosConfig = req.mockApi?.chaosConfig;

  if (!chaosConfig) return next();

  const chaosResult = await applyChaos(chaosConfig);

  if (chaosResult.type === "ERROR") {
    return res.status(chaosResult.statusCode).json({
      error: "Injected chaos error"
    });
  }

  if (chaosResult.type === "MALFORMED") {
    res.set("Content-Type", "application/json");
    return res.send('{ "broken": ');
  }

  next();
};
