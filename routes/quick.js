const {getModals, emailOrderStatus} = require('../middlewares/otherFunctions');
const {Product} = require('../models/admin/products')
const {Order} = require('../models/admin/orders')
const {Customer} = require('../models/customers')
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const mongoose = require('mongoose');
const quickTemplate = require('../views/quick');
const express = require('express');
const ordersTemplate = require("../views/orders");
const crypto = require("crypto");
const axios = require("axios");
const router = express.Router();

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)

    res.send(quickTemplate({ product }))
})

router.post('/:id', async (req, res) => {

    const product = await Product.findById(req.params.id)

    let order = new Order({
        products: [{
            productID: product._id,
            quantity: 1,
            price: product.price,
            product_name: product.product_name
        }],
        total: product.price-req.body.delivery_fee,
        shopTotal: product.shop_price,
        orderStatus : 'Order placed',
        mpesa: 'false',
        delivery_fee: req.body.delivery_fee,
        address: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        option: req.body.options,
        eEmail: req.body.email,
        ePhone: req.body.phone,
        eName: req.body.fullname
    });

    order = await order.save()

    const pixelUrl = 'https://graph.facebook.com/v12.0/1557304177945106/events?access_token=EAAFsem5CeJEBABvXPEoZB9D1awPyUK8lxxoIOes4dJ3YJMs8creChlVna7pZCTBr6Ar6c05zjHGk74nTvQVVgpKCTNgN5EOl53a9sXWxYhNHqvqkzmZBs5lb0k3FhWNjXoVZA51q0mlcXF9WhMOCwZAyDZCGaNZBNh6NdqGjixLhRv6ZCX6ZCsj9gpNBablzSfw4ZD'

    const time = Math.floor(Date.now() / 1000)
    const hashedEmail = crypto.createHmac('sha256', order.eEmail).digest('hex');
    const hashedPhone = crypto.createHmac('sha256', `254${order.ePhone}`).digest('hex');
    const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
    const eventUrl = req.headers.referer

    const pixelData = {
        "data": [
            {
                "event_name": "InitiateCheckout",
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
                    "external_id": [
                        req.params.id
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

    await emailOrderStatus(order, order.eEmail, order.eName).catch(console.error);

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(ordersTemplate({req, orders: [order], wishlist, cart}))
})

module.exports = router;