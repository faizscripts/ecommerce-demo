const layout = require('../layout');
const title = 'Edit Brand';
const {getInput, getError} = require('../../../middlewares/otherFunctions');

module.exports = ({brand, error, categories}) => {
    function checkBrandCategory() {
        if (brand.subBrands.length>0){
            return `
                <div class="mb-3 form-group brand-category d-none">
                    <label for="category" class="form-label" >Category</label>
                    <div class="form-text mb-1" style="color: red">Select a category if the brand does NOT have sub brand(s). If it has sub brand(s) don't select anything</div>
                    <select class="form-select brand-category-select" aria-label="Select Category" id="category" name="brandCategoryID" >
                        <option value="">-Select a category-</option>
                        <option class="d-none none" value="none" selected>None</option>
                        ${renderedCategories}
                    </select>
                </div>
            `} else {
            return `
                <div class="mb-3 form-group brand-category">
                    <label for="category" class="form-label" >Category</label>
                    <div class="form-text mb-1" style="color: red">Select a category if the brand does NOT have sub brand(s). If it has sub brand(s) don't select anything</div>
                    <select class="form-select brand-category-select" aria-label="Select Category" id="category" name="brandCategoryID" >
                        <option value="">-Select a category-</option>
                        <option class="d-none none" value="none">None</option>
                            ${renderedCategoriesSelected(brand.brandCategoryID, categories)}
                        </select>
                </div>
            `}
    }

    const renderedCategories = categories.map(category => {
        return `
                <option value="${category._id}">${category.category_name}</option>
            `
    }).join('');

    function renderedCategoriesSelected(categoryID, categories) {
        return categories.map(category => {
            if (categoryID.toString() === category._id.toString()){
                return `<option value="${category._id}" selected>${category.category_name}</option>`
            } else {
                return `<option value="${category._id}">${category.category_name}</option>`
            }
        }).join('');
    }

    function subBrand(brand) {
        if (brand.subBrands.length>0){
            return ` 
                <select class="form-select" aria-label="Select Category" id="subBrand" name="subBrand">
                    <option value="false">Not applicable</option>
                    <option value="true" selected>Present</option>
                </select>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary subBrandBtn">Add sub-brand</button>
                </div>
                <ul class="subBrandsList">
                    <div class="d-flex my-2">
                        <div class="rectangle border border-warning"></div>
                        <div class="text-muted ms-1 "> shows already existing sub brands</div>
                    </div>
                    ${loopSubBrands(brand)}
                </ul>
        `
        } else {
            return `
                <select class="form-select" aria-label="Select Category" id="subBrand" name="subBrand">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary subBrandBtn" disabled>Add sub-brand</button>
                </div>
                <ul class="subBrandsList"></ul>
        `
        }
    }

    function loopSubBrands(brand) {
        return brand.subBrands.map(subBrand => {
            return `
            <li class="d-flex justify-content-evenly">
                <input type="text" class="form-control mb-2 subBrandItem border border-warning" name="${subBrand._id}" value="${subBrand.subBrandName}" required>
                <select class="form-select subBrandItem " aria-label="Select Category" id="brand-category-input" name="existingSubBrandCategoryID" required>
                    <option value="">-Select a category-</option>
                    ${renderedCategoriesSelected(subBrand.subBrandCategoryID, categories)}
            </select>
                <i class="fas fa-trash-alt subBrandDelete"></i>
            </li>
        `
        }).join('');
    }

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Brand Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/brands/edit/${brand.id}">
            <div class="mb-3 form-group">
                <label for="name" class="form-label" required>Brand Name</label>
                <input name="brand_name" type="text" class="form-control" id="brand_name" aria-describedby="brand_name" value="${getInput(brand, 'brand_name')}" required>
                <div class="inputError">${getError(error, 'brand_name')}</div>
            </div>
            ${checkBrandCategory()}
            <div class="mb-3 form-group">
                <label for="sub-brand" class="form-label">Sub Brand</label>
                ${subBrand(brand)}
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/brands'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `})
}