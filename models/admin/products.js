const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
        unique: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    subBrandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    specialID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecialCategory'
    },
    description: {
        type: String,
        trim: true
    },
    inBox: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    store_quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    shop_price: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        min: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    product_images: [{
        filename: String,
        // destination: String,
        // size: Number
    }],
    dateCreated: {
        type: Date,
        default: Date.now
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
    bp: {
        type: Number,
        min: 0
    },
    rate: {
        type: Number,
        min: 0,
        default: 30.3
    },
    shipping: {
        type: Number,
        min: 0,
        default: 100
    },
    profitP: {
        type: Number,
        min: 0,
        default: 5
    },
    buying: {
        type: Number,
        min: 0
    },
    selling: {
        type: Number,
        min: 0
    },
    populateStatus: {
        type: Boolean,
        default: true
    },
    optionItems:[{
        type: String
    }],
    quantityHistory:[{
        historyDate: {
            type: Date,
            default: Date.now
        },
        quantity: Number,
        store_quantity: Number
    }]
});

productSchema.index({product_name: "text"})

const Product = mongoose.model('Product', productSchema);

function validate(product) {
    const schema =Joi.object({
        product_name: Joi.string().min(3).max(255).required(),
        categoryID: Joi.string().min(3).max(255),
        brandID: Joi.string().min(3).max(255),
        specialID: Joi.string().min(3).max(255),
        description: Joi.string().optional().allow(''),
        inBox: Joi.string().optional().allow(''),
        quantity: Joi.number().required(),
        shop_price: Joi.number().required(),
        price: Joi.number().greater(Joi.ref('shop_price')).required(),
        status: Joi.boolean()

    }).unknown(true);

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(product, options);
}

exports.Product = Product;
exports.validate = validate;