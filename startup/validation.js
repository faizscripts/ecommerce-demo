const Joi = require('joi');

module.exports = function () {
    Joi.objectID = require('joi-objectid')(Joi);
}