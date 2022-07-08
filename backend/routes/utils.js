const { celebrate, Joi } = require("celebrate");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
module.exports = { celebrate, Joi, validateURL };
