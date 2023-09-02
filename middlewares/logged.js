const axios = require('axios');
const crypto = require('crypto');
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const jwt = require('jsonwebtoken');
const config = require('config');
const loginTemplate = require('../views/login');
const {Category} = require("../models/admin/categories");

module.exports =async function (req, res, next) {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    //Start of initiate checkout pixel code, uncomment the code below to activate the tracking

    /*
    const pixelUrl = `https://graph.facebook.com/v12.0/${process.env.PIXEL_ID}/${process.env.PIXEL_ACCESS_TOKEN}`

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

    axios.post(pixelUrl, pixelData).catch(reason => console.log(reason))
     */

    //End of initiate checkout pixel code

    let token = req.session.token
    if (!token) {
        req.session.checkout = false;
        req.session.notLoggedCart = req.body;
        next()
    }

}
