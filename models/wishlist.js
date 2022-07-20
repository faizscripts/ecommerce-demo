const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
})


const Wishlist = mongoose.model('Wishlist', wishlistSchema);

exports.Wishlist = Wishlist;