const Joi = require('joi');
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
        unique: true
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
    },
    image: String
});

const Category = mongoose.model('Category', categoriesSchema);

function validate(category) {
    const schema = Joi.object({
        category_name: Joi.string().required().min(3).max(255)
    }).unknown(true);

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(category, options);
}

exports.Category = Category;
exports.validate = validate;

