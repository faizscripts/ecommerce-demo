const {Customer} = require('../../models/customers')
const {Category} = require('../../models/admin/categories')
const {Order} = require('../../models/admin/orders')
const {Brand} = require('../../models/admin/brands')
const reportsTemplate = require('../../views/admin/reports');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find({orderStatus : 'Delivered'}).sort('-orderDate')

    const customers = await Customer.find()

    const categories = await Category.find().sort('-income')

    const brands = await Brand.find().limit(9).sort('-income')

    res.send(reportsTemplate({orders, customers, categories, brands}));
});

module.exports = router;