const layout = require('../layout');
const title = 'Add category';
const {getInput, getError}= require('../../../middlewares/otherFunctions');

module.exports = ({input, error}) => {
    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Category Information
    </div>
    <div class="card-body">
        <form method="POST" enctype="multipart/form-data">
            <div class="mb-3 form-group">
                <label for="category_name" class="form-label" required>Category Name</label>
                <input name="category_name" type="text" class="form-control" id="category_name" aria-describedby="category_name" value="${getInput(input, 'category_name')}" required>
                <div class="inputError">${getError(error, 'category_name')}</div>
            </div>
            <div class="mb-4">
                <div class="subHeadingCategory" >Cover Image</div class="subHeadingCategory">
                <div class="catRow">
                    <div class="card catImageCard">
                        <img src="" class="catImage">
                        <div class="card-body d-flex justify-content-end">
                            <div>
                                <label for="category"><i class="far fa-edit"></i></label>
                                <input type="file" id="category" name="category" accept="image/*" hidden>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit"  formaction="/admin/categories">SAVE</button>
                <button class="btn btn-warning save" type="submit"  formaction="/admin/categories/copy">SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/categories'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}