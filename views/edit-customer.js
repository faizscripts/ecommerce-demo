const layout = require('./layout');
const title = 'Edit My Information';
const {getInput, getError, printWishlistModal, printCartModal}= require('../middlewares/otherFunctions');

module.exports = ({req, customer, wishlist, cart, input, error}) =>{

    function getValue(customer, input, key) {
        if (customer){
            return customer[key]
        } else{
            return getInput(input, key)
        }
    }

    return layout({
        title: title,
        req: req,
        content: `
<section class="register">
    <div class="card">
        <div class="card-header">
            Edit My Information
        </div>
        <div class="card-body">
            <form method="POST">
                <div class="mb-2 form-group">
                    <label for="full_name" class="form-label" required>Full Name</label>
                    <input name="full_name" type="text" class="form-control" id="full_name" aria-describedby="name" value="${getValue(customer, input, 'full_name')}" required>
                    <div class="inputError">${getError(error, 'full_name')}</div>
                </div>
                <div class="mb-2 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone number" value="0${getValue(customer, input, 'phone')}" required>
                        <div class="form-text">For M-Pesa payments, please enter a safaricom number in the format 0712345678/ 0123456789.</div>
                        <div class="inputError">${getError(error, 'phone')}</div>
                    </div> 
                <div class="mb-2 form-group">
                    <label for="address" class="form-label" required>Shipping Address</label>
                </div>
                <input id="pac-input" class="controls border border-dark border-3" type="text" aria-describedby="address" placeholder="Search">
                <div id="map" class="form-control"></div>
                <input type="hidden" name="latitude" value="${customer.latitude}" id="latitude">
                <input type="hidden" name="longitude" value="${customer.longitude}" id="longitude">
                <div class="m-2 form-group">
                    <label for="delivery_fee" class="form-label" >Delivery Fee (ksh)</label>
                    <input name="delivery_fee" type="number" class="form-control" id="delivery_fee" aria-describedby="name" value="${getInput(input, 'delivery_fee')}" readonly>
                    <div class="form-text deliveryExplaination"></div>
                    <div class="inputError">${getError(error, 'delivery_fee')}</div>
                    <input type="hidden" id="distance" name="distance">
                </div>
                
                <div class="d-flex justify-content-evenly mt-4">
                    <button type="submit" class="btn btn-secondary" onclick="location.href='/checkout'">CANCEL</button>
                    <button type="submit" class="btn btn-success" formaction="/register/edit">SAVE CHANGES</button>
                </div>
            </form>
        </div>
    </div>
</section>



${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}

<script src="https://maps.googleapis.com/maps/api/js?key=${process.env.KEY}&callback=initMap&libraries=places&v=weekly" async defer>
</script>

        `})
}