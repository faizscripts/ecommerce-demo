const layout = require('../layout');
const title = 'Add Special Categories';
const {getInput, getError}= require('../../../middlewares/otherFunctions');

module.exports = ({input, error}) => {
    return layout({
        title: title,
        content: `<div id="add-product" class="container card my-5">
    <div class="card-header">
        Special Categories Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="mb-3 form-group">
                <label for="special_name" class="form-label" required>Special Category Name</label>
                <input name="special_name" type="text" class="form-control" id="special_name" aria-describedby="special_name" value="${getInput(input, 'special_name')}" required>
                <div class="inputError">${getError(error, 'special_name')}</div>
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/special">SAVE</button>
                <button class="btn btn-warning save" type="submit" value="submit" formaction="/admin/special/copy">SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/special'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}