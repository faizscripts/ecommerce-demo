const {getMonthYear} = require('../../middlewares/otherFunctions')
const {Customer} = require('../../models/customers')
const {Product} = require('../../models/admin/products')
const {Order} = require('../../models/admin/orders')
const dashboardTemplate = require('../../views/admin/dashboard');
const express = require('express');
const router = express.Router();

function returnTotal(query, totalFor) {
    let sum = 0;
    query.forEach(
        queryItem => {
            sum += queryItem[totalFor]
        }
    )
    return sum
}

function getMonthlyStats(orders) {
    let today = new Date();
    let income =0;
    let totalOrders = 0;

    orders.forEach(order => {

        if (getMonthYear(order.orderDate) === getMonthYear(today) && order.orderStatus.toLowerCase() === 'delivered'){
            console.log(order.eName)
            console.log(`${income} + ${order.total - order.shopTotal}`)
            income += (order.total - order.shopTotal)
            console.log(`equals ${income}`)
            totalOrders++
        }
    })

    return [income, totalOrders]
}

router.get('/', async(req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone')

    const allOrders = await Order.find({orderStatus : 'Delivered'}).sort('-orderDate')

    const products = await Product.find().select('income unitsSold')

    const [income,totalOrders]  = getMonthlyStats(orders)

    const unitsSold = returnTotal(products, 'unitsSold')

    const totalProducts = await Product.find({status: true, populateStatus: true}).countDocuments()

    const customers = await Customer.find().sort('-dateCreated')

    const totalCustomers = await Customer.find().countDocuments()

    const best = await Product.find({populateStatus: true}).sort('-income').limit(10)

    const worst = await Product.find({populateStatus: true}).sort('income').limit(10)

    res.send(dashboardTemplate({orders, income, unitsSold, totalProducts, totalCustomers ,best, worst, allOrders, totalOrders, customers}));
})


module.exports = router;