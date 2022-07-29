const {getModals} = require('../middlewares/otherFunctions');
const {Customer} = require('../models/customers')
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const mongoose = require('mongoose');
const checkoutTemplate = require('../views/checkout');
const logged = require('../middlewares/logged');
const express = require('express');
const {Category} = require("../models/admin/categories");
const router = express.Router();

async function goToCheckout(req, res) {

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    const customer = await Customer.find({email: req.session.email})

    let paymentError;

    if (req.session.paymentError){
        paymentError = req.session.paymentError
    }

    res.send(checkoutTemplate({req, customer: customer[0], wishlist, cart, paymentError, categories}))
}

router.get('/', logged, async (req, res) => {

    let cartUpdate = await Cart.findById(req.session.cartID)

    if (req.session.notLoggedCart) {
        if (Object.keys(req.session.notLoggedCart).length > 0) {
            for (let prop in req.session.notLoggedCart) {
                if (mongoose.isValidObjectId(prop)) {
                    let product = cartUpdate.products.id(prop);
                    product.quantity = req.session.notLoggedCart[prop]
                }
            }

            cartUpdate.total = req.session.notLoggedCart.total;
            cartUpdate.shopTotal = req.session.notLoggedCart.shopTotal;
        }
    } else if (req.session.loggedInCart){
        if (Object.keys(req.session.loggedInCart).length>0){
            for (let prop in req.session.loggedInCart) {
                if (mongoose.isValidObjectId(prop)) {
                    let product = cartUpdate.products.id(prop);
                    product.quantity = req.session.loggedInCart[prop]
                }
            }

            cartUpdate.total = req.session.loggedInCart.total;
            cartUpdate.shopTotal = req.session.loggedInCart.shopTotal;
        }
    }

    await cartUpdate.save();

    req.session.notLoggedCart = {};

    await goToCheckout(req, res);
})

router.post('/', logged, async (req, res) => {

    let cartUpdate = await Cart.findById(req.session.cartID)

    if (Object.keys(req.session.loggedInCart).length>0){
        for (let prop in req.session.loggedInCart) {
            if (mongoose.isValidObjectId(prop)) {
                let product = cartUpdate.products.id(prop);
                product.quantity = req.session.loggedInCart[prop]
            }
        }

        cartUpdate.total = req.session.loggedInCart.total;
        cartUpdate.shopTotal = req.session.loggedInCart.shopTotal;
    }

    await cartUpdate.save();

    req.session.loggedInCart = {}

    await goToCheckout(req, res);
})

module.exports = router;