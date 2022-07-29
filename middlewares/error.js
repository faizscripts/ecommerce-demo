const adminErrorPage = require('../views/admin/404admin')
const posErrorPage = require('../views/pos/404pos')
const errorPage = require('../views/404')
const winston = require('winston');
const {getModals} = require("../middlewares/otherFunctions");
const {Wishlist} = require("../models/wishlist");
const {Cart} = require("../models/cart");
const {Category} = require("../models/admin/categories");

module.exports = async function (err, req, res, next) {
    winston.error(err.message, {metadata: err});

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const categories = await Category.find().sort('dateCreated')

    if (!req.originalUrl.includes('admin') && !req.originalUrl.includes('pos')){
        res.status(500).send(errorPage({req, wishlist, cart, err, categories}));
    } else if (req.originalUrl.includes('admin')){
        res.status(500).send(adminErrorPage({err}));
    } else if (req.originalUrl.includes('pos')){
        res.status(500).send(posErrorPage({err}));
    }  else {
        res.status(500).send(err.message);
    }

}