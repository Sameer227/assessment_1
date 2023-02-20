const Joi = require("joi");

const Validator = {
  task: Joi.object({
    task: Joi.string().required(),
    status: Joi.string().required(),
    date: Joi.string().required(),
  }),
  user: Joi.object({
    email: Joi.string().required().email(),
  }),
  login: Joi.object({
    username: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
  sort: Joi.object({
    sortedData: Joi.array().min(1).required(),
  }),
};

module.exports = {
  Validator,
};
