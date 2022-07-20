const {Category} = require('../../models/admin/categories');
const mongoose = require('mongoose');
const viewBrandsTemplate = require('../../views/admin/brands/index');
const addBrandTemplate = require('../../views/admin/brands/new');
const editBrandTemplate = require('../../views/admin/brands/edit');
const {Brand, validate} = require('../../models/admin/brands');
const express = require('express');
const router = express.Router();

async function post(req, res) {


    const {error} = validate(req.body);
    if (error) return res.status(400).send(addBrandTemplate({input: req.body, error: error.details[0]}));

    let brand;

    switch (req.body.subBrand) {
        case('false'):
            brand = new Brand({
                brand_name: req.body.brand_name,
                brandCategoryID: req.body.brandCategoryID
            })
            break;

        case('true'):
            if (typeof req.body.subBrandItems === "string") {
                brand = new Brand({
                    brand_name: req.body.brand_name,
                    subBrands: [{
                        subBrandName: req.body.subBrandItems,
                        subBrandCategoryID: req.body.subBrandCategoryID
                    }]
                })

            } else if (typeof req.body.subBrandItems === "object") {

                const subBrandArray = []

                for (let i=0; i<req.body.subBrandItems.length; i++){
                    subBrandArray.push({
                        subBrandName: req.body.subBrandItems[i],
                        subBrandCategoryID: req.body.subBrandCategoryID[i]
                    })
                }

                brand = new Brand({
                    brand_name: req.body.brand_name,
                    subBrands: subBrandArray
                })
            }
            break;
    }


    await brand.save();
}

router.get('/', async (req, res) => {
    const brands = await Brand.find().collation({locale: "en" }).sort('brand_name');
    const categories = await Category.find().select('_id, category_name').collation({locale: "en" }).sort('category_name');

    res.send(viewBrandsTemplate({brands, categories}));
});

router.get('/new', async (req, res) => {
    const categories = await Category.find().select('_id, category_name').collation({locale: "en" }).sort('category_name');
    res.send(addBrandTemplate({categories}));
});

router.post('/', async (req, res) => {
    await post(req, res);

    res.redirect('/admin/brands');
});

router.post('/copy', async (req, res) => {
    await post(req, res);

    const categories = await Category.find().select('_id, category_name').collation({locale: "en" }).sort('category_name');

    res.send(addBrandTemplate({input: req.body, categories}))
});

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    const categories = await Category.find().select('_id, category_name').collation({locale: "en" }).sort('category_name');

    res.send(editBrandTemplate({brand, categories}));
});

router.post('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editBrandTemplate({brand, error: error.details[0]}));

    let existingItemsArray, userItemsArray, difference;

    switch (req.body.subBrand) {
        case('false'):
            brand = await Brand.findByIdAndUpdate(req.params.id, {
                brand_name: req.body.brand_name,
                brandCategoryID: req.body.brandCategoryID
            }, {new: true})

            //deleting existing sub brands
                existingItemsArray = brand.subBrands.map(subBrand => {
                    return subBrand._id.toString()
                })

                userItemsArray = []

                for (let prop in req.body) {
                    if (mongoose.isValidObjectId(prop)) {
                        userItemsArray.push(prop)
                    }
                }

                difference = existingItemsArray.filter(x => !userItemsArray.includes(x));

                difference.forEach(toDelete => {
                    brand.subBrands = brand.subBrands.filter(subBrand => subBrand._id.toString() !== toDelete);
                })

                await brand.save()

            break;

        case('true'):

            //deleting existing sub brands
             existingItemsArray = brand.subBrands.map(subBrand => {
                return {
                    subBrandID: subBrand._id,
                    subBrandCategoryID: subBrand.subBrandCategoryID
                }
            })

            userItemsArray = []

            let i=0;
             let item
            for (let prop in req.body) {
                if (mongoose.isValidObjectId(prop)) {
                    if (typeof req.body.existingSubBrandCategoryID === 'string'){
                        item = {
                            subBrandID: prop,
                            subBrandCategoryID: req.body.existingSubBrandCategoryID
                        }
                    } else if (typeof req.body.existingSubBrandCategoryID === 'object'){
                        item = {
                            subBrandID: prop,
                            subBrandCategoryID: req.body.existingSubBrandCategoryID[i]
                        }
                    }
                    i++;
                    userItemsArray.push(item)
                }
            }


            difference = existingItemsArray.filter(({ subBrandID: id1 }) => !userItemsArray.some(({ subBrandID: id2 }) => id2 === id1.toString()));


            difference.forEach(toDelete => {
                 brand.subBrands = brand.subBrands.filter(subBrand => subBrand._id.toString() !== toDelete.subBrandID.toString());
            })


            await brand.save()

            //editing existing
            for (let prop in req.body) {
                if (mongoose.isValidObjectId(prop)) {
                    let subBrand = brand.subBrands.id(prop);
                    if (subBrand.subBrandName !== req.body[prop]) {
                        subBrand.subBrandName = req.body[prop];
                    }

                    let editedUserItem =userItemsArray.filter(userItem => userItem.subBrandID === prop.toString())
                    if (subBrand.subBrandCategoryID.toString() !== editedUserItem[0].subBrandCategoryID.toString()) {
                        subBrand.subBrandCategoryID = editedUserItem[0].subBrandCategoryID
                    }
                }
            }

            await brand.save()

            //adding new sub brands
            if (typeof req.body.subBrandItems === "string") {
                if (req.body.subBrandItems.length > 0) {
                    brand = await Brand.findByIdAndUpdate(req.params.id, {
                        brand_name: req.body.brand_name,
                        $push: {
                            subBrands: {
                                subBrandName: req.body.subBrandItems,
                                subBrandCategoryID: req.body.subBrandCategoryID
                            }
                        }
                    })
                }
            }
            else if (typeof req.body.subBrandItems === "object") {

                let j=-1;
                const subBrandArray = req.body.subBrandItems.map(item => {
                    j++
                    return {
                        subBrandName: item,
                        subBrandCategoryID: req.body.subBrandCategoryID[j]
                    }
                })

                let subBrands = brand.subBrands;
                brand = await Brand.findByIdAndUpdate(req.params.id, {
                    brand_name: req.body.brand_name,
                    subBrands: subBrands.concat(subBrandArray)
                })
            } else {
                brand = await Brand.findByIdAndUpdate(req.params.id, {
                    brand_name: req.body.brand_name,
                }, {new: true})

            }

    }

    await brand.save()

    res.redirect('/admin/brands');

});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    res.redirect('/admin/brands');
})

module.exports = router;