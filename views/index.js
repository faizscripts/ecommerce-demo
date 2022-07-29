const {printProductModal, printMainImage, printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Home';

module.exports = ({req, categories, featured_products, new_arrivals, sale, wishlist, cart}) => {

    function renderCategories(categories) {
        if (categories){
            return categories.map(
                category => {
                    return `
                <div class="col-6 col-md-4 col-lg-2 my-3 mb-lg-0 ">
                    <div class="card" onclick="location.href='/${category._id}'">
                        <img src="/img/products/${category.image}" class="card-img-top image-tile" alt="...">
                        <div class="card-footer text-center">
                            ${category.category_name}
                        </div>
                    </div>
                </div>
                    `
                }
            ).join("")
        } else return ""
    }

    function renderSpecialRow(specialCategory) {
        if (specialCategory){
            return `
            <section class="container featured">
                <h4 class="section-title">
                    ${specialCategory.special_name}
                </h4>
                <div class="row special-row">
                    ${renderSpecial(featured_products, wishlist, cart)}
                </div>
            </section>
            `
        }
    }

    function renderSpecial(products, wishlist, cart) {
        return products.map(
            product => {

                return `
<div class="col-6 col-md-4 col-lg-2">
    <div class="card">
        <img loading="lazy" src="/img/products/${printMainImage(product)}" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#_${product._id}">
        <div class="card-body">
            <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#_${product._id}">${product.product_name}</h6>
            <p class="card-text mb-0 featured-card-price">ksh. ${product.price}</p>
            <div class="action">
                ${wishlistButton(product._id, wishlist)}      
                ${cartButton(product._id, cart)}      
            </div>
        </div>
    </div>
</div>

<!--Product view Modal-->
${printProductModal(product, wishlist, cart)}

            `}).join('');
    }

    return layout({
        title: title,
        req: req,
        categories,
        content: `
<div class="index">
<!--Tiles-->
<section id="tiles">
    <div class="container-fluid">
        <div class="row mt-2 mt-lg-0  my-lg-4 d-flex justify-content-center">
        ${renderCategories(categories)}
        </div>
    </div>
</section>

<!--Why -->
<section id="why" class="container-fluid text-center p-3">
    <h4 class="why-title">
        Why Amazon Cellular?
    </h4>
    <div class="row ">
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Secure Payments </h5>
                <i class="fas fa-user-shield"></i>
            </div>
            <p>Payments are only done upon delivery. Receive what you had actually ordered.
                <span>*Applies for orders within a radius of 7km from Nairobi CBD</span></p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Quick Deliveries </h5>
                <i class="fas fa-shipping-fast"></i>
            </div>
            <p>Get your delivery within 24 hours after placing your order. <span>*Applies for orders within Nairobi metropolitan</span></p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Genuine Products </h5>
                <i class="fas fa-check-circle"></i>
            </div>
            <p>Be assured of quality products with a wide variety to choose from.</p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Best Prices </h5>
                <i class="fas fa-money-bill-alt"></i>
            </div>
            <p>A true value for your money as we provide quality products at the most affordable rates.</p>
        </div>
    </div>
</section>

<!--Featured Products-->
<section class="container featured">
    <h4 class="section-title">
        Featured Products
    </h4>
    <div class="row special-row">
        ${renderSpecial(featured_products, wishlist, cart)}
    </div>
</section>

<!--New Arrivals-->
<section class="container featured">
    <h4 class="section-title">
        New Arrivals
    </h4>
    <div class="row special-row">
        ${renderSpecial(new_arrivals, wishlist, cart)}
    </div>
</section>

<!--Sale-->
<section class="container featured pb-5">
    <h4 class="section-title">
        Sale
    </h4>
<!--    <button type="button" class="btn btn-sm see-all" onclick="location.href='/special/60891d6820824d1308bc6946'">SEE ALL</button>-->
    <div class="row special-row">
        ${renderSpecial(sale,wishlist, cart)}
    </div>
</section>
</div> 

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)}      
`})
}