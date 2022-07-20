const layout = require('../layout');
const title = 'Add Product';
const {getInput, getError} = require('../../../middlewares/otherFunctions')

module.exports = ({categories, brands, specials, input, error}) => {
    function printCategories() {
        if (categories.length>0){
            let renderedCategories
            if (input){
                renderedCategories = categories.map(category => {
                    if (input.categoryID) {
                        if (input.categoryID.toString() === category._id.toString()) {
                            return `
                <option value="${category._id}" selected>${category.category_name}</option>
            `
                        } else {
                            return `
                <option value="${category._id}">${category.category_name}</option>
            `
                        }
                    }else {
                        return `
                <option value="${category._id}">${category.category_name}</option>
            `
                    }
                }).join('');
            } else {
                renderedCategories = categories.map(category => {
                    return `
                <option value="${category._id}">${category.category_name}</option>
            `
                }).join('');
            }
            return renderedCategories
        } else return ""
    }

    function printBrands() {
        if (brands.length>0){
            let renderedBrands
            if (input){
                renderedBrands = brands.map(brand => {

                    if (brand.subBrands.length > 0) {
                        brand.subBrands.sort((a, b) => a.subBrandName.localeCompare(b.subBrandName))
                        let subBrands = brand.subBrands.map(subBrand => {
                            if (input.subBrandID) {
                                if (input.subBrandID.toString() === subBrand._id.toString()) {
                                    return `
                    <option class="subBrandOption" value="${brand._id}-${subBrand._id}" selected>${subBrand.subBrandName}</option>
                `
                                } else {
                                    return `
                    <option class="subBrandOption" value="${brand._id}-${subBrand._id}">${subBrand.subBrandName}</option>
                `
                                }
                            } else {
                                return `
                    <option class="subBrandOption" value="${brand._id}-${subBrand._id}">${subBrand.subBrandName}</option>
                `
                            }


                        }).join('')
                        return `
                <optgroup label="${brand.brand_name} &#9207;">
                ${subBrands}
                </optgroup>
            `
                    } else {
                        if (input.brandID) {
                            if (input.brandID.toString() === brand._id.toString()) {
                                return `
                <option class="noSubBrand" value="${brand._id}" selected>${brand.brand_name}</option>
            `
                            } else {
                                return `
                <option class="noSubBrand" value="${brand._id}">${brand.brand_name}</option>
            `
                            }
                        } else {
                            return `
                <option class="noSubBrand" value="${brand._id}">${brand.brand_name}</option>
            `
                        }
                    }

                }).join('');
            } else {
                renderedBrands = brands.map(brand => {
                    if (brand.subBrands.length > 0) {
                        brand.subBrands.sort((a,b) => a.subBrandName.localeCompare(b.subBrandName))
                        let subBrands = brand.subBrands.map(subBrand => {
                            return `
                    <option class="subBrandOption" value="${brand._id}-${subBrand._id}">${subBrand.subBrandName}</option>
                `
                        }).join('')
                        return `
                <optgroup label="${brand.brand_name} &#9207;">
                ${subBrands}
                </optgroup>
            `
                    } else {
                        return `
                <option class="noSubBrand" value="${brand._id}">${brand.brand_name}</option>
            `
                    }
                }).join('');
            }
            return renderedBrands
        } else return ""
    }

    function printSpecials() {
        if (specials.length>0){
            return specials.map(
                special => {
                    return `<option value="${special._id}" selected>${special.special_name}</option>`
                }
            )
        } else return ""
    }


    function checkDescription(content) {
        if (content){
            return `${content.description}`
        } else return null;
    }

    function checkinBox(content) {
        if (content){
            return `${content.inBox}`
        } else return null;
    }

    return layout({
        title: title,
        content: ` 
<div id="add-product" class="container card mt-3 mb-5">
    <div class="card-header">
        Product Information
    </div>
    <div class="card-body">
        <form id="addProductsForm" method="POST" enctype="multipart/form-data">
        
            <div class="mb-3 form-group">
                <label for="product_name" class="form-label" required>Product Name</label>
                <input name="product_name" type="text" class="form-control" id="product_name"
                       aria-describedby="product_name" value="${getInput(input, 'product_name')}" required>
                <div class="inputError">${getError(error, 'product_name')}</div>
            </div>

            <div class="row mb-4">
                <div class="mb-3 col-md-4 form-group ">
                    <label for="category" class="form-label" required>Category</label>
                    <select class="form-select" aria-label="Select Category" id="category" name="categoryID"
                            required>
                        <option value="">-Select a category-</option>
                        ${printCategories()}
                    </select>
                    <div class="form-text">quickly type the name to select</div>
                </div>
                <div class="mb-3 col-md-4 form-group ">
                    <label for="brand" class="form-label" required>Brand</label>
                    <select class="form-select" aria-label="Select Brand" id="brand" name="brandID" required>
                        <option value="">-Select a brand or a sub brand-</option>
                        ${printBrands()}
                    </select>
                    <div class="form-text">quickly type the name to select</div>
                </div>
                <div class="mb-3 col-md-4 form-group ">
                    <label for="special" class="form-label" required>Special Category</label>
                    <select class="form-select" aria-label="Special Category" id="special" name="specialID"
                            required> 
                        ${printSpecials()}
                    </select>
                </div>
            </div>

            <div class="mb-4 col form-group">

                <div class="d-md-flex">
                    <label for="description" class="form-label richTitle">Description</label>
                    <ul class="tool-list">
                        <li>
                            <button type="button" class="descriptionBtn ulButton" data-command="insertOrderedList">
                                <i class=' fas fa-list-ol'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="descriptionBtn ulButton"
                                    data-command="insertUnorderedList">
                                <i class=' fas fa-list-ul'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="descriptionBtn ulButton" data-command="bold">
                                <i class=' fas fa-bold'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="descriptionBtn ulButton" data-command="italic">
                                <i class=' fas fa-italic'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="descriptionBtn ulButton" data-command="underline">
                                <i class=' fas fa-underline'></i>
                            </button>
                        </li>
                    </ul>
                </div>

                <iframe name="descriptionFrame" class="ulList border form-control">
                </iframe>

                <input type="text" name="description" id="description" class="d-none">
                
                <div class="descriptionCopy d-none">${checkDescription(input)}</div>

            </div>

            <div class="mb-4 col form-group">
                <div class="d-md-flex">
                    <label for="inBox" class="form-label richTitle">What's in the box</label>
                    <ul class="tool-list">
                        <li>
                            <button type="button" class="inBoxBtn ulButton" data-command="insertOrderedList">
                                <i class=' fas fa-list-ol'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="inBoxBtn ulButton" data-command="insertUnorderedList">
                                <i class=' fas fa-list-ul'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="inBoxBtn ulButton" data-command="bold">
                                <i class=' fas fa-bold'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="inBoxBtn ulButton" data-command="italic">
                                <i class=' fas fa-italic'></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="inBoxBtn ulButton" data-command="underline">
                                <i class=' fas fa-underline'></i>
                            </button>
                        </li>
                    </ul>
                </div>

                <iframe name="inBoxFrame" class="ulList border form-control">
                </iframe>

                <input type="text" name="inBox" id="inBox" class="d-none">
                
                <div class="inBoxCopy d-none">${checkinBox(input)}</div>
            </div>

            <div class="mb-4 table-responsive">
                <div class="subHeading">PRICING</div>
                <table class="table table-bordered mt-3" id="addProductT">
                    <thead>
                    <tr class="table-primary">
                        <th scope="col" required>Quantity</th>
                        <th scope="col" required>Wholesale Price (ksh)</th>
                        <th scope="col" required>Price (ksh)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input type="number" name="quantity" min="1" value="${getInput(input, 'quantity')}" required>
                            <div class="inputError">${getError(error, 'quantity')}</div>
                        </td>
                        <td>
                            <input type="number" name="shop_price" min="1" value="${getInput(input, 'shop_price')}" required>
                            <div class="inputError">${getError(error, 'shop_price')}</div>
                        </td>
                        <td>
                            <input type="number" name="price" min="1" value="${getInput(input, 'price')}" required>
                            <div class="inputError">${getError(error, 'price')}</div>
                        </td>   
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="mb-4">
                <div class="subHeading">IMAGES</div>
                <div class="row imgRow">
                    <div class="col-2 card imageCard">
                        <img src="..." class="imgCol">
                        <div class="card-body d-flex justify-content-between">
                            <div>Main</div>
                            <div>
                                <label for="image1"><i class="far fa-edit"></i></label>
                                <input type="file" id="image1" name="image1" accept="image/*" hidden>

                                <i class="fas fa-plus addImage"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-3 form-group">
                <label for="pOption" class="form-label">Product Options</label>
                <select class="form-select mb-1" aria-label="Select Option" id="pOption" name="pOption">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary optionBtn mt-1" disabled>Add option</button>
                </div>
                <ul class="optionsList"></ul>
            </div>

            <div class="mb-4 d-md-flex justify-content-evenly">
                <div>
                    <span id="visibility" class="mt-3">Visibility</span>
                    <label class="switch">
                        <input type="checkbox" name="status" class="visibilitySwitch" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
                <button class="btn btn-success save" type="submit" formaction="/admin/products">SAVE</button>
                <button class="btn btn-warning save" type="submit" formaction="/admin/products/copy">SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/products'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `});
};