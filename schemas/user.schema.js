const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email().required();
const password = Joi.string().min(8).required();
const role = Joi.string().min(0).default('customer');

const createUserSchema = Joi.object({
  email,
  password,
  role,
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  role: Joi.string().min(0),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const getUserMailSchema = Joi.object({
  email: email.required(),
});

module.exports = {
  getUserMailSchema,
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
