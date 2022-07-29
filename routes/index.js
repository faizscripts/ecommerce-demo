const {promisify} = require('util')
const redis = require('redis')
const {getModals} = require('../middlewares/otherFunctions');
const mongoose = require('mongoose')
const {BFilter} = require('../models/admin/brand_filters');
const {Brand} = require('../models/admin/brands');
const {Category} = require('../models/admin/categories');
const {Wishlist} = require('../models/wishlist');
const {Cart} = require('../models/cart');
const seeAllTemplate = require('../views/see-all');
const categoriesTemplate = require('../views/view-categories');
const {Product} = require('../models/admin/products');
const homepageTemplate = require('../views/index');
const express = require('express');
const {error} = require("winston");
const {Special} = require("../models/admin/special");
const router = express.Router();

async function shuffleSpecial(specials) {

    let shuffled = []

    for (let i=0; i< specials.length; i++){
        let shuffle = await Product.aggregate([
            {$match: {specialID: mongoose.Types.ObjectId(specials[i]._id)}},
            {$match: {status: true, populateStatus: true}},
            {$sample: {size: 6}}
        ]);
        shuffled.push(shuffle)
    }

    console.log("shuffleSpecial");

    let [featured_products, new_arrivals, sale] = shuffled

    return [featured_products, new_arrivals, sale]
}

async function priceFilter(req, res, pfilter, sortBy, categoryID) {
    let variables = []

    if (Object.keys(pfilter).length > 0) {
        let products = await Product.find(pfilter).and([{categoryID: req.params.id}, {status: true}, {populateStatus: true}]).collation({locale: "en"}).sort(sortBy)

        let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, categoryID)

        products = await Product.find(pfilter).and([{categoryID: req.params.id}, {status: true}, {populateStatus: true}]).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort(sortBy)

        let   [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

        variables = [products, page, iterator, endingLink, numberOfPages]

    } else {
        let products = await Product.find({categoryID: req.params.id, status: true, populateStatus: true}).collation({locale: "en"}).sort('product_name')

        let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, categoryID)

        products = await Product.find({categoryID: req.params.id, status: true, populateStatus: true}).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort('product_name')

        let   [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

        variables = [products, page, iterator, endingLink, numberOfPages]

    }

    let [products, page, iterator, endingLink, numberOfPages] = variables

    await seeAll(req, res, products, page, iterator, endingLink, numberOfPages, sortBy)
}

async function brandsFilter(req, res, bfilter, sortBy, categoryID) {
    let variables = []

    if (bfilter.length > 0) {
        let products = await Product.find({status: true, populateStatus: true}).or(bfilter).collation({locale: "en"}).sort('product_name')

        let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, categoryID)

        products = await Product.find({status: true, populateStatus: true}).or(bfilter).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort('product_name')

        let   [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

        variables = [products, page, iterator, endingLink, numberOfPages]

    } else {
        let products = await Product.find({
            categoryID: req.params.id,
            status: true,
            populateStatus: true
        }).collation({locale: "en"}).sort('product_name')

        let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, categoryID)

        products = await Product.find({
            categoryID: req.params.id,
            status: true,
            populateStatus: true
        }).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort('product_name')

        let   [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

        variables = [products, page, iterator, endingLink, numberOfPages]
    }

    let [products, page, iterator, endingLink, numberOfPages] = variables

    await seeAll(req, res, products, page, iterator, endingLink, numberOfPages, sortBy)
}

const client = redis.createClient({})

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

async function seeAll(req, res, products, page, iterator, endingLink, numberOfPages, sort) {
    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().collation({locale: "en"}).sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    const start = Date.now();
    const rand2 = Math.floor(Math.random() * 10000000000)
    const rand = start.toString() + rand2.toString()

    res.send(seeAllTemplate({
        req,
        category,
        products,
        brands,
        wishlist,
        cart,
        page,
        iterator,
        endingLink,
        numberOfPages,
        sort,
        rand,
        categories
    }))
}

async function ssPagination1(req, res, products, categoryID) {
    if (products.length < 1){
        throw new Error('No product found')
    }

    const resultsPerPage = 10;

    const numOfResults = products.length;

    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
        res.redirect(`/${categoryID}?page=` + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
        res.redirect(`/${categoryID}?page=` + encodeURIComponent('1'));
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

router.get('/', async (req, res) => {
    try {
        // delete the line below once finished setting up all products
        // throw "delete this once finished uploading products"

        const specials = await Special.find();

        let savedFeatured = await GET_ASYNC('savedFeatured')

        if (!savedFeatured) {
            console.log('no savedfeatured')

            let [featured_products, new_arrivals, sale] = await shuffleSpecial(specials);

            savedFeatured = await SET_ASYNC(
                'savedFeatured', JSON.stringify(featured_products), 'EX', 3600
            )

            let savedNew = await SET_ASYNC(
                'savedNew', JSON.stringify(new_arrivals), 'EX', 3600
            )

            let savedSale = await SET_ASYNC(
                'savedSale', JSON.stringify(sale), 'EX', 3600
            )

            let [wishlist, cart] = await getModals(req, Wishlist, Cart)

            const categories = await Category.find().sort('dateCreated')


            res.send(homepageTemplate({
                req,
                categories,
                featured_products: JSON.parse(savedFeatured),
                new_arrivals: JSON.parse(savedNew),
                sale: JSON.parse(savedSale),
                wishlist,
                cart,
                specials
            }));

            return;

        }


        let savedNew = await GET_ASYNC('savedNew')
        let savedSale = await GET_ASYNC('savedSale')

        console.log('found saved specials')

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)

        const categories = await Category.find().sort('dateCreated')

        res.send(homepageTemplate({
            req,
            categories,
            featured_products: JSON.parse(savedFeatured),
            new_arrivals: JSON.parse(savedNew),
            sale: JSON.parse(savedSale),
            wishlist,
            cart,
            specials
        }));

    } catch (e) {

        let specials = await Special.find()

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)

        const categories = await Category.find().sort('dateCreated')

        if (specials.length > 0){

            let shuffled = []

            for (let i=0; i< specials.length; i++){
                let shuffle = await Product.aggregate([
                    {$match: {specialID: mongoose.Types.ObjectId(specials[i]._id)}},
                    {$match: {status: true, populateStatus: true}},
                    {$sample: {size: 6}}
                ]);
                shuffled.push(shuffle)
            }

            let [featured_products, new_arrivals, sale] = shuffled

            res.send(homepageTemplate({req, categories, featured_products, new_arrivals, sale, wishlist, cart, specials}));
        } else {

            let [featured_products, new_arrivals, sale] = [null, null, null]

            res.send(homepageTemplate({req, categories, featured_products, new_arrivals, sale, wishlist, cart, specials}));
        }


    }
})

router.get('/categories', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().select('category_name').sort('dateCreated')

    res.send(categoriesTemplate({req, categories, wishlist, cart}));
})

router.get('/:id', async (req, res) => {
    if (!req.session.sortBy){
        req.session.sortBy = 'product_name'
    }

    let products = await Product.find({categoryID: req.params.id, status: true, populateStatus: true}).sort(req.session.sortBy);

    let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, req.params.id)

    products = await Product.find({
        categoryID: req.params.id,
        status: true, populateStatus: true
    }).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort(req.session.sortBy);

    let [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

    await seeAll(req, res, products, page, iterator, endingLink, numberOfPages, req.session.sortBy)
})

router.get('/latest/:id', async (req, res) => {
    if (req.session.referer){
        if (req.session.referer.includes('/price-filter/')) {
            await priceFilter(req, res, req.session.pfilter, '-dateCreated')
        } else if (req.session.referer.includes('brands-filter')) {
            await brandsFilter(req, res, req.session.bfilter, '-dateCreated')
        }
    }
     else {
        req.session.sortBy = '-dateCreated'
        res.redirect(`/${req.params.id}`)
    }
})

router.get('/alpha/:id', async (req, res) => {
    if (req.session.referer){
        if (req.session.referer.includes('/price-filter/')) {
            await priceFilter(req, res, req.session.pfilter, 'product_name')
        } else if (req.session.referer.includes('brands-filter')) {
            await brandsFilter(req, res, req.session.bfilter, 'product_name')
        }
    }
    else {
        req.session.sortBy = 'product_name'
        res.redirect(`/${req.params.id}`)
    }
})

router.get('/lth/:id', async (req, res) => {
    if (req.session.referer){
        if (req.session.referer.includes('/price-filter/')) {
            await priceFilter(req, res, req.session.pfilter, 'price')
        } else if (req.session.referer.includes('brands-filter')) {
            await brandsFilter(req, res, req.session.bfilter, 'price')
        }
    }
    else {
        req.session.sortBy = 'price'
        res.redirect(`/${req.params.id}`)
    }
})

router.get('/htl/:id', async (req, res) => {
    if (req.session.referer){
        if (req.session.referer.includes('/price-filter/')) {
            await priceFilter(req, res, req.session.pfilter, '-price')
        } else if (req.session.referer.includes('brands-filter')) {
            await brandsFilter(req, res, req.session.bfilter, '-price')
        }
    }
    else {
        req.session.sortBy = '-price'
        res.redirect(`/${req.params.id}`)
    }
})

router.get('/price-filter/:id', async (req, res) => {
    let pfilter = req.session.pfilter;

    req.session.referer = req.originalUrl;

    await priceFilter(req, res, pfilter, 'product_name', req.params.id)

    // req.session.pfilter = null;
})

router.post('/price-filter/:id', async (req, res) => {
    let min = {}
    let max = {}

    for (let prop in req.body) {
        if (parseInt(req.body[prop]) > 0) {
            if (prop === 'min') {
                min = {"$gte": parseInt(req.body[prop])}
            } else if (prop === 'max') {
                max = {"$lte": parseInt(req.body[prop])}
            }
        }
    }

    let pfilter = {};

    if (Object.keys(min).length > 0 || Object.keys(max).length > 0) {
        pfilter = {
            price: {...min, ...max}
        }
    }

    req.session.pfilter = pfilter;

    req.session.referer = req.originalUrl;

    await priceFilter(req, res, pfilter, 'product_name', req.params.id)
})

router.get('/brands-filter/:id/:rand', async (req, res) => {

    let bfilter = []

    const dbFilter2 = await BFilter.find({rand: req.params.rand})

    const dbFilter = dbFilter2[0]

    bfilter = dbFilter.filterArray;

    req.session.bfilter = dbFilter.filterArray;

    req.session.referer = dbFilter.originalUrl;

    req.session.bfliterPagination = req.params.rand

    await brandsFilter(req, res, bfilter, req.params.id)

    // req.session.bfilter = null;
})

router.post('/brands-filter/:id/:rand', async (req, res) => {
    let bfilter = []

    let dbBFilter = new BFilter()

    dbBFilter.rand = req.params.rand

    for (let prop in req.body) {
        if (mongoose.isValidObjectId(prop)) {

            // no sub brand
            if (prop.toString() === req.body[prop].toString()) {
                bfilter.push({brandID: prop})
            } else {
                bfilter.push({subBrandID: req.body[prop]})
            }
        }
    }

    req.session.bfilter = bfilter;

    req.session.referer = req.originalUrl;

    dbBFilter.filterArray = bfilter

    dbBFilter.rand = req.params.rand;

    dbBFilter.originalUrl = req.originalUrl;

    req.session.bfliterPagination = req.params.rand

    await dbBFilter.save();

    await brandsFilter(req, res, bfilter, req.params.id);
})

router.get('/reset/:id', async (req, res) => {
    req.session.referer = ''

    req.session.sortBy = 'product_name'

    if (!req.session.sortBy){
        req.session.sortBy = 'product_name'
    }

    let products = await Product.find({categoryID: req.params.id, status: true, populateStatus: true}).sort(req.session.sortBy);

    let [page, startingLimit, numberOfPages, resultsPerPage] = await ssPagination1(req, res, products, req.params.id)

    products = await Product.find({
        categoryID: req.params.id,
        status: true, populateStatus: true
    }).collation({locale: "en"}).skip(startingLimit).limit(resultsPerPage).sort(req.session.sortBy);

    let [iterator, endingLink] = await ssPagination2(products, page, numberOfPages)

    await seeAll(req, res, products, page, iterator, endingLink, numberOfPages, req.session.sortBy)
})



module.exports = router;