const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    },
    shopTotal: {
        type: Number,
        default: 0
    },
})

const Cart = mongoose.model('Cart', cartSchema);

exports.Cart = Cart;