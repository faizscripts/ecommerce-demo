const layout = require('../layout');
const title = 'Edit Category';
const {getError} = require('../../../middlewares/otherFunctions');

module.exports = ({category, error}) => {
    return layout({
        title: title,
        content: `
        <div id="add-product" class="container card my-5">
    <div class="card-header">
        Category Information
    </div>
    <div class="card-body">
        <form method="POST" enctype="multipart/form-data" action="/admin/categories/edit/${category.id}">
            <div class="mb-3 form-group">
                <label for="name" class="form-label" required>Category Name</label>
                <input name="category_name" value="${category.category_name}" type="text" class="form-control" id="name" aria-describedby="category name" required>
                <div class="inputError">${getError(error, 'category_name')}</div>
            </div>
            <div class="mb-4">
                <div class="subHeadingCategory" >Cover Image</div class="subHeadingCategory">
                <div class="catRow">
                    <div class="card catImageCard">
                        <img src="/img/products/${category.image}" class="catImage">
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
                <button class="btn btn-success save" type="submit" value="submit" >SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/categories'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `})
}