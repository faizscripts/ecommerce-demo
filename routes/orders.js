const axios = require('axios');
const crypto = require('crypto');
const sessionstorage = require('sessionstorage');
const { ObjectId } = require('mongodb');
const _ = require('lodash');
const {accessToken, stkPush} = require('../middlewares/mpesa')
const {emailOrderStatus} = require('../middlewares/otherFunctions')
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const {Order} = require('../models/admin/orders')
const {Customer} = require('../models/customers')
const ordersTemplate = require('../views/orders');
const confirmTemplate = require('../views/confirm');
const express = require('express');
const {Category} = require("../models/admin/categories");
const router = express.Router();

sessionstorage.setItem('paymentResults', null)

async function placeOrder(req, res) {
    if (req.session.newOrder){
        let checkOrder = await Cart.findById(req.session.cartID);

        if (checkOrder.products.length > 0){
            const updateCart = await Cart.findById(req.session.cartID).populate('products._id', ' product_name price');

            const products = updateCart.products.map(
                product => {
                    return {
                        productID: product._id._id,
                        product_name: product._id.product_name,
                        price: product._id.price,
                        quantity: product.quantity
                    }
                }
            )

            let order = new Order({
                products: products,
                total: updateCart.total,
                shopTotal: updateCart.shopTotal,
            });

            await Cart.findByIdAndUpdate(req.session.cartID, {
                products: [],
                total: 0
            }, {new: true})

            order.customerID = new ObjectId();

            order.customerName = req.body.fullname;

            order.customerEmail = req.body.email;

            order.customerPhone = req.body.phone;

            order.orderStatus = 'Order placed';

            order.delivery_fee = req.body.delivery_fee

            order.address = {latitude: req.body.latitude, longitude: req.body.longitude}

            if (sessionstorage.getItem('mpesaDetails')){
                // order.mpesaDetails = sessionstorage.getItem('mpesaDetails');
                order.mpesa = req.session.mpesa;
            } else {
                order.mpesa = req.session.mpesa;
            }

            order = await order.save()

            if (req.body.email) {
                await emailOrderStatus(order, req.body.email, req.body.fullname).catch(console.error);
            }

            const time = Math.floor(Date.now() / 1000)
            const hashedEmail = crypto.createHmac('sha256', req.body.email).digest('hex');
            const hashedPhone = crypto.createHmac('sha256', `254${req.body.phone}`).digest('hex');

            const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
            const eventUrl = req.headers.referer
            const pixelTotal = order.total + order.delivery_fee

            const pixelData = {
                "data": [
                    {
                        "event_name": "Purchase",
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
                        },
                        "custom_data": {
                            "currency": "KES",
                            "value": pixelTotal,
                            "order_id": order._id
                        }
                    }
                ]
            }

            // axios.post(pixelUrl, pixelData).catch(reason => console.log(reason))

            return Order.find({customerID: order.customerID}).sort('-orderDate')
        }
        else {
            req.session.newOrder = false
            res.redirect('/orders')
        }

    } else {
        const customer = await Customer.find({email: req.session.email})

        return Order.find({customerID: customer[0]._id}).sort('-orderDate');
    }
}

router.get('/', async (req, res) => {

    const orders = await placeOrder(req, res)

    req.session.newOrder = false;

    req.session.mpesa = 'false';

    sessionstorage.setItem('paymentResults', null)

    sessionstorage.setItem('mpesaDetails', null)

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    res.send(ordersTemplate({req, orders, wishlist, cart, categories}))
})

router.post('/', async (req, res) => {

    req.session.paymentError = null;

    req.session.mpesa = req.body.mpesa.toString();

    req.session.newOrder = true;

    sessionstorage.setItem('paymentResults', null)

    sessionstorage.setItem('mpesaDetails', null)

    const orders = await placeOrder(req, res);

    req.session.newOrder = false;

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    res.send(ordersTemplate({req, orders, wishlist, cart, categories}))
})

router.get('/mpesa', accessToken, async(req, res) => {
    await stkPush(req, res)
})

router.post('/paying', async (req, res) => {
    sessionstorage.setItem('paymentResults', req.body.Body.stkCallback)

    if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
        sessionstorage.setItem('mpesaDetails', {
            amount: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[0].Value,
            mpesaCode: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[1].Value,
            transactionDate: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[2].Value,
            phone: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[3].Value,
        })
    }

})

router.get('/confirm', (req, res) => {
    if (sessionstorage.getItem('paymentResults')){
        if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
            res.redirect('/orders')
        } else {
            res.send(confirmTemplate({confirmationError: true}))
        }
    } else {
        res.send(confirmTemplate({confirmationError: true}))
    }

})

router.get('/cancel', (req, res) => {

    if (sessionstorage.getItem('paymentResults')) {
        if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
            res.redirect('/orders')
        } else {
            req.session.paymentError = sessionstorage.getItem('paymentResults').ResultDesc
            res.redirect('/checkout')
        }
    } else {
        req.session.paymentError = 'An error occured with the payment'
        res.redirect('/checkout')
    }

})


module.exports = router;
