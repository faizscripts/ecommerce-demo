const layout = require('../layout');
const title = 'Add Admin';
const {getInput, getError}= require('../../../middlewares/otherFunctions');

module.exports = ({input, error, exists}) => {
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
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        New Admin Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="mb-3 form-group">
                <label for="admin_name" class="form-label" required>Admin Name</label>
                <input name="admin_name" type="text" class="form-control" id="admin_name" aria-describedby="admin_name" value="${getInput(input, 'admin_name')}" required>
                <div class="inputError">${getError(error, 'admin_name')}</div>
            </div>
            <div class="row">
                <div class="mb-3 col-md-6 form-group">
                    <label for="email" class="form-label" required>Email</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="email" value="${getInput(input, 'email')}" required>
                    <div class="inputError">${getError(error, 'email')}</div>
                   ${existsCheck(exists)}
                </div>
                <div class="mb-3 col-md-6 form-group">
                    <label for="phone" class="form-label" required>Phone</label>
                    <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone" value="${getInput(input, 'phone')}" required>
                    <div class="inputError">${getError(error, 'phone')}</div>
                </div> 
            </div>
            <div class="row">
                <div class="mb-3 col-md-6 form-group">
                    <label for="password" class="form-label" required>Password</label>
                    <input name="password" type="password" class="form-control" id="password" aria-describedby="password" value="${getInput(input, 'password')}" required>
                    <div class="inputError">${getError(error, 'password')}</div>
                </div>
                <div class="mb-3 col-md-6 form-group">
                    <label for="password_confirmation" class="form-label" required>Password Confirmation</label>
                    <input name="password_confirmation" type="password" class="form-control" id="password_confirmation" aria-describedby="password_confirmation" value="${getInput(input, 'password_confirmation')}" required>
                    <div class="inputError">${getError(error, 'password_confirmation')}</div>
                </div> 
            </div>

            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/admins/">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/admins'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
`})
}