const Joi = require("joi");

exports.mockApiSchema = Joi.object({
  name: Joi.string().required(),

  type: Joi.string()
    .valid("REST", "GRAPHQL")
    .default("REST"),

  endpoint: Joi.when("type", {
    is: "REST",
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  }),

  method: Joi.when("type", {
    is: "REST",
    then: Joi.string().valid("GET", "POST", "PUT", "DELETE").required(),
    otherwise: Joi.forbidden()
  }),

  successResponse: Joi.when("type", {
    is: "REST",
    then: Joi.object().required(),
    otherwise: Joi.forbidden()
  }),

  graphqlResponse: Joi.when("type", {
    is: "GRAPHQL",
    then: Joi.object().required(),
    otherwise: Joi.forbidden()
  }),

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
