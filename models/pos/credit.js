const Joi = require('joi');
const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    debtor: {
        type: String,
        required: true,
        trim: true
    },
    phone: Number,
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        default: 0
    },
    products: [{
        creditDate: {
            type: Date,
            default: Date.now
        },
        cod: String,
        item: String,
        quantity: {type: Number, default: 0},
        unitPrice: {type: Number, default: 0},
        total: Number,
    }],
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    debtorNotes: String
});

const Credit = mongoose.model('Credit', creditSchema);

exports.Credit = Credit;

