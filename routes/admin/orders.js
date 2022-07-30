const axios = require("axios");
const crypto = require("crypto");
const mongoose = require('mongoose');
const {emailOrderStatus, emailLowQuantity} = require('../../middlewares/otherFunctions')
const viewOrdersTemplate = require('../../views/admin/orders/index');
const newOrderTemplate = require('../../views/admin/orders/new');
const editOrderTemplate = require('../../views/admin/orders/edit');
const {Customer} = require('../../models/customers');
const {Order} = require('../../models/admin/orders');
const {Product} = require('../../models/admin/products');
const {Category} = require('../../models/admin/categories');
const {Brand} = require('../../models/admin/brands');
const {Special} = require('../../models/admin/special');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone');

    res.send(viewOrdersTemplate({orders}));
});

router.get('/new', async (req, res) => {
    const products = await Product.find();
    res.send(newOrderTemplate({products}));
});

router.get('/edit/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('customerID', 'email phone full_name');

    res.send(editOrderTemplate({order}))
})

router.post('/edit/:id', async (req, res) => {

    let order = await Order.findById(req.params.id)

    if (order.eEmail){
        order.eEmail = req.body.email;
        order.ePhone = req.body.phone;
        order.eName = req.body.name;
        order.orderNotes = req.body.orderNotes;
        order.delivery_fee = req.body.delivery_fee;
        order.shopTotal = req.body.shopTotal;

        await order.save()
    }

    if (!order.processed) {
        let products = []
        let sendEmail = false

        switch ((typeof req.body.productID).toString()) {
            case 'string':
                products.push({
                    productID: mongoose.Types.ObjectId(req.body.productID),
                    product_name: req.body.product_name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                })
                break;

            case 'object':
                for (let i = 0; i < req.body.productID.length; i++) {
                    products.push({
                        productID: mongoose.Types.ObjectId(req.body.productID[i]),
                        product_name: req.body.product_name[i],
                        price: req.body.price[i],
                        quantity: req.body.quantity[i],
                    })
                }
                break;
        }

        if (order.orderStatus !== req.body.orderStatus){
            sendEmail = true
        }

        order = await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: req.body.orderStatus,
            products: products,
            total: req.body.orderOutput,
            new: false
        }, {new: true}).populate('customerID', 'email phone full_name');

        if (sendEmail){
            if (order.eEmail){
                await emailOrderStatus(order, order.eEmail, order.eName).catch(console.error);
            } else{
                await emailOrderStatus(order, order.customerID.email, order.customerID.full_name).catch(console.error);
            }
        }

    }


    if (order.orderStatus.toLowerCase() === 'delivered') {

        for (let i = 0; i < order.products.length; i++) {
            let product = await Product.findById(order.products[i].productID.toString())
            let income

            if (order.shopTotal){
                income = order.total - order.shopTotal
            } else {
                income = (product.price - product.shop_price) * order.products[i].quantity;
            }

            await Category.findByIdAndUpdate(product.categoryID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            await Special.findByIdAndUpdate(product.specialID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            await Brand.findByIdAndUpdate(product.brandID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            if (product.subBrandID) {
                let brand = await Brand.updateOne({_id: product.brandID, 'subBrands._id': product.subBrandID},
                    {
                        $inc: {
                            "subBrands.$.income": income, 'subBrands.$.unitsSold': order.products[i].quantity
                        }
                    }
                )
            }

            product = await Product.findByIdAndUpdate(order.products[i].productID, {
                $inc: {income: income, unitsSold: order.products[i].quantity, quantity: -order.products[i].quantity}
            }, {new: true})

            if (product.quantity<0){
                product.quantity = 0
                await product.save()
            }

            if (product.quantity<= 1){
                await emailLowQuantity(product).catch(console.error);
            }
        }
        order.processed = true
        await order.save()

        //Start of purchase pixel code, uncomment the code below to activate the tracking

        /*
        const pixelUrl = `https://graph.facebook.com/v12.0/${process.env.PIXEL_ID}/${process.env.PIXEL_ACCESS_TOKEN}`

        const time = Math.floor(Date.now() / 1000)
        const hashedEmail = crypto.createHmac('sha256', order.eEmail).digest('hex');
        const hashedPhone = crypto.createHmac('sha256', `254${order.ePhone}`).digest('hex');
        const hashedCountry = crypto.createHmac('sha256', "ke").digest('hex');
        const eventUrl = req.headers.referer
        const pixelTotal = order.total

        const pixelData = {
            "data": [
                {
                    "event_name": "Purchase",
                    "event_time": time,
                    "action_source": "website",
                    "event_source_url": eventUrl,
                    "user_data": {
                        "em": [
                            hashedEmail
                        ],
                        "ph": [
                            hashedPhone
                        ],
                        "country": [
                            hashedCountry
                        ],
                        "client_user_agent": req.headers['user-agent'],
                    },
                    "custom_data": {
                        "currency": "KES",
                        "value": pixelTotal,
                        "order_id": order._id
                    }
                }
            ]
        }

        axios.post(pixelUrl, pixelData).catch(reason => console.log(reason))
         */

        //End of purchase pixel code
    }

    if (order.orderStatus.toLowerCase() === 'cancelled') {
        order.processed = true
        await order.save()
    }

    res.redirect('/admin/orders/')
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send(`Sorry, that order doesn't exist`);

    res.redirect(req.headers.referer.split(req.headers.host).pop());
})

module.exports = router;