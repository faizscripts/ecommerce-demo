const layout = require('./layout');
const title = 'Log In';
const {getInput, getError, printWishlistModal, printCartModal}= require('../middlewares/otherFunctions');

module.exports = ({req, wishlist, cart, input, error, incorrect, categories}) => {
    function showIncorrect(incorrect) {
        if (incorrect){
            return `
            <div class="loginError">Invalid email or password</div>
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
            LOG IN
        </div>
        <div class="card-body">
            <form method="post" action="/login">
                ${showIncorrect(incorrect)}
                <div class="mb-2 form-group">
                    <label for="email" class="form-label" required>Email Address</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${getInput(input, 'email')}" required>
                    <div class="inputError">${getError(error, 'email')}</div>
                </div>
                <div class="mb-2 form-group">
                    <label for="password" class="form-label" required>Password</label>
                    <div class="d-block">
                        <input name="password" type="password" class="form-control passInput" id="password" required>
                        <i class="passIcon bi bi-eye-slash"></i>
                    </div>
                    <div class="inputError">${getError(error, 'password')}</div>
                    <p class="my-1"><a href="/login/forgot">Forgot Password?</a></p>
                </div>
                <div class="text-center">
                    <button type="submit" class="mt-1 btn btn-success">SUBMIT</button>
                    <p class="my-2">Don't have an account yet? <a href="/register">Create an account</a></p>
                </div>
            </form>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}
        `})
}