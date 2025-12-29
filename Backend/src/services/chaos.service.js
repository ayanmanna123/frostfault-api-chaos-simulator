const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.applyChaos = async (chaosConfig) => {
  // 1. Latency injection
  if (chaosConfig.latency?.max > 0) {
    const delay =
      Math.floor(
        Math.random() *
          (chaosConfig.latency.max - chaosConfig.latency.min + 1)
      ) + chaosConfig.latency.min;

    await sleep(delay);
  }

  // 2. Error injection
  if (Math.random() < chaosConfig.errorProbability) {
    return {
      type: "ERROR",
      statusCode: chaosConfig.errorStatusCode || 500
    };
  }

  // 3. Malformed response
  if (chaosConfig.malformedResponse) {
    return {
      type: "MALFORMED"
    };
  }

  return { type: "SUCCESS" };
};
