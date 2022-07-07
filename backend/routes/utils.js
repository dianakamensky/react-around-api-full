const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
module.exports = { router, celebrate, Joi, validateURL };
