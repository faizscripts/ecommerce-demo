const Joi = require('joi');
const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    brandCategoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    subBrands: [{
        subBrandName: String,
        subBrandCategoryID: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        },
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
    }],
    productIDs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    topPicks: [{
        type: mongoose.Types.ObjectId,
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

const Brand = mongoose.model('Brand', brandsSchema);

function validate(brand) {
    const schema = Joi.object({
        brand_name: Joi.string().required().max(255),
    }).unknown(true);

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(brand, options);
}

exports.Brand = Brand;
exports.validate = validate;

