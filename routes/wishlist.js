const axios = require('axios');
const crypto = require('crypto');
const mongoose = require('mongoose');
const {Wishlist} = require('../models/wishlist');
const express = require('express');
const router = express.Router();

router.post('/:id', async (req, res) => {
    let wishlist = {};

    if (!req.session.wishlistID) {
        wishlist = new Wishlist();
        wishlist = await wishlist.save();
        req.session.wishlistID = wishlist._id;
    } else {
        wishlist = await Wishlist.findById(req.session.wishlistID);
    }

    const product = wishlist.products.id(req.params.id);

    if (!product) {
        wishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
            $push: {
                products: {
                    _id: req.params.id,
                }
            }
        }, {new: true})

        const pixelUrl = 'https://graph.facebook.com/v12.0/1557304177945106/events?access_token=EAAFsem5CeJEBABvXPEoZB9D1awPyUK8lxxoIOes4dJ3YJMs8creChlVna7pZCTBr6Ar6c05zjHGk74nTvQVVgpKCTNgN5EOl53a9sXWxYhNHqvqkzmZBs5lb0k3FhWNjXoVZA51q0mlcXF9WhMOCwZAyDZCGaNZBNh6NdqGjixLhRv6ZCX6ZCsj9gpNBablzSfw4ZD'

        const time = Math.floor(Date.now() / 1000)
        const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
        const eventUrl = req.headers.referer

        const pixelData = {
            "data": [
                {
                    "event_name": "AddToWishlist",
                    "event_time": time,
                    "action_source": "website",
                    "event_source_url": eventUrl,
                    "user_data": {
                        "external_id": [
                            wishlist._id
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

    } else {
        wishlist = await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
            $pull: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})
    }

    await wishlist.save();

    req.session.wishlistCount = wishlist.products.length

    res.redirect('back');
});

router.post('/delete/:id', async (req, res) => {
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

module.exports = router;
