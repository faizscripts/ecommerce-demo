const {Product} = require('../../models/admin/products');
const viewDetailedTemplate = require('../../views/pos/detailed/detailed');
const newDetailedTemplate = require('../../views/pos/detailed/new');
const editDetailedTemplate = require('../../views/pos/detailed/edit');
const express = require('express');
const _ = require("lodash");
const mongoose = require("mongoose");
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().collation({locale: "en" }).sort('product_name');

    res.send(viewDetailedTemplate({products}));
});

router.post('/',  async (req, res) => {
    if (req.body.selling > 0){
        await Product.findByIdAndUpdate(req.body.id,
            _.pick(req.body, ['product_name', 'bp', 'rate', 'shipping', 'buying', 'profitP', 'selling', 'shop_price', 'price']),
            {new: true});
    } else{
        await Product.findByIdAndUpdate(req.body.id,
            _.pick(req.body, ['shop_price', 'price']),
            {new: true});
    }
    res.redirect('/admin/detailed')
});

router.get('/new', async (req, res) => {
    res.send(newDetailedTemplate())
})

router.post('/new', async(req, res) => {
    const product = new Product(
        _.pick(req.body,
            ['product_name', 'bp', 'rate', 'shipping', 'buying', 'profitP', 'selling', 'shop_price', 'price'])
    );

    product.populateStatus = false;

    await product.save();

    res.redirect('/admin/detailed')
})

router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.send(editDetailedTemplate({product}))
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.redirect('/admin/detailed');
})

module.exports = router;