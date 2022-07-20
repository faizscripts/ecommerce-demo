const sharp = require('sharp');
const {categoryImagesUpload} = require('../../middlewares/multer');
const mongoose = require('mongoose');
const viewCategoriesTemplate = require('../../views/admin/categories/index');
const addCategoryTemplate = require('../../views/admin/categories/new');
const editCategoryTemplate = require('../../views/admin/categories/edit');
const {Category, validate} = require('../../models/admin/categories');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find().collation({locale: "en"}).sort('category_name');
    res.send(viewCategoriesTemplate({categories}));
});

router.get('/new', (req, res) => {
    res.send(addCategoryTemplate({}));
});

router.post('/', categoryImagesUpload, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addCategoryTemplate({input: req.body, error: error.details[0]}))

    let category

    if (req.file) {
        sharp(req.file.path)
            .toFile(`${req.file.path}.webp`)
            .then()
            .catch(err => {
                console.log(err);
            });

        req.file.filename = `${req.file.filename}.webp`

        category = new Category({
            category_name: req.body.category_name,
            image: req.file.filename
        })

    } else {
        category = new Category({
            category_name: req.body.category_name
        })
    }

    await category.save();

    res.redirect('/admin/categories');
});

router.post('/copy', categoryImagesUpload, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addCategoryTemplate({input: req.body, error: error.details[0]}))

    let category

    if (req.file) {
        sharp(req.file.path)
            .toFile(`${req.file.path}.webp`)
            .then()
            .catch(err => {
                console.log(err);
            });

        req.file.filename = `${req.file.filename}.webp`

        category = new Category({
            category_name: req.body.category_name,
            image: req.file.filename
        })

    } else {
        category = new Category({
            category_name: req.body.category_name
        })
    }

    await category.save();

    res.send(addCategoryTemplate({input: req.body}))
})

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(400).send(`Sorry, that category doesn't exist`);

    res.send(editCategoryTemplate({category}));
});

router.post('/edit/:id', categoryImagesUpload, async (req, res) => {

    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let category = await Category.findById(req.params.id);
    if (!category) return res.status(400).send(`Sorry, that category doesn't exist`);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editCategoryTemplate({category, error: error.details[0]}));

    if (req.file) {
        sharp(req.file.path)
            .toFile(`${req.file.path}.webp`)
            .then()
            .catch(err => {
                console.log(err);
            });

        req.file.filename = `${req.file.filename}.webp`

        category = await Category.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name,
            image: req.file.filename
        }, {new: true});

        if (!category) return res.status(400).send(`Sorry, that category doesn't exist`);
    } else {
        category = await Category.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name,
        }, {new: true});

        if (!category) return res.status(400).send(`Sorry, that category doesn't exist`);
    }

    res.redirect('/admin/categories');
});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(400).send(`Sorry, that category doesn't exist`);

    res.redirect('/admin/categories');
})

module.exports = router;