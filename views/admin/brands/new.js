const layout = require('../layout');
const title = 'Add Brand';
const {getInput, getError} = require('../../../middlewares/otherFunctions');

module.exports = ({input, error, categories}) => {
    const renderedCategories = categories.map(category => {
        return `
                <option value="${category._id}">${category.category_name}</option>
            `
    }).join('');

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Brand Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="mb-3 form-group">
                <label for="brand_name" class="form-label" required>Brand Name</label>
                <input name="brand_name" type="text" class="form-control" id="brand_name" aria-describedby="brand_name" value="${getInput(input, 'brand_name')}" required>
                <div class="inputError">${getError(error, 'brand_name')}</div>
            </div>
            <div class="mb-3 form-group brand-category">
                    <label for="category" class="form-label" >Category</label>
                    <div class="form-text mb-1" style="color: red">Select a category if the brand does NOT have sub brand(s). If it has sub brand(s) don't select anything</div>
                    <select class="form-select brand-category-select" aria-label="Select Category" id="category" name="brandCategoryID" >
                        <option value="">-Select a category-</option>
                        <option class="d-none none" value="none">None</option>
                        ${renderedCategories}
                        </select>
                </div>
            <div class="mb-3 form-group">
                <label for="sub-brand" class="form-label">Sub Brand</label>
                <select class="form-select" aria-label="Select Category" id="subBrand" name="subBrand">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary subBrandBtn" disabled>Add sub-brand</button>
                </div>
                <ul class="subBrandsList"></ul>
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/brands">SAVE</button>
                <button class="btn btn-warning save" type="submit" value="submit" formaction="/admin/brands/copy">SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/brands'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}