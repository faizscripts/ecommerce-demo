const _ = require('lodash');
const {Product} = require('../../models/admin/products');
const viewInventoryTemplate = require('../../views/pos/inventory/index');
const newInventoryTemplate = require('../../views/pos/inventory/new');
const editInventoryTemplate = require('../../views/pos/inventory/edit');
const historyTemplate = require('../../views/pos/inventory/view');
const express = require('express');
const mongoose = require("mongoose");
const {Credit} = require("../../models/pos/credit");
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().collation({locale: "en" }).sort('product_name');

    res.send(viewInventoryTemplate({products}));
});

router.get('/new',  (req, res) => {
    res.send(newInventoryTemplate());
});

router.post('/new', async (req, res) => {

    let product = new Product(
        _.pick(req.body,
            ['product_name', 'shop_price'])
    );


    let history = []

    if (typeof req.body.date === "string"){
        history.push({
            historyDate: req.body.date,
            quantity: req.body.quantity,
            store_quantity : req.body.store_quantity })
        Object.assign(product, { quantity:req.body.quantity, store_quantity:req.body.store_quantity})
    } else if (typeof req.body.date === "object"){
        Object.assign(product, { quantity:req.body.quantity[0], store_quantity:req.body.store_quantity[0]})
        for (let i=0; i<req.body.date.length; i++){
            history.push({
                historyDate: req.body.date[i],
                quantity: req.body.quantity[i],
                store_quantity : req.body.store_quantity[i] })
        }
    }

    Object.assign(product, { quantityHistory: history, populateStatus: false})

    await product.save()

    res.redirect('/pos/inventory');
});

router.get('/view/:id',  async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.send(historyTemplate({product}));
});

router.get('/edit/:id',  async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.send(editInventoryTemplate({product}));
});

router.post('/edit/:id', async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    let history = []
    let existingHistory = []

    if (typeof req.body.date === "string"){
        history.push({
            historyDate: req.body.date,
            quantity: req.body.quantity,
            store_quantity : req.body.store_quantity })
    } else if (typeof req.body.date === "object"){
        for (let i=0; i<req.body.date.length; i++){
            history.push({
                historyDate: req.body.date[i],
                quantity: req.body.quantity[i],
                store_quantity : req.body.store_quantity[i] })
        }
    }

    if (typeof req.body.existingDate === "string"){
        existingHistory.push({
            historyDate: req.body.existingDate,
            quantity: req.body.existingQuantity,
            store_quantity : req.body.existing_store_quantity })
    } else if (typeof req.body.existingDate === "object"){
        for (let i=0; i<req.body.existingDate.length; i++){
            existingHistory.push({
                historyDate: req.body.existingDate[i],
                quantity: req.body.existingQuantity[i],
                store_quantity : req.body.existing_store_quantity[i] })
        }
    }

    let joinedArray = history.concat(existingHistory);

    if (joinedArray.length>0){
        Object.assign(product, { product_name: req.body.product_name, shop_price: req.body.shop_price, quantityHistory:joinedArray, quantity:joinedArray[0].quantity, store_quantity:joinedArray[0].store_quantity})
    } else {
        Object.assign(product, { product_name: req.body.product_name, shop_price: req.body.shop_price, quantityHistory:joinedArray, quantity:0, store_quantity:0})
    }

    await product.save()

    res.redirect('/pos/inventory');
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.redirect('/pos/inventory');
})

module.exports = router;