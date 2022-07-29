const layout = require('./layout');
const title = 'Forgot Password';
const {getInput, getError, printWishlistModal, printCartModal}= require('../middlewares/otherFunctions');

module.exports = ({req, wishlist, cart, incorrect, idError, categories}) => {
    function showIncorrect(incorrect) {
        if (incorrect){
            return `
            <div class="loginError">Email doesn't exist</div>
        `}
        else {
            return ` `
        }
    }
    
    function customerError(idError) {
        if (idError){
            return `
            <div class="loginError">Customer not found!</div>
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
            FORGOT PASSWORD
        </div>
        <div class="card-body">
            <form method="post" action="/login/forgot">
                ${showIncorrect(incorrect)}
                ${customerError(idError)}
                <div class="mb-2 form-group">
                    <label for="email" class="form-label" required>Enter the email address you want to reset the password for</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp"  required>
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