const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const {getModals, emailForgotPassword} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const loginTemplate = require('../views/login');
const forgotTemplate = require('../views/forgot');
const forgotsentTemplate = require('../views/forgotsent');
const resetTemplate = require('../views/reset');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Customer} = require('../models/customers');

router.get('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    if (req.headers.referer){
        req.session.signUpIn = req.headers.referer.split(req.headers.host).pop()

    }

    res.send(loginTemplate({req, wishlist, cart}))
})

router.post('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const {error} = validate(req.body);
    if (error) return res.status(400).send(loginTemplate({req, input: req.body, error: error.details[0], wishlist, cart}))

    let customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(400).send(loginTemplate({req, incorrect: true, wishlist, cart}));

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send(loginTemplate({req, incorrect: true, wishlist, cart}));

    const token = customer.generateLoginToken();

    req.session.full_name = customer.full_name;

    req.session.email = customer.email;

    req.session.token = token;

    if (req.session.wishlistID){
        let newWishlist = await Wishlist.findById(req.session.wishlistID);
        await Wishlist.findByIdAndUpdate(customer.wishlistID, {
            $addToSet: {products: newWishlist.products}
        });
        req.session.wishlistID = customer.wishlistID;
    } else {
        req.session.wishlistID = customer.wishlistID;
    }

    if (!customer.wishlistID){
        wishlist = new Wishlist();
        wishlist = await wishlist.save();
        customer.wishlistID = wishlist._id;
        await customer.save()
    }

    if (!customer.cartID){
        cart = new Cart();
        cart = await cart.save();
        customer.cartID = cart._id;
        await customer.save()
    }

    if (req.session.cartID){
        let newCart = await Cart.findById(req.session.cartID);
        await Cart.findByIdAndUpdate(customer.cartID, {
            $addToSet: {products: newCart.products}
        });
        req.session.cartID = customer.cartID;
    } else {
        req.session.cartID = customer.cartID;
    }

    if (req.session.checkout){
        res.redirect('/checkout')
    } else if (req.session.signUpIn === '/register' || req.session.signUpIn === '/login'){
        res.redirect('/')
    } else {
        res.redirect(req.session.signUpIn)
    }

    req.session.signUpIn = null;
    req.session.checkout = false;
})

router.get('/logout', (req, res) => {
    req.session.full_name = null;

    req.session.email = null;

    req.session.token = null;

    req.session.checkout = false;

    res.redirect('/')
})

router.get('/forgot', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(forgotTemplate({req, wishlist, cart}))
})

router.post('/forgot', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    let customer = await Customer.findOne({email: req.body.email})
    if (!customer) return res.status(400).send(forgotTemplate({req, wishlist, cart, incorrect: true}))

    const token = jwt.sign({customer: customer.email}, config.get('JWTKEY')+customer.password, { expiresIn: '15m' });

    const link = `https://amazon-cellular.com/login/reset/${customer._id}/${token}`;
    
    await emailForgotPassword(customer.email, customer.full_name, link)

    res.send(forgotsentTemplate({email: customer.email}))
})

router.get('/reset/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    const valid = mongoose.isValidObjectId(id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)
    
    const customer = await Customer.findById(id)
    if (!customer) return res.status(400).send(forgotTemplate({req, wishlist, cart, idError: true}))

    try {
        const payload = jwt.verify(token, config.get('JWTKEY')+customer.password);

        res.send(resetTemplate({req, wishlist, cart, customer, token}))

    } catch (error) {
        throw new Error(error)
    }
})

router.post('/reset/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    const valid = mongoose.isValidObjectId(id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const customer = await Customer.findById(id)
    if (!customer) return res.status(400).send(forgotTemplate({req, wishlist, cart, idError: true}))

    try {
        const payload = jwt.verify(req.params.token, config.get('JWTKEY')+customer.password);

        const {error} = checkPassword(req.body);
        if (error) return res.status(400).send(resetTemplate({req, customer, error: error.details[0], token: req.params.token, wishlist, cart}))

        const salt = await bcrypt.genSalt(10);

        customer.password = await bcrypt.hash(req.body.password, salt);

        await customer.save()

        const token = customer.generateLoginToken();

        req.session.full_name = customer.full_name;

        req.session.email = customer.email;

        req.session.token = token;

        res.redirect('/')

    } catch (error) {
        throw new Error(error)
    }
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(req, options);
}

function checkPassword(req) {
    const schema = Joi.object({
        password: Joi.string().min(8).max(50),
        password_confirmation: Joi.any().equal(Joi.ref('password')).options({ messages: { 'any.only': 'Passwords do not match'} }),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(req, options);
}

module.exports = router;