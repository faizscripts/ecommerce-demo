const {Customer} = require('../../models/customers');
const {Admin, validate} = require('../../models/admin/admins');
const viewAdminsTemplate = require('../../views/admin/admins/index');
const addAdminTemplate = require('../../views/admin/admins/new');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const admins = await Admin.find().collation({locale: "en" }).sort('admin_name');
    res.send(viewAdminsTemplate({admins}));
});

router.get('/new', (req, res) => {
    res.send(addAdminTemplate({}))
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addAdminTemplate({input: req.body, error: error.details[0]}))

    let admin = await Admin.findOne({email: req.body.email});
    if (admin) return res.status(400).send(addAdminTemplate({ exists: true}))

    let customer = await Customer.findOne({email: req.body.email});
    if (customer) throw new Error('This email has already been registered in the customer database')

    admin = new Admin(
        _.pick(req.body, ['admin_name', 'email', 'phone', 'password'])
    );

    const salt = await bcrypt.genSalt(10);

    admin.password = await bcrypt.hash(admin.password, salt);

    customer = new Customer(
        _.pick(req.body, [ 'email', 'phone', 'password'])
    );

    customer.full_name = admin.admin_name

    customer.latitude = process.env.SHOP_LATITUDE

    customer.longitude = process.env.SHOP_LONGITUDE

    customer.delivery_fee = 0

    customer.distance = 0

    customer.password = admin.password

    await customer.save();

    await admin.save();

    res.redirect('/admin/admins');
});

module.exports = router;
