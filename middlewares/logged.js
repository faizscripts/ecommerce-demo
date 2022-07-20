const axios = require('axios');
const crypto = require('crypto');
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const jwt = require('jsonwebtoken');
const config = require('config');
const loginTemplate = require('../views/login');

module.exports =async function (req, res, next) {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const pixelUrl = 'https://graph.facebook.com/v12.0/1557304177945106/events?access_token=EAAFsem5CeJEBABvXPEoZB9D1awPyUK8lxxoIOes4dJ3YJMs8creChlVna7pZCTBr6Ar6c05zjHGk74nTvQVVgpKCTNgN5EOl53a9sXWxYhNHqvqkzmZBs5lb0k3FhWNjXoVZA51q0mlcXF9WhMOCwZAyDZCGaNZBNh6NdqGjixLhRv6ZCX6ZCsj9gpNBablzSfw4ZD'

    const time = Math.floor(Date.now() / 1000)
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

    let token = req.session.token
    if (!token) {
        req.session.checkout = true;
        req.session.notLoggedCart = req.body;
        return res.status(401).send(loginTemplate({req, wishlist, cart}))
    }

    try{
        req.customer = jwt.verify(token, config.get('JWTKEY'));
        req.session.checkout = false;
        req.session.loggedInCart = req.body;
        next()
    } catch (e) {
        res.status(400).send('invalid token')
    }

}