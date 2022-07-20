const mongoose = require('mongoose');
const viewSpecialsTemplate = require('../../views/admin/special/index');
const addSpecialTemplate = require('../../views/admin/special/new');
const editSpecialTemplate = require('../../views/admin/special/edit');
const {Special, validate} = require('../../models/admin/special');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const specials = await Special.find().collation({locale: "en" }).sort('special_name');
    res.send(viewSpecialsTemplate({specials}));
});

router.get('/new', (req, res) => {
    res.send(addSpecialTemplate({}));
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addSpecialTemplate({input: req.body, error: error.details[0]}))

    const special = new Special({
        special_name: req.body.special_name
    })
    await special.save();

    res.redirect('/admin/special');
});

router.post('/copy', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addSpecialTemplate({input: req.body, error: error.details[0]}))

    const special = new Special({
        special_name: req.body.special_name
    })

    await special.save();

    res.send(addSpecialTemplate({input: req.body}))
})

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const special = await Special.findById(req.params.id);
    if (!special) return res.status(400).send(`Sorry, that special category doesn't exist`);

    res.send(editSpecialTemplate({special}));
});

router.post('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let special = await Special.findById(req.params.id);
    if (!special) return res.status(400).send(`Sorry, that category doesn't exist`);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editSpecialTemplate({special, error: error.details[0]}));

    special = await Special.findByIdAndUpdate(req.params.id, {
        special_name: req.body.special_name
    }, {new: true});
    if (!special) return res.status(400).send(`Sorry, that special category doesn't exist`);

    res.redirect('/admin/special');
});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const special = await Special.findByIdAndDelete(req.params.id);
    if (!special) return res.status(400).send(`Sorry, that special category doesn't exist`);

    res.redirect('/admin/special');
})

module.exports = router;