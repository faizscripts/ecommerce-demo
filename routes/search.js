const winston = require('winston');
const axios = require('axios');
const crypto = require('crypto');
const requestIp = require('request-ip');
const mongoose = require('mongoose');
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist');
const {Cart} = require('../models/cart');
const searchTemplate = require('../views/search');
const externalTemplate = require('../views/external');
const {Product} = require('../models/admin/products');
const express = require('express');
const {Category} = require("../models/admin/categories");
const router = express.Router();

async function ssPagination1(req, res, products) {
    if (products.length < 1){
        throw new Error('No product found')
    }

    const resultsPerPage = 10;

    const numOfResults = products.length;

    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);


    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
        res.redirect('/search?page=' + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
        res.redirect('/search?page=' + encodeURIComponent('1'));
    }

    const startingLimit = (page - 1) * resultsPerPage;

    return [page, startingLimit, numberOfPages, resultsPerPage]
}

async function ssPagination2(products, page, numberOfPages) {
    let iterator = (page - 5) < 1 ? 1 : page - 5;
    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
    if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numberOfPages;
    }

    return [iterator, endingLink]
}

router.get('/', async(req, res) => {

    let query

    if (req.query.query){
       query =  req.query.query.trim()
        req.session.query = req.query.query.trim()
    } else {
        query = req.session.query.trim()
    }

    const {format} = require('winston');
    const customFormat = winston.format.combine(
        format.colorize(),
        format.align(),
        format.timestamp({format: 'hh:mm DD-MM'}),
        format.printf(info => `${info.timestamp} ${info.level}:${info.message}`
        )
    )

    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: 'logfile.log',
                format: customFormat,
                level: 'info'
            })
        ]
    });

    logger.log({
        level: 'info',
        message: `Search for ${query}`
    });

    let products = await Product.aggregate(
        [
            { $match: { $text: { $search: query} } },
            { $match: {status: true, populateStatus: true}},
            { $project: { product_name:1, categoryID:1, brandID:1, subBrandID:1, specialID:1, description:1, inBox:1, quantity :1, shop_price:1, price:1, status:1, product_images:1,dateCreated :1, populateStatus:1, score: { $meta: "textScore" } } },
            { $match: { score: { $gte: query.split(' ').length/2} } },
            { $sort: { score: { $meta: "textScore" }, "product_name": 1 } }
        ]
    )

    let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products)

    products = await Product.aggregate(
        [
            { $match: { $text: { $search: query} } },
            { $match: {status: true, populateStatus: true}},
            { $project: { product_name:1, categoryID:1, brandID:1, subBrandID:1, specialID:1, description:1, inBox:1, quantity :1, shop_price:1, price:1, status:1, product_images:1,dateCreated :1, populateStatus:1, score: { $meta: "textScore" } } },
            { $match: { score: { $gte: query.split(' ').length/2} } },
            { $sort: { score: { $meta: "textScore" }, "product_name": 1 } }
        ]
    ).skip(startingLimit).limit(resultsPerPage)

    let [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    //Start of search pixel code, uncomment the code below to activate the tracking

    /*
    const pixelUrl = `https://graph.facebook.com/v12.0/${process.env.PIXEL_ID}/${process.env.PIXEL_ACCESS_TOKEN}`

    const time = Math.floor(Date.now() / 1000)
    const hashedQuery = crypto.createHmac('sha256', query).digest('hex');
    const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
    const eventUrl = req.headers.referer;

    const pixelData = {
        "data": [
            {
                "event_name": "Search",
                "event_time": time,
                "action_source": "website",
                "event_source_url": eventUrl,
                "user_data": {
                    "external_id": [
                        hashedQuery
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

    //End of search pixel code

    res.send(searchTemplate({req, products, wishlist, cart, page, iterator, endingLink, numberOfPages, categories}))
})

router.get('/lth/', (req, res) => {
    req.session.sortBy = 'price'

    res.redirect('/search')
})

router.get('/htl/', (req, res) => {
    req.session.sortBy = '-price'

    res.redirect('/search')
})

router.get('/latest/', (req, res) => {
    req.session.sortBy = '-dateCreated'

    res.redirect('/search')
})

router.get('/alpha/', (req, res) => {
    req.session.sortBy = 'product_name'

    res.redirect('/search')
})

router.get('/default/', (req, res) => {
    req.session.sortBy = 'default'

    res.redirect('/search')
})

router.get('/ext/:id', async (req, res) => {

    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) throw new Error('Invalid product ID')

    const product2 = await Product.find({_id: req.params.id, status: true, populateStatus: true});
    const product = product2[0]
    if (!product) throw new Error('Product not found');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    res.send(externalTemplate({req, product, wishlist, cart, categories}))
})

module.exports = router;