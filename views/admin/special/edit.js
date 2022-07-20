const layout = require('../layout');
const title = 'Edit Special Categories';
const {getError} = require('../../../middlewares/otherFunctions');

module.exports = ({special, error}) => {
    return layout({
        title: title,
        content: `
        <div id="add-product" class="container card my-5">
    <div class="card-header">
        Special Categories Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/special/edit/${special.id}">
            <div class="mb-3 form-group">
                <label for="special_name" class="form-label" required>Special Category Name</label>
                <input name="special_name" value="${special.special_name}" type="text" class="form-control" id="name" aria-describedby="special name" required>
                <div class="inputError">${getError(error, 'special_name')}</div>
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/special'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `})
}