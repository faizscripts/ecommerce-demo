const Joi = require('joi');
const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
    special_name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    productIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    topPicks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    unitsSold: {
        type: Number,
        min: 0,
        default: 0
    },
    income: {
        type: Number,
        min: 0,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Special = mongoose.model('Special', specialSchema);


function validate(special) {
    const schema = Joi.object({
        special_name: Joi.string().required().min(3).max(255)
    });

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(special, options);
}


exports.Special = Special;
exports.validate = validate;

