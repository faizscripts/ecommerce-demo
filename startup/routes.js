const express = require('express');
const cookieSession = require('cookie-session');
const error = require('../middlewares/error');
const adminLoginMiddleware = require('../middlewares/adminLoginMiddleware');
const posLogin = require('../routes/pos/login');
const admins = require('../routes/admin/admins');
const adminDashboard = require('../routes/admin/dashboard');
const adminProducts = require('../routes/admin/products');
const adminCategories = require('../routes/admin/categories');
const adminBrands = require('../routes/admin/brands');
const adminSpecial= require('../routes/admin/special');
const adminOrders= require('../routes/admin/orders');
const adminCustomers= require('../routes/admin/customers');
const adminReports= require('../routes/admin/reports');
const homepage = require('../routes/index');
const register = require('../routes/register');
const login = require('../routes/login');
const wishlist = require('../routes/wishlist');
const cart = require('../routes/cart');
const checkout = require('../routes/checkout');
const orders = require('../routes/orders');
const search = require('../routes/search');
const faqs = require('../routes/faqs');
const quick = require('../routes/quick');
const detailedPricelist= require('../routes/pos/detailed');
const posPricelist= require('../routes/pos/pricelist');
const credit= require('../routes/pos/credit');
const inventory = require('../routes/pos/inventory');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieSession({
        name: 'session',
        keys:['cookieSessionKey']
    }));
    app.use('/register', register);
    app.use('/login', login);
    app.use('/wishlist', wishlist);
    app.use('/cart', cart);
    app.use('/checkout', checkout);
    app.use('/orders', orders);
    app.use('/search', search);
    app.use('/faqs', faqs);
    app.use('/quick', quick);
    app.use('/', homepage);
    app.use('/pos/login', posLogin);
    // uncomment the line below to restrict access to the admin panel to admins only
    // app.use(adminLoginMiddleware)
    app.use('/pos/detailed', detailedPricelist);
    app.use('/pos/pricelist', posPricelist);
    app.use('/pos/credit', credit);
    app.use('/pos/inventory', inventory);
    app.use('/admin/admins', admins);
    app.use('/admin/dashboard', adminDashboard);
    app.use('/admin/products', adminProducts);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/brands', adminBrands);
    app.use('/admin/special', adminSpecial);
    app.use('/admin/orders', adminOrders);
    app.use('/admin/customers', adminCustomers);
    app.use('/admin/reports', adminReports);


    app.use(error);
}