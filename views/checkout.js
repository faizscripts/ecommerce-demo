const axios = require('axios');
const {printMainImage, printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Checkout'

module.exports = function ({req, customer, wishlist, cart, paymentError, categories}) {

    function renderCustomer(customer) {
        return `
                <div class="mb-2 form-group">
                    <label for="full_name" class="form-label" required>Full Name</label>
                    <input name="full_name" type="text" class="form-control" id="full_name" aria-describedby="name" value="${customer.full_name}" disabled>
                </div>
                <div class="row">
                    <div class="mb-2 col-lg-6 form-group">
                        <label for="email" class="form-label" required>Email Address</label>
                        <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${customer.email}" disabled>
                        <div class="form-text">This email will be used to send you updates on the status of your orders</div>
                    </div>
                    <div class="mb-2 col-lg-6 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone number" value="0${customer.phone}" disabled>
                    </div>    
                </div>
                <div class="mb-2 form-group">
                    <label for="address" class="form-label" required>Shipping Address</label>
                    <input name="address" type="text" class="form-control" id="address" aria-describedby="phone number" value="${customer.address}" disabled>
                </div>
                <div class="mt-3 d-flex justify-content-center">
                    <button class="btn btn-sm btn-danger" onclick="location.href='/register/edit'"> Modify Information </button>
                </div>
        `}

    function renderedYourCart(cart) {
        return cart.products.map(
            cartItem => {
                return `
                    <div class="row">
                        <div class=" col-3">
                            <img src="/img/products/${printMainImage(cartItem._id)}" alt="" class="img-fluid">
                        </div>
                        <div class="col-9 cart-details">
                            <div class="checkoutItemName">
                                ${cartItem._id.product_name}
                            </div>
                            <div class="d-flex justify-content-between mt-2">
                                <div>ksh. ${cartItem._id.price}</div>
                                <div>Qty: ${cartItem.quantity}</div>
                            </div>
                        </div>
                    </div>
                    <hr>
                `}
        ).join('')
    }

    function printPaymentError(paymentError) {
        if (paymentError){
            req.session.paymentError = null
            return `
                <div class="d-flex justify-content-center m-1"><p id="paymentError">${paymentError}</p></div>
            `}
        else return ``
    }

    function printPaymentMethod(customer) {
        if (customer.distance <= 7){
            return `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mpesa" value="false" id="cash" checked>
                        <label class="form-check-label" for="cash">
                            Payment on delivery <span class="paymentSpan text-muted">(only available for deliveries in a radius of 7km from the shop)</span>
                        </label>
                    </div>
                    <div class="form-check mb-5">
                        <input class="form-check-input" type="radio" name="mpesa" value="true" id="mpesaBtn">
                        <label class="form-check-label" for="mpesaBtn">
                            Lipa na M-PESA <span class="paymentSpan text-muted">(${process.env.MPESA_INSTRUCTIONS})</span>
                        </label>
                    </div>
            `} else {
            return `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mpesa" value="false" id="cash" disabled>
                        <label class="form-check-label" for="cash">
                            Payment on delivery <span class="paymentSpan text-muted">(only available for deliveries in a radius of 7km from the shop)</span>
                        </label>
                    </div>
                    <div class="form-check mb-5">
                        <input class="form-check-input" type="radio" name="mpesa" value="true" id="mpesaBtn" checked>
                        <label class="form-check-label" for="mpesaBtn">
                            Lipa na M-PESA <span class="paymentSpan text-muted">(${process.env.MPESA_INSTRUCTIONS})</span>
                        </label>
                    </div>
            `}
    }

    return layout({
        title: title,
        req: req,
        categories,
        content: `
${printPaymentError(paymentError)}
<div id="checkout-body" class="container-fluid">
    <!--    Main Content-->
    <div id="checkout-main" class="container-fluid">
        <!--        Contact-->
        <div class="card">
            <div class="card-header">
                ORDER INFORMATION
            </div>
            <div class="card-body">
                <form method="post">
                    <div class="mb-2 form-group">
                        <label for="fullname" class="form-label" required>Name</label>
                        <input name="fullname" type="text" class="form-control" id="fullname" aria-describedby="name" required>
                    </div>
                    <div class="row mt-3">
                        <div class="mb-2 col-md-6 form-group">
                            <label for="phone" class="form-label" required>Phone Number</label>
                            <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone number" required>
                        </div> 
                        <div class="mb-2 col-md-6 form-group">
                            <label for="email" class="form-label">Email <span class="paymentSpan text-muted">(optional)</span></label>
                            <input name="email" type="email" class="form-control" id="email" aria-describedby="name">
                            <div class="paymentSpan text-muted">Order updates will be sent via email</div>
                        </div> 
                    </div>
                    <div class="mb-2 form-group">
                        <label for="address" class="form-label" required>Shipping Address</label>
                    </div>
                    <input id="pac-input" class="controls border border-dark border-3" type="text" aria-describedby="address" placeholder="Search">
                    <div id="map" class="form-control"></div>
                    <input type="hidden" name="latitude" id="latitude">
                    <input type="hidden" name="longitude" id="longitude">
                    <input name="delivery_fee" type="hidden" class="form-control" id="delivery_fee" aria-describedby="name"  readonly>
                    <input type="hidden" id="distance" name="distance">
                    <div id="payment-options" class="mt-4">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mpesa" value="false" id="cash" required>
                            <label class="form-check-label" for="cash">
                                Payment on delivery
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mpesa" value="true" id="mpesaBtn" required>
                            <label class="form-check-label" for="mpesaBtn">
                                Lipa na M-PESA <span class="paymentSpan text-muted">(${process.env.MPESA_INSTRUCTIONS})</span>
                            </label>
                        </div>
                    </div>

                    <div class=" d-flex justify-content-between mt-4">
                        <div class="final-text">Subtotal <span>(ksh.)</span></div>
                        <div class="final-price" id="cartTotal">${cart.total}</div>
                    </div>
                    <div class=" d-flex justify-content-between">
                        <div class="final-text">Delivery Fee<span>(ksh.)</span></div>
                        <div class="final-price" id="deliveryFee">0</div>
                    </div>
                    <div class=" d-flex justify-content-between">
                        <div class="final-text">Total <span>(ksh.)</span></div>
                        <div class="final-price" id="checkoutTotal">${cart.total}</div>
                    </div>
                    <span class="mt-2" style="text-transform: initial;">*By placing an order, you're agreeing to our <a href="/faqs/terms">terms and conditions</a></span>

                    <div class="text-center">
                        <button type="submit" class="btn btn-lg btn-success" id="placeOrder" formaction="/orders">PLACE
                            ORDER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Sidebar -->
    <div id="checkout-sidebar" class="container-fluid">
        <div class="text-center" id="divForHelp">
            <button class="btn btn-warning" id="help-button">NEED HELP?</button>
        </div>

        <div class="card mt-2 mt-md-4">
            <div class="card-header ">
                YOUR CART
            </div>
            <div class="card-body">
                <div class="checkoutCart">
                    ${renderedYourCart(cart)}
                    <div class="text-center mt-3">
                        <button class="btn btn-sm btn-danger" data-bs-toggle="modal"
                                data-bs-target="#cart">Modify Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}

      
        `})
}
