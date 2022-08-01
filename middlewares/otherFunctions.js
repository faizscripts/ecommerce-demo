const nodemailer = require("nodemailer");
const {google} = require('googleapis')
const config = require('config');

function displayDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}/${month + 1}/${year}`
}

function getMonthYear(date) {
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${month + 1}/${year}`
}

function displayMonth(date) {
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${month + 1}/${year}`
}

function getInput(input, key) {
    if (input) {
        if (input[key]) {
            return input[key];
        } else return ''
    } else return ''
}

function getError(error, key) {
    if (error) {
        if (error.path[0] === key) {
            return error.message;
        } else return ''
    } else return ''
}

function printProductModal(product, wishlist, cart) {

    return `
<div class="modal fade product-view" id="_${product._id}" tabindex="-1" aria-labelledby="Product view" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">${product.product_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                    <div class="row pvRow1"> 
                        <div class="col-xl-6 col-lg-7 ">
                            <img loading="lazy" src="/img/products/${printMainImage(product)}" alt="" id="prod-main-img">
                        </div>
                        <div class="col-xl-6 col-lg-5 d-flex flex-column justify-content-between">
                            <div class="row small-img-row">
                                ${printProductViewSmallImages(product)}
                            </div>
                            <form method="post" >
                                <div id="prod-price">
                                    <span>ksh.</span> <div class="d-inline pricePV">${product.price}</div>
                                </div>
                                <div class="d-flex justify-content-evenly">
                                    <div class="pvBtns">
                                        ${wishBtnPV(product._id, wishlist)}
                                    </div>
                                    <div class="pvBtns">
                                        ${cartBtnPV(product._id, cart)}
                                    </div>
                                </div>                              
                                <div class="pvBtns">
                                    <button type="submit" class="btn btn-outline-success prod-start checkoutPixel" formaction="/cart/checkout/${product._id}"> Checkout </button>
                                </div>
                            </form>
                            <div id="share" class="text-center">
                                <i class="bi bi-share-fill px-2"></i>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=https://amazon-cellular.com/search/ext/${product._id}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a href="whatsapp://send?text=https://amazon-cellular.com/search/ext/${product._id}"><i class="fab fa-whatsapp"></i></a>
                                <input type="hidden" value="https://amazon-cellular.com/search/ext/${product._id}">
                                <div class="d-inline"><button class="c2cLink btn btn-outline-secondary"> copy product link <i class="far fa-clipboard c2c" ></i></button></div>
                                
                            </div>
                        </div>
                        <div>
                            <div class="description mt-3"> Description</div>
                            <div class="iPV">${product.description}</div>
                            <div class="description">What's in the box</div>
                            <div class="iPV">${product.inBox}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

function printDetailedModal(product) {
    return `
<div class="modal fade product-view" id="_${product._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="Product view" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl pricelistModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">Edit Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                   <form method="POST" >
                        <div class="my-2 form-group">
                    <label for="product_name" class="form-label" required>Product Name</label>
                    <input name="product_name" type="text" class="form-control product_name" aria-describedby="product_name" value="${product.product_name}" required>
                </div>
                       <div class="row">
                            <div class="col-md-6 mb-2 form-group">
                                <label for="bp" class="form-label">BP</label>
                                <input name="bp" type="number" class="form-control bp" aria-describedby="bp" min="0" step="any"  step="any" value="${detailedPrice(product.bp)}">
                            </div>
                            <div class="col-md-6 mb-2 form-group">
                    <label for="rate" class="form-label">Rate</label>
                    <input name="rate" type="number" class="form-control rate" aria-describedby="rate" min="0" step="any" value="${detailedPrice(product.rate)}">
                </div>
                       </div>
                       <div class="row">
                            <div class="col-md-6 mb-2 form-group">
                    <label for="shipping" class="form-label">Shipping Fee</label>
                    <input name="shipping" type="number" class="form-control shipping" aria-describedby="shipping" min="0" step="any" value="${detailedPrice(product.shipping)}">
                </div>
                            <div class="col-md-6 mb-2 form-group">
                    <label for="buying" class="form-label" >Buying Price</label>
                    <input name="buying" type="number" class="form-control buying" aria-describedby="buying" step="any" value="${detailedPrice(product.buying)}" readonly>
                </div>
                        </div>
                       <div class="row">
                            <div class="col-md-6 mb-2 form-group">
                    <label for="profitP" class="form-label">Profit %</label>
                    <input name="profitP" type="number" class="form-control profitP" aria-describedby="profitP" min="0" step="any" value="${detailedPrice(product.profitP)}">
                </div>
                            <div class="col-md-6 mb-2 form-group">
                    <label for="selling" class="form-label">Selling Price</label>
                    <input name="selling" type="number" class="form-control selling" aria-describedby="selling" step="any" value="${detailedPrice(product.selling)}" readonly>
                </div>
                        </div>
                       <div class="row">
                             <div class="col-md-6 mb-2 form-group">
                    <label for="shop_price" class="form-label">Wholesale Price</label>
                    <input name="shop_price" type="number" class="form-control shop_price" aria-describedby="shop_price" step="any" value="${product.shop_price}">
                </div>
                             <div class="col-md-6 mb-2 form-group">
                    <label for="price" class="form-label">Site Price</label>
                    <input name="price" type="number" class="form-control price" aria-describedby="price" step="any" value="${product.price}">
                </div>
                        </div>
                       <input type="hidden" name="id" value="${product._id}">
                       <div class="my-3 d-flex justify-content-evenly">
                    <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/detailed/">SAVE</button>
                    <a class="btn btn-secondary save" data-bs-dismiss="modal">CANCEL</a>
                </div>
                   </form> 
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

function detailedPrice(price) {
    if (price){
        return price
    } else {
        return 0
    }
}

function printPricelistModal(product) {

    return `
<div class="modal fade product-view" id="_${product._id}" tabindex="-1" aria-labelledby="Product view" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">${product.product_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                    <div class="row pvRow1">
                        <div class="col-xl-6 col-lg-7 ">
                            <img loading="lazy" src="/img/products/${printMainImage(product)}" alt="" id="prod-main-img">
                        </div>
                        <div class="col-xl-6 col-lg-5">
                            <div class="row small-img-row">
                                ${printProductViewSmallImages(product)}
                            </div>
                            <div id="share" class="text-center mt-5">
                                <i class="bi bi-share-fill px-2"></i>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=https://amazon-cellular.com/search/ext/${product._id}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a href="whatsapp://send?text=https://amazon-cellular.com/search/ext/${product._id}"><i class="fab fa-whatsapp"></i></a>
                                <input type="hidden" value="https://amazon-cellular.com/search/ext/${product._id}">
                                <div class="d-inline"><button class="c2cLink btn btn-outline-secondary"> copy product link <i class="far fa-clipboard c2c" ></i></button></div>
                                
                            </div>
                            <div class="description mt-3"> Description</div>
                            <div class="iPV">${product.description}</div>
                            <div class="description">What's in the box</div>
                            <div class="iPV">${product.inBox}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

function printMainImage(product) {
    let mainImage;
    product.product_images.forEach(productImage => {
        if (productImage.filename.includes('image1') && !productImage.filename.includes('image10')) {
            mainImage = productImage.filename
        }
    })
    return mainImage;
}

function printProductViewSmallImages(product) {
    return product.product_images.map(productImage => {
        return `
                <div class="col-2 small-img-col">
                    <img loading="lazy" src="/img/products/${productImage.filename}" alt="" class="prod-small-img">
                </div>
            `
    }).join('');
}

function printWishlistModal(req, wishlist) {
    if (Object.keys(wishlist).length > 0) {
        req.session.wishlistCount = wishlist.products.length

        function renderedWishlistItems(wishlist) {
            if (wishlist.products.length > 0) {
                return wishlist.products.map(wishItem => {
                    return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/products/${printMainImage(wishItem._id)}" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${wishItem._id.product_name}</h5>
                        <div class="mt-3 mt-lg-4">
                            <div class="price"><span>  ksh.</span> ${wishItem._id.price}</div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <form method="post" action="/wishlist/delete/${wishItem._id._id}"><button type="submit" class="remove btn btn-sm btn-danger" >Remove <i class="bi bi-trash"></i></button></form>
                            <form method="post" action="/cart/from-wish/${wishItem._id._id}">
                                <button type="submit" class="remove btn btn-sm btn-success">Add to cart <i class="bi bi-cart3"></i></button>
                            </form>
                        </div>
                    </div>
                    <span class="my-2 border-bottom border-2">
                </span> 
            </div>
            `
                }).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your wishlist is empty at the moment<br>Click <i class="fas fa-heart"></i> to add items to your wishlist</h6>
                `
            }
        }

        return `
<div class="modal fade" id="wishlist" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Wishlist</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ${renderedWishlistItems(wishlist)}
            </div>
            <div class="modal-footer py-3"></div>
        </div>
    </div>
</div>
    `

    } else {
        req.session.wishlistCount = 0

        return `
<div class="modal fade" id="wishlist" tabindex="-1" aria-labelledby="Wishlist" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="favsTitle">Wishlist</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <h6 class="text-center py-5 text-muted">Your wishlist is empty at the moment<br>Click <i class="fas fa-heart"></i> to add items to your wishlist</h6>     
            </div>
        </div>
    </div>
</div>
             
        `
    }
}

function printCartModal(req, cart) {
    if (Object.keys(cart).length > 0) {
        req.session.cartCount = cart.products.length

        function renderedCartItems(cart) {
            if (cart.products.length > 0) {
                return cart.products.map(cartItem => {
                    return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/products/${printMainImage(cartItem._id)}" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${cartItem._id.product_name}</h5>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <div>
                                <input type="number" class="form-control qty" name="${cartItem._id._id}" value="${cartItem.quantity}" min="1">
                            </div>
                            <div> 
                                <span>  ksh.</span> 
                                <div class="itemPrice"> ${cartItem._id.price}</div>
                                <div class="d-none itemShopPrice">${cartItem._id.shop_price}</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                        
                            <button type="submit" class="remove btn btn-sm btn-danger" formaction="/cart/delete/${cartItem._id._id}">Remove <i class="bi bi-trash"></i></button>
                            <div>
                            <span>subtotal (ksh):</span>
                            <div class="subtotal"></div>
                            <div class="d-none shopSubtotal"></div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2">
                </div>
            `
                }).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your cart is empty at the moment<br>Click <i class="fas fa-shopping-cart"></i> to add items to your cart</h6>  
                `
            }
        }

        function cartModalFooter(cart) {
            if (cart.products.length > 0) {
                return `
                   <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <input type="hidden" name="total" class="totalOutput">
                <input type="hidden" name="shopTotal" class="shopTotalOutput">
                <button type="submit" class="btn btn-success" id="checkout" formaction="/checkout">
                   Checkout
                </button>
            </div> 
                `
            } else {
                return `
                    <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <button type="button" class="btn btn-success" id="checkout" disabled>
                    Checkout
                </button>
            </div>
                `
            }
        }

        return `
<div class="modal fade" id="cart" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Shopping Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form method="post">
                ${renderedCartItems(cart)}
                ${cartModalFooter(cart)}
            </div>
            </form>
        </div>
    </div>
</div>
    `
    } else {
        req.session.cartCount = 0

        return `
<div class="modal fade" id="cart" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Shopping Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6 class="text-center py-5 text-muted">Your cart is empty at the moment<br>Click <i class="fas fa-shopping-cart"></i> to add items to your cart</h6>  
            </div>
        </div>
    </div>
</div>
             
        `
    }

}

exports.wishlistCount = function (req) {
    return req.session.wishlistCount ? parseInt(req.session.wishlistCount) : 0
}

exports.cartCount = function (req) {
    return req.session.cartCount ? parseInt(req.session.cartCount) : 0
}

async function getModals(req, Wishlist, Cart) {
    let wishlist = {};
    if (req.session.wishlistID) {
        wishlist = await Wishlist.findById(req.session.wishlistID).populate('products._id', '_id product_name price product_images');
    } else wishlist = [];


    let cart;
    if (req.session.cartID) {
        cart = await Cart.findById(req.session.cartID).populate('products._id', '_id product_name price shop_price product_images');
    } else cart = [];

    return [wishlist, cart]
}

function wishlistButton(productID, wishlist) {
    if (wishlist.length > 0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-heart-fill actionSelected" ></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn wishlistPixel"><i class="bi bi-heart" style="color: black"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn wishlistPixel"><i class="bi bi-heart" style="color: black"></i></button>
                </form>
            `
    }
}

function cartButton(productID, cart) {
    if (cart.length > 0 || Object.keys(cart).length > 0) {
        const product = cart.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-cart-fill actionSelected" ></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn cartPixel"><i class="bi bi-cart3" style="color: black"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn cartPixel"><i class="bi bi-cart3" style="color: black"></i></button>
                </form>
            `
    }
}

function wishBtnPV(productID, wishlist) {
    if (wishlist.length > 0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
               
                    <button type="submit" class="btn btn-success prod-start" formaction="/wishlist/${productID}"> Added 
                        <i class="bi bi-heart-fill"></i></button>
                
            `
        } else {
            return `
               
                    <button type="submit" class="btn btn-outline-success prod-start wishlistPixel" formaction="/wishlist/${productID}"> Wishlist 
                        <i class="bi bi-heart"></i></button>
               
            `
        }
    } else {
        return `
                
                    <button type="submit" class="btn btn-outline-success prod-start wishlistPixel" formaction="/wishlist/${productID}"> Wishlist 
                        <i class="bi bi-heart"></i></button>
               
            `
    }
}

function cartBtnPV(productID, cart) {
    if (cart.length > 0 || Object.keys(cart).length > 0) {
        const product = cart.products.id(productID);
        if (product) {
            return `
                
                    <button type="submit" class="btn btn-success prod-start" formaction="/cart/${productID}"> Added 
                        <i class="bi bi-cart-fill"></i></button>
                
            `
        } else {
            return `
                
                    <button type="submit" class="btn btn-outline-success prod-start cartPixel" formaction="/cart/${productID}"> Cart 
                        <i class="bi bi-cart3"></i></button>
                
            `
        }
    } else {
        return `
                
                    <button type="submit" class="btn btn-outline-success prod-start cartPixel" formaction="/cart/${productID}"> Cart 
                        <i class="bi bi-cart3"></i></button>
                
            `
    }
}

function extraNav(req) {

    if (req.session.token) {
        return `
            <div class="me-1" >${req.session.full_name.split(" ")[0]} : </div>
            <div class="clickable" data-bs-toggle="modal" data-bs-target="#cart">Checkout</div>
            <div class="separator mx-2">|</div>
            <div class="clickable" onclick="location.href='/orders'">Orders</div>
            <div class="separator mx-2">|</div>
            <div class="clickable" onclick="location.href='/login/logout'">Log Out</div>
        `
    } else {
        return `
        <div class="clickable" onclick="location.href='/register'">Register</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='/login'">Log In</div>
        `
    }
}

function footer(req) {
    let token = req.session.token

    if (token) {
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/orders'">ORDERS
        </button>        
        <button type="button" class="btn btn-danger reg" onclick="location.href='/login/logout'">LOG OUT
        </button>
        `
    } else {
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT</button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/register'">REGISTER
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/login'">LOGIN
        </button>
        `
    }
}

function printProducts(products) {
    return products.map(
        product => {
            return `
                <li>${product.product_name}<span class="orderItemSpan">- (qty ${product.quantity})</span></li>
            `
        }
    ).join('');
}

function printPaymentMethod(order) {
    if (order.mpesa === 'true') {
        return `${order.mpesaDetails.mpesaCode}`
    } else if (order.mpesa === 'false') {
        return 'On delivery'
    }
}

function printStatusBtn(order) {
    switch (order.orderStatus) {
        case 'Order placed':
            return `<td class="text-center orderRows"><div class="btn btn-primary statusBtn">${order.orderStatus}</div></td>`

        case 'In transit':
            return `<td class="text-center orderRows"><div class="btn btn-warning statusBtn">${order.orderStatus}</div></td>`

        case 'Delivered':
            return `<td class="text-center orderRows"><div class="btn btn-success statusBtn">${order.orderStatus}</div></td>`

        case 'Cancelled':
            return `<td class="text-center orderRows"><div class="btn btn-danger statusBtn">${order.orderStatus}</div></td>`
    }
}

exports.emailRegistration = async function (customer) {

    try {

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from: {
                name: `${process.env.BUSINESS_NAME} 🛒`,
                address: process.env.EMAIL
            },
            to: customer.email,
            subject: `SUCCESSFUL REGISTRATION ON ${process.env.BUSINESS_NAME}`,
            html: `
Dear ${customer.full_name},
<br><br>
Your registration process at ${process.env.BUSINESS_NAME} was successful. You will be receiving communication from us from this email e.g. the status of your orders.<br> We are happy to have you on board and remember "<i>if you can't stop thinking about it, buy it 😉"</i>
<br><br>
Kind regards,<br>
${process.env.BUSINESS_NAME}

 
`
        }

        return await transport.sendMail(mailOptions);

    }
    catch (e) {
        console.log(e)
    }
}

exports.emailOrderStatus = async function (order, email, fullName) {

    try {

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from: {
                name: `${process.env.BUSINESS_NAME} 🛒`,
                address: process.env.EMAIL
            },
            to: email,
            subject: `UPDATE ON STATUS FOR ORDER ${order._id}`,
            html: `
Dear ${fullName},
<br><br>
The status for your order ${order._id} has been updated to ${emailStatusBtn(order)}. Please see the details of the order below:<br>
${orderData(order)}
<br><br>
Kind regards,<br>
${process.env.BUSINESS_NAME}

`,
        }

        return await transport.sendMail(mailOptions);

    }
    catch (e) {
        console.log(e)
    }
}

exports.emailLowQuantity = async function (product) {

    try {

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from: {
                name: `${process.env.BUSINESS_NAME} 🛒`,
                address: process.env.EMAIL
            },
            to: process.env.EMAIL,
            subject: `LOW QUANTITY FOR ${product.product_name}`,
            html: `
Dear Admin,
<br><br>
The quantity for the product above is low and will be switched off unless product quantity is updated. 
<!--Replace your_domain.com with your actual domain-->
<a href="https://your_domain.com/admin/products/edit/${product._id}">Click here to update the quantity</a>
<br><br>
Kind regards,<br>
${process.env.BUSINESS_NAME}


`,
        }

        return await transport.sendMail(mailOptions);

    }
    catch (e) {
        console.log(e)
    }
}

exports.emailForgotPassword = async function (email, fullName, link) {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from: {
                name: `${process.env.BUSINESS_NAME} 🛒`,
                address: process.env.EMAIL
            },
            to: email,
            subject: `RESETTING YOUR ${process.env.BUSINESS_NAME} PASSWORD`,
            html: `
Dear ${fullName},
<br><br>
Click the link below to reset your password for ${process.env.BUSINESS_NAME}. The link expires after 15 minutes and it's for a one time use. <br>
<a href="${link}">Reset my password</a>
<br>
If you did not initiate a forgot password request kindly report this incident by simply replying to this email </a>
<br><br>
Kind regards,<br>
${process.env.BUSINESS_NAME}


`,
        }

        return await transport.sendMail(mailOptions);

    }
    catch (e) {
        console.log(e)
    }
}

function orderData(order) {
    function printProducts(order) {
        return order.products.map(
            product => {
                return `
            <li>${product.product_name} &nbsp;<span>- Qty ${product.quantity}</span></li>
        `
            }).join('');
    }

    function printPaymentType(order) {
        if (order.mpesa === 'true') {
            return `Lipa na M-PESA`
        } else if (order.mpesa === 'false') {
            return `On delivery`
        }
    }

    return `
<ul>
        ${printProducts(order)}
        ${printOption(order)}
        <p>Payment Type:&nbsp;${printPaymentType(order)}</p>
        <p>Amount: (ksh.)&nbsp;${order.total + order.delivery_fee}</p>
</ul>
    `
}

function emailStatusBtn(order) {
    switch (order.orderStatus) {
        case 'Order placed':
            return `<button style="background-color: blue; color: white">${order.orderStatus.toUpperCase()}</button>`

        case 'In transit':
            return `<button style="background-color: yellow">${order.orderStatus.toUpperCase()}</button>`

        case 'Delivered':
            return `<button style="background-color: green; color: white">${order.orderStatus.toUpperCase()}</button>`

        case 'Cancelled':
            return `<button style="background-color: red; color: white">${order.orderStatus.toUpperCase()}</button>`
    }
}

function printBadge(order) {
    if (order.new) {
        return `
                <span class="badge bg-info">new</span>
            `
    } else if (order.processed) {
        return `
                <span class="badge bg-secondary">processed</span>
            `
    } else return '<span class="badge text-dark">opened</span>'
}

function printPhone(order) {
    if (order.customerID){
        return order.customerID.phone
    } else{
        return order.ePhone
    }
}

function printOrderNotes(order) {
    if (order.orderNotes !== ''){
        let editedText = order.orderNotes.replace(/\n\r?/g, '<br />');
        return `
                <hr>
                <div style="text-transform: initial;">${editedText}</div>
            `
    } else return ''
}

function printOption(order) {
    if (order.option){
        return `Option:&nbsp;${order.option}`
    } else return ''
}

exports.orderDeleteModals= function (orders) {
    return orders.map(order => {
        return `
        <div class="modal fade" id="delete${order._id}" tabindex="-1" aria-labelledby="deleteProductModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>DELETE</b> ${order._id}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/admin/orders/delete/${order._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
           `;
    }).join('');
}

exports.printOrdersRecent = function (orders) {

    function printName(order) {
        if (order.eName){
            return `${order.eName}`
        } else return ``
    }

    return orders.map(
        order => {
            return `
<tr>
    <td class="orderRows"><span class="dateSorta">${order.orderDate.toISOString()}</span><br>${displayDate(order.orderDate)}<br> ${order.orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    <td class="orderRows">${printBadge(order)} <br> ${order._id}</td>
    <td class="orderRows"><a href="tel:0${printPhone(order)}">0${printPhone(order)}</a><br><br><a href="https://www.google.com/maps/dir/?api=1&origin=-1.283733332480186%2C36.827665514486654&destination=${order.address.latitude}%2C${order.address.longitude}&travelmode=driving" target="_blank">Address</a></td>
    <td>
        <ul class="orderItems">
            ${printName(order)}
            ${printProducts(order.products)}
            ${printOption(order)}
            ${printOrderNotes(order)}
        </ul>
    </td>
    <td class="orderRows">${order.total}<br>+${order.delivery_fee}<br>=${order.total + order.delivery_fee}</td>
    <td class="orderRows">${printPaymentMethod(order)}</td>
    ${printStatusBtn(order)}
    <td>
        <a href="/admin/orders/edit/${order._id}"><i class="far fa-edit"></i></a>
        <div class="ms-3 d-inline"><button class="orderClip formBtn"> <i class="far fa-clipboard"></i></button></div>
        <br><br>
        <div  class="deleteForm">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${order._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>

    </td>
</tr>
            `
        }).join('')
}

exports.printOrdersNew = function (orders) {

    function printName(order) {
        if (order.eName){
            return `${order.eName}`
        } else return ``
    }

    const newOrders = orders.map(
        order => {
            if (order.new) return `
<tr>
    <td class="orderRows">${displayDate(order.orderDate)}<br> ${order.orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    <td class="orderRows">${printBadge(order)} <br> ${order._id} </td>
    <td class="orderRows"><a href="tel:0${printPhone(order)}">0${printPhone(order)}</a><br><br><a href="https://www.google.com/maps/dir/?api=1&origin=-1.283733332480186%2C36.827665514486654&destination=${order.address.latitude}%2C${order.address.longitude}&travelmode=driving" target="_blank">Address</a></td>
    <td>
        <ul class="orderItems">
            ${printName(order)}   
            ${printProducts(order.products)}
            ${printOption(order)}
            ${printOrderNotes(order)}
        </ul>
    </td>
    <td class="orderRows">${order.total}<br>+${order.delivery_fee}<br>=${order.total + order.delivery_fee}</td>
    <td class="orderRows">${printPaymentMethod(order)}</td>
    ${printStatusBtn(order)}
    <td>
        <a href="/admin/orders/edit/${order._id}"><i class="far fa-edit"></i></a>
        <div class="ms-3 d-inline"><button class="orderClip formBtn"> <i class="far fa-clipboard"></i></button></div>
        <br><br>
        <div  class="deleteForm">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${order._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
    </td>
</tr>
            `
        }).join('')

    if (newOrders.length > 0) {
        return newOrders
    } else return `<td colspan="8">no new orders</td>`
}

exports.printCOD = function (cod) {
    if (cod>0){
        return `<span style="color: green">${cod} DEBIT</span>`
    } else if (cod<0){
        return `<span style="color: red">${cod} CREDIT</span>`
    } else if (cod = 0){
        return `<span>${cod} CLEARED</span>`
    }
}

exports.navbarDropdown = function (categories) {
    return categories.map(
        category => {
            return `
                <li><a class="dropdown-item" href="/${category._id}" >${category.category_name}</a></li>
            `
        }
    ).join('')
}


exports.displayDate = displayDate;
exports.getMonthYear = getMonthYear;
exports.displayMonth = displayMonth;
exports.getInput = getInput;
exports.getError = getError;
exports.printProductModal = printProductModal;
exports.printPricelistModal = printPricelistModal;
exports.printDetailedModal = printDetailedModal;
exports.printMainImage = printMainImage;
exports.printWishlistModal = printWishlistModal;
exports.printCartModal = printCartModal;
exports.getModals = getModals;
exports.wishlistButton = wishlistButton;
exports.cartButton = cartButton;
exports.extraNav = extraNav;
exports.footer = footer;
exports.printProducts = printProducts
exports.printPaymentMethod = printPaymentMethod
exports.printStatusBtn = printStatusBtn
exports.printProductViewSmallImages = printProductViewSmallImages
exports.wishBtnPV = wishBtnPV
exports.cartBtnPV = cartBtnPV