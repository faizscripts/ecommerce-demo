const axios = require('axios');
const crypto = require('crypto');
const mongoose = require('mongoose');
const {Product} = require('../models/admin/products');
const {Cart} = require('../models/cart');
const {Wishlist} = require('../models/wishlist');
const express = require('express');
const router = express.Router();

function addToCartPixel(req, cart) {
    const pixelUrl = 'https://graph.facebook.com/v12.0/1557304177945106/events?access_token=EAAFsem5CeJEBABvXPEoZB9D1awPyUK8lxxoIOes4dJ3YJMs8creChlVna7pZCTBr6Ar6c05zjHGk74nTvQVVgpKCTNgN5EOl53a9sXWxYhNHqvqkzmZBs5lb0k3FhWNjXoVZA51q0mlcXF9WhMOCwZAyDZCGaNZBNh6NdqGjixLhRv6ZCX6ZCsj9gpNBablzSfw4ZD'

    const time = Math.floor(Date.now() / 1000)
    const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
    const eventUrl = req.headers.referer

    const pixelData = {
        "data": [
            {
                "event_name": "AddToCart",
                "event_time": time,
                "action_source": "website",
                "event_source_url": eventUrl,
                "user_data": {
                    "external_id": [
                        cart._id
                    ],
                    "country": [
                        hashedCountry
                    ],
                    "client_user_agent": req.headers['user-agent'],
                }
            }
        ]
    }

    // axios.post(pixelUrl, pixelData).catch(reason => console.log(reason))
}

router.post('/:id', async (req, res) => {
    let cart;

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        req.session.cartID = cart._id;
    } else {
        cart = await Cart.findById(req.session.cartID);
    }

    const product = cart.products.id(req.params.id);

    if (!product){
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $push: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})

        addToCartPixel(req, cart)

    } else {
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $pull: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})
    }

    await cart.save();

    req.session.cartCount = cart.products.length

    res.redirect('back')
})

router.post('/checkout/:id', async(req, res) => {
    let cart;

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        req.session.cartID = cart._id;
    } else {
        cart = await Cart.findById(req.session.cartID);
    }

    const product = cart.products.id(req.params.id);

    if (!product){
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $push: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})

        addToCartPixel(req, cart)
    }

    await cart.save();

    req.session.cartCount = cart.products.length

    const previousUrl = req.headers.referer.split(req.headers.host).pop()

    res.redirect(`${previousUrl}#cart`);
})

router.post('/from-wish/:id', async (req, res) => {
    let cart;

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        req.session.cartID = cart._id;
    } else {
        cart = await Cart.findById(req.session.cartID);
    }

    const product = cart.products.id(req.params.id);

    const actualProduct = await Product.findById(req.params.id);

    if (!product){
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $push: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})

        cart.total += actualProduct.price;
    }

    addToCartPixel(req, cart)

    await cart.save();

    req.session.cartCount = cart.products.length

    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const wishlist = await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    req.session.wishlistCount = wishlist.products.length

    const previousUrl = req.headers.referer.split(req.headers.host).pop()

    res.redirect(`${previousUrl}#wishlist`);

})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let cart = await Cart.findById(req.session.cartID).populate('products._id', 'price');

    const product = cart.products.id(req.params.id);

    const productPrice = product.quantity * product._id.price;

    cart = await Cart.findByIdAndUpdate(req.session.cartID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    cart.total -= productPrice;

    await cart.save()

    req.session.cartCount = cart.products.length

    const previousUrl = req.headers.referer.split(req.headers.host).pop()

    res.redirect(`${previousUrl}#cart`);
})

module.exports = router;