const Joi = require('joi');
const mongoose = require('mongoose');

const bFilterSchema = new mongoose.Schema({
    filterArray: [],
    rand: String,
    originalUrl: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const BFilter = mongoose.model('BFilter', bFilterSchema);

exports.BFilter = BFilter;

