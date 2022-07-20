const {printProductModal, printMainImage, printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');

module.exports = ({req, product, wishlist, cart}) => {
    function renderProduct(products, wishlist, cart) {
        if (product) {
            return `
            <div class="col-6 col-md-3 col-lg-2">
                    <div class="card">
                        <img src="/img/products/${printMainImage(product)}" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#_${product._id}">
                        <div class="card-body">
                            <h6 class="card-title" data-bs-toggle="modal"
             data-bs-target="#_${product._id}">${product.product_name}</h6>
                            <p class="card-text mb-0">ksh. ${product.price}</p>
                            <div class="action">
                                ${wishlistButton(product._id, wishlist)}      
                                ${cartButton(product._id, cart)}  
                            </div>
                        </div>
                    </div>
                </div>
                
            ${printProductModal(product, wishlist, cart)}
        `}
    }

    return layout({
        title: product.product_name,
        req: req,
        content: `
<!--Cases Main-->
<section class="category-main">
    <!--    Display-->
    <div class="container-fluid" id="category-display">
        <div class="card">
            <div class="card-header d-flex justify-content-between mt-1">
                <div class="queryDisplay">Click the product for more details</div>
            </div>
            <div class="card-body  mainContent row">
                ${renderProduct(product, wishlist, cart)}
            </div>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)} 
  
        `})
}