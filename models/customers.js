const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi =  require('joi');

const customerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        min: 0,
        trim: true,
    },
    delivery_fee: {
        type: Number,
        min: 0,
        trim: true,
    },
    distance: {
        type: Number,
        min: 0,
        trim: true,
    },
    order_count: {
        type: Number,
        default: 0
    },
    income_gen: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
    },
    latitude: Number,
    longitude: Number,
    address: String,
    orderNotes: {
        type: String,
        minlength: 3,
        trim: true,
    },
    cartID: {
        type: mongoose.Types.ObjectId,
        ref: 'Cart'
    },
    wishlistID: {
        type: mongoose.Types.ObjectId,
        ref: 'Wishlist'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

customerSchema.methods.generateLoginToken = function () {
    return jwt.sign({_id: this._id}, config.get('JWTKEY'));
}

const Customer = mongoose.model('Customer', customerSchema);

function validate(customer) {
    const schema = Joi.object({
        full_name: Joi.string().min(3).max(255),
        email: Joi.string().email().min(3).max(255),
        phone: Joi.number(),
        password: Joi.string().min(8).max(50),
        password_confirmation: Joi.any().equal(Joi.ref('password')).options({ messages: { 'any.only': 'Passwords do not match'} }),
        latitude: Joi.number(),
        longitude: Joi.number(),
        delivery_fee: Joi.number().required(),
        distance: Joi.number().required(),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(customer, options);
}

exports.Customer = Customer;
exports.validate = validate;
