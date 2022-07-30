const crypto = require('crypto');
const {getModals, emailRegistration} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const registerTemplate = require('../views/register');
const editTemplate = require('../views/edit-customer');
const checkoutTemplate = require('../views/checkout');
const {Customer, validate} = require('../models/customers');
const express = require('express');
const axios = require("axios");
const {Category} = require("../models/admin/categories");
const router = express.Router();

router.get('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    if (req.headers.referer) {
        req.session.signUpIn = req.headers.referer.split(req.headers.host).pop()
    }

    res.send(registerTemplate({req, wishlist, cart, categories}));
})

router.post('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    const {error} = validate(req.body);
    if (error) return res.status(400).send(registerTemplate({
        req,
        input: req.body,
        error: error.details[0],
        wishlist,
        cart,
        categories
    }))

    let customer = await Customer.findOne({email: req.body.email});
    if (customer) return res.status(400).send(registerTemplate({req, exists: true, wishlist, cart, categories}))

    customer = new Customer(
        _.pick(req.body, ['full_name', 'email', 'phone', 'password', 'latitude', 'longitude', 'delivery_fee', 'distance'])
    );

    const salt = await bcrypt.genSalt(10);

    customer.password = await bcrypt.hash(customer.password, salt);

    customer.address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${customer.latitude},${customer.longitude}&key=${process.env.KEY}`).then(value =>   {
        return value.data.results[0].formatted_address
    }).catch(reason => console.log(reason))

    if (!req.session.wishlistID) {
        wishlist = new Wishlist();
        wishlist = await wishlist.save();
        customer.wishlistID = wishlist._id;
        req.session.wishlistID = wishlist._id;
    } else {
        customer.wishlistID = req.session.wishlistID;
    }

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        customer.cartID = cart._id;
        req.session.cartID = cart._id;
    } else {
        customer.cartID = req.session.cartID;
    }

    customer = await customer.save();

    const token = customer.generateLoginToken();

    req.session.full_name = customer.full_name;

    req.session.email = customer.email;

    req.session.token = token;

    await emailRegistration(customer).catch(console.error)

    //Start of complete registration pixel code, uncomment the code below to activate the tracking

    /*
        const pixelUrl = `https://graph.facebook.com/v12.0/${process.env.PIXEL_ID}/${process.env.PIXEL_ACCESS_TOKEN}`

    const time = Math.floor(Date.now() / 1000)
    const hashedEmail = crypto.createHmac('sha256', customer.email).digest('hex');
    const hashedPhone = crypto.createHmac('sha256', `254${customer.phone}`).digest('hex');
    const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
    const eventUrl = req.headers.referer

    const pixelData = {
        "data": [
            {
                "event_name": "CompeleteRegistration",
                "event_time": time,
                "action_source": "website",
                "event_source_url": eventUrl,
                "user_data": {
                    "em": [
                        hashedEmail
                    ],
                    "ph": [
                        hashedPhone
                    ],
                    "country": [
                        hashedCountry
                    ],
                    "client_user_agent": req.headers['user-agent'],
                }
            }
        ]
    }

    axios.post(pixelUrl, pixelData).catch(reason => console.log(reason))
     */

    //End of complete registration pixel code

    if (req.session.checkout) {
        res.redirect('/checkout')
    } else if (req.session.signUpIn === '/register' || req.session.signUpIn === '/login') {
        res.redirect('/')
    } else {
        res.redirect(req.session.signUpIn)
    }

    req.session.signUpIn = null;
    req.session.checkout = false;
})

router.get('/edit', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    const customer = await Customer.find({email: req.session.email})

    res.send(editTemplate({req, customer: customer[0], wishlist, cart, categories}));
})

router.post('/edit', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editTemplate({
        req,
        input: req.body,
        error: error.details[0],
        wishlist,
        cart,
        categories
    }))

    let customer = await Customer.findOneAndUpdate({email: req.session.email}, {
        full_name: req.body.full_name,
        phone: req.body.phone,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        delivery_fee: req.body.delivery_fee,
        distance: req.body.distance
    }, {new: true})

    customer.address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${customer.latitude},${customer.longitude}&key=${process.env.KEY}`).then(value =>   {
        return value.data.results[0].formatted_address
    }).catch(reason => console.log(reason))

    customer = await customer.save();

    const token = customer.generateLoginToken();

    req.session.full_name = customer.full_name;

    req.session.email = customer.email;

    req.session.token = token;

    res.send(checkoutTemplate({req, customer, wishlist, cart, categories}))
})

module.exports = router;