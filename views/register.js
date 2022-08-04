const layout = require('./layout');
const title = 'Register';
const {getInput, getError, printWishlistModal, printCartModal}= require('../middlewares/otherFunctions');

module.exports = ({req, wishlist, cart, input, error, exists, categories}) =>{
    function existsCheck(exists) {
        if (exists){
            return`
                <div class="inputError">The email you entered already exists</div>
            `}
        else {
            return ` `
        }
    }

    return layout({
        title: title,
        req: req,
        categories,
        content: `
<section class="register">
    <div class="card">
        <div class="card-header">
            Register
        </div>
        <div class="card-body">
            <form method="POST" action="/register">
                <div class="mb-2 form-group">
                    <label for="full_name" class="form-label" required>Full Name</label>
                    <input name="full_name" type="text" class="form-control" id="full_name" aria-describedby="name" value="${getInput(input, 'full_name')}" required>
                    <div class="inputError">${getError(error, 'full_name')}</div>
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="email" class="form-label" required>Email Address</label>
                        <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${getInput(input, 'email')}" required>
                        <div class="form-text">This email will be used to send you updates on the status of your orders</div>
                        <div class="inputError">${getError(error, 'email')}</div>
                        ${existsCheck(exists)}
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone number" value="0${getInput(input, 'phone')}" required>
                        <div class="form-text">For M-Pesa payments, please enter a safaricom number in the format 0712345678/ 0123456789.</div>
                        <div class="inputError">${getError(error, 'phone')}</div>
                    </div>
                        
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="password" class="form-label" required>Password</label>
                        <div class="d-block">
                            <input name="password" type="password" class="form-control passInput" id="password" value="${getInput(input, 'password')}" required>
                            <i class="passIcon bi bi-eye-slash"></i>
                            <div class="inputError">${getError(error, 'password')}</div>
                        </div>
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="password_confirmation" class="form-label" required>Confirm Password</label>
                        <div class="d-block">
                            <input name="password_confirmation" type="password" class="form-control confirmPassInput" id="password_confirmation" value="${getInput(input, 'password_confirmation')}" required>
                            <i class="confirmPassIcon bi bi-eye-slash"></i>
                            <div class="inputError">${getError(error, 'password_confirmation')}</div>
                        </div>
                        
                    </div>
                </div>
                <div class="mb-2 form-group">
                    <label for="address" class="form-label" required>Shipping Address</label>
                </div>
                <input id="pac-input" class="controls border border-dark border-3" type="text" aria-describedby="address" placeholder="Search">
                <div id="map" class="form-control"></div>
                <input type="hidden" name="latitude" id="latitude">
                <input type="hidden" name="longitude" id="longitude">
                <div class="m-2 form-group">
                    <label for="delivery_fee" class="form-label" >Delivery Fee (ksh)</label>
                    <input name="delivery_fee" type="number" class="form-control" id="delivery_fee" aria-describedby="name" value="${getInput(input, 'delivery_fee')}" readonly>
                    <div class="form-text deliveryExplaination"></div>
                    <div class="inputError">${getError(error, 'delivery_fee')}</div>
                    <input type="hidden" id="distance" name="distance">
                </div>
                
                <div class="text-center mt-4">
                    <button type="submit" value="submit" class="btn btn-success registerPixel">SUBMIT</button>
                    <p class="mt-2">Already have an account? <a href="/login">Log in here</a></p>
                </div>
            </form>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}

        `})
}