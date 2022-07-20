const sharp = require('sharp');
const {productImagesUpload} = require('../../middlewares/multer');
const {Category} = require('../../models/admin/categories');
const {Brand} = require('../../models/admin/brands');
const {Special} = require('../../models/admin/special');
const _ = require('lodash');
const mongoose = require('mongoose');
const {Product, validate} = require('../../models/admin/products');
const addProductTemplate = require('../../views/admin/products/new');
const viewProductsTemplate = require('../../views/admin/products/index');
const editProductTemplate = require('../../views/admin/products/edit')
const unpopulatedTemplate = require('../../views/admin/products/unpopulated')
const express = require('express');
const router = express.Router();

async function post(req, res) {

    const {error} = validate(req.body);
    if (error) {
        req.session.input = req.body
        req.session.error = error.details[0]
        return res.status(400).redirect(`/admin/products/error`)
    }

    const product_images = []
    const reqFiles = []
    const fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
        reqFiles.push(req.files[key]);
    });
    reqFiles.forEach(image => {
        product_images.push(image[0])
    })

    product_images.forEach(image => {
        sharp(image.path)
            .toFile(`${image.path}.webp`)
            .then()
            .catch(err => {
                console.log(err);
            });
        image.filename = `${image.filename}.webp`
    })

    function checkSubBrand(id) {
        if (id.includes('-')) {
            const splitted = id.split('-');
            req.body.brandID = splitted[0]
            req.body.subBrandID = splitted[1]
        }
    }

    checkSubBrand(req.body.brandID);

    const product = new Product(
        _.pick(req.body,
            ['product_name', 'categoryID', 'brandID', 'subBrandID', 'specialID', 'description', 'inBox', 'quantity', 'shop_price', 'price', 'status'])
    );

    product.product_images = product_images;

    if (req.body.optionItems !== undefined){
        product.optionItems = req.body.optionItems
    }

    await product.save();

}

async function editPost(req, res) {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`Sorry, that product doesn't exist`);

    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    const {error} = validate(req.body);
    if (error) return res.send(editProductTemplate({
        product,
        error: error.details[0],
        categories,
        brands,
        specials
    }))

    const product_images = []
    const reqFiles = []
    const fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
        reqFiles.push(req.files[key]);
    });
    reqFiles.forEach(image => {
        product_images.push(image[0])
    })

    product_images.forEach(image => {
        sharp(image.path)
            .toFile(`${image.path}.webp`)
            .then()
            .catch(err => {
                console.log(err);
            });
        image.filename = `${image.filename}.webp`
    })

    let existingImages = []
    if (typeof req.body.existingImages === 'string') {
        existingImages.push({filename: req.body.existingImages})
    } else if (typeof req.body.existingImages === 'object') {
        req.body.existingImages.forEach(image => {
            existingImages.push({filename: image})
        })
    }

    let i = 0;
    existingImages.forEach(existingImage => {
        product_images.forEach(newImage => {
            if (existingImage.filename.includes(newImage.fieldname)){
                existingImages.splice([i], 1)
            }
            i++;
        })
    })


    const editedImagesArray = existingImages.concat(product_images);

    editedImagesArray.sort((a,b) => a.filename.localeCompare(b.filename))


    function checkSubBrand(id) {
        if (id.includes('-')) {
            const splitted = id.split('-');
            req.body.brandID = splitted[0]
            req.body.subBrandID = splitted[1]
        }
    }

    checkSubBrand(req.body.brandID);

    if (!req.body.status) req.body.status = false;

    product = await Product.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ['product_name', 'categoryID', 'brandID', 'subBrandID', 'specialID', 'description', 'inBox', 'quantity', 'shop_price', 'price', 'status']),
        {new: true});
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    if (editedImagesArray.length > 0) product.product_images = editedImagesArray;

    if (!product.populateStatus) product.populateStatus = true

    let updatedOptions

    if (req.body.existingOptions && req.body.optionItems){
        updatedOptions = req.body.existingOptions.concat(req.body.optionItems)
    } else if (req.body.existingOptions && !req.body.optionItems){
        updatedOptions = req.body.existingOptions
    } else if (!req.body.existingOptions && req.body.optionItems){
        updatedOptions = req.body.optionItems
    } else {
        updatedOptions = undefined
    }

    product.optionItems = updatedOptions

    await product.save();
}


router.get('/', async (req, res) => {
    const products = await Product.find({populateStatus: true}).collation({locale: "en" }).sort('product_name');

    res.send(viewProductsTemplate({title: 'All Products', products}));
});

router.get('/unpopulated', async (req, res) => {
    const products = await Product.find({populateStatus: false}).collation({locale: "en" }).sort('product_name');

    res.send(unpopulatedTemplate({products}));
});

router.get('/new', async (req, res) => {
    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    req.session.errorUrl = req.originalUrl

    res.send(addProductTemplate({categories, brands, specials}));
});

router.post('/', productImagesUpload, async (req, res) => {
    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    await post(req, res);

    res.redirect('/admin/products');
});

router.post('/copy', productImagesUpload, async (req, res) => {
    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    await post(req, res);

    res.send(addProductTemplate({
        input: req.body,
        categories,
        brands,
        specials
    }))
});

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`Sorry, that product doesn't exist`);

    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name brandCategoryID subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    req.session.errorUrl = req.originalUrl
    req.session.errorProductEditID = product._id

    req.session.editProductPreviousUrl = req.headers.referer.split(req.headers.host).pop()

    res.send(editProductTemplate({product, categories, brands, specials}));
});

router.post('/edit/:id', productImagesUpload, async (req, res) => {

    await editPost(req,res)

    res.redirect(req.session.editProductPreviousUrl);
    req.session.editProductPreviousUrl = null
});

router.post('/edit/copy/:id', productImagesUpload, async (req, res) => {
    await editPost(req,res)

    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');

    res.send(addProductTemplate({
        input: req.body,
        categories,
        brands,
        specials
    }))
});

router.get('/error', async (req, res) => {
    const categories = await Category.find().select('_id category_name').collation({locale: "en" }).sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').collation({locale: "en" }).sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').collation({locale: "en" }).sort('special_name');
    
    if (req.session.errorUrl.toString() === '/admin/products/edit'){
        const product = await Product.findById(req.session.errorProductEditID)
        req.session.errorUrl = null
        req.session.errorProductEditID = null

        res.send(editProductTemplate({ product, categories, brands, specials}));
    } else if (req.session.errorUrl.toString() === '/admin/products/new'){
        req.session.errorUrl = null

        res.send(addProductTemplate({categories, brands, specials, input: req.session.input, error: req.session.error}));
    } else {
        throw new Error('Fatal error')
    }

})

router.get('/cancel', async(req, res) => {
    res.redirect(req.session.editProductPreviousUrl)
    req.session.editProductPreviousUrl = null
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.redirect('/admin/products');
})

router.get('/categories/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({categoryID: req.params.id, populateStatus: true}).collation({locale: "en" }).sort('product_name');

    const category = await Category.findById(req.params.id).select('category_name')

    res.send(viewProductsTemplate({title: category.category_name, products}));
})

router.get('/brands/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({brandID: req.params.id, populateStatus: true}).collation({locale: "en" }).sort('product_name');

    const brand = await Brand.findById(req.params.id).select('brand_name')

    res.send(viewProductsTemplate({title: brand.brand_name, products}));
})

router.get('/special/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({specialID: req.params.id, populateStatus: true}).collation({locale: "en" }).sort('product_name');

    const special = await Special.findById(req.params.id).select('special_name')

    res.send(viewProductsTemplate({title: special.special_name, products}));
})

module.exports = router;