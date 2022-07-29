const layout = require('./layout');
const title = 'Reset Password';
const {getInput, getError, printWishlistModal, printCartModal}= require('../middlewares/otherFunctions');

module.exports = ({req, wishlist, cart, customer, token, error, categories}) => {
    function showIncorrect(incorrect,token) {
        if (incorrect){
            return `
            <div class="loginError">Email doesn't exist</div>
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
<section class="register ">
    <div class="card" id="login_card">
        <div class="card-header">
            RESET PASSWORD
        </div>
        <div class="card-body">
        <h6 class="mb-2">Reset password for ${customer.email}</h6>
            <form method="post" action="/login/reset/${customer._id}/${token}">
                
                    <div class="mb-2 form-group">
                        <label for="password" class="form-label" required>Password</label>
                        <input name="password" type="password" class="form-control" id="password" required>
                        <div class="inputError">${getError(error, 'password')}</div>
                    </div>
                    <div class="mb-2 form-group">
                        <label for="password_confirmation" class="form-label" required>Confirm Password</label>
                        <input name="password_confirmation" type="password" class="form-control" id="password_confirmation" required>
                        <div class="inputError">${getError(error, 'password_confirmation')}</div>
                    </div>
                
                <div class="text-center">
                    <button type="submit" class="mt-1 btn btn-success">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}
        `})
}