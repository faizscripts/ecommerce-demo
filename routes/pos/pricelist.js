const {Product} = require('../../models/admin/products');
const viewPricelistTemplate = require('../../views/pos/pricelist/index');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().collation({locale: "en" }).sort('product_name');

    res.send(viewPricelistTemplate({products}));
});

module.exports = router;