const adminErrorPage = require('../views/admin/404admin')
const posErrorPage = require('../views/pos/404pos')
const errorPage = require('../views/404')
const winston = require('winston');
const {getModals} = require("../middlewares/otherFunctions");
const {Wishlist} = require("../models/wishlist");
const {Cart} = require("../models/cart");

module.exports = async function (err, req, res, next) {
    winston.error(err.message, {metadata: err});

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    if (!req.originalUrl.includes('admin') && !req.originalUrl.includes('pos')){
        res.status(500).send(errorPage({req, wishlist, cart, err}));
    } else if (req.originalUrl.includes('admin')){
        res.status(500).send(adminErrorPage({err}));
    } else if (req.originalUrl.includes('pos')){
        res.status(500).send(posErrorPage({err}));
    }  else {
        res.status(500).send(err.message);
    }

}