const Joi = require("joi");

exports.mockApiSchema = Joi.object({
  name: Joi.string().required(),
  endpoint: Joi.string().required(),
  method: Joi.string().valid("GET", "POST", "PUT", "DELETE").required(),
  successResponse: Joi.object().required(),

  chaosConfig: Joi.object({
    errorProbability: Joi.number().min(0).max(1),
    latency: Joi.object({
      min: Joi.number().min(0),
      max: Joi.number().min(0)
    }),
    malformedResponse: Joi.boolean()
  }),

  rateLimit: Joi.object({
    limit: Joi.number().min(0),
    windowMs: Joi.number().min(1000)
  })
});
