const layout = require('../layout');
const title = 'Edit Product'
const {getInput, getError} = require('../../../middlewares/otherFunctions')

module.exports = ({product, error, categories, brands, specials}) => {
    const renderedCategories = categories.map(category => {
        if (product.categoryID) {
            if (product.categoryID.toString() === category._id.toString()) {
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

    const renderedBrands = brands.map(brand => {

            if (brand.subBrands.length > 0) {
                brand.subBrands.sort((a, b) => a.subBrandName.localeCompare(b.subBrandName))
                let subBrands = brand.subBrands.map(subBrand => {
                    if (product.subBrandID) {
                        if (product.subBrandID.toString() === subBrand._id.toString()) {
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
                if (product.brandID) {
                    if (product.brandID.toString() === brand._id.toString()) {
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

    const renderedSpecials = specials.map(special => {
        if (product.specialID) {
            if (product.specialID.toString() === special._id.toString()) {
                return `
                   <option value="${special._id}" selected>${special.special_name}</option> 
                `
            } else {
                return `
                <option value="${special._id}">${special.special_name}</option>
            `
            }
        }else {
            return `
                <option value="${special._id}">${special.special_name}</option>
            `
        }
        }).join('');

    function checkDescription(content) {
        if (content) {
            return `${content.description}`
        } else return null;
    }

    function checkinBox(content) {
        if (content) {
            return `${content.inBox}`
        } else return null;
    }

    function printImages(imagesArray) {
        if (imagesArray.length > 0){
            let imageString = `
                <div class="col-2 card imageCard">
                            <img src="/img/products/${product.product_images[0].filename}" class="imgCol">
                        <input type="text" value="${product.product_images[0].filename}" name="existingImages" class="d-none">
                        <div class="card-body d-flex justify-content-between">
                            <div>Main</div>
                            <div>
                                <label for="image1"><i class="far fa-edit"></i></label>
                                <input type="file" id="image1" name="image1" accept="image/*" hidden>

                                <i class="fas fa-plus addImage"></i>
                            </div>
                        </div>
                </div>
            `
            for (let i=1; i<imagesArray.length; i++){
                 imageString += `
                <div class="col-2 card imageCard">
                <img src="/img/products/${product.product_images[i].filename}" class="imgCol">
                <input type="text" value="${product.product_images[i].filename}" name="existingImages" class="d-none">
                <div class="card-body ">
                    <div class="d-flex justify-content-end">
<!--                        <label for="image${i+1}"><i class="far fa-edit"></i></label>-->
<!--                        <input type="file" id="image${i+1}" name="image${i+1}" accept="image/*" hidden>-->
                        <i class="far fa-trash-alt mx-2" style="color: red"></i>
                        <i class="fas fa-plus addImage"></i>
                    </div>
                </div>
                </div>
                `
            }
            return imageString
        } else {
            return `
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
            `
        }
    }

    function visibility(status) {
        if (status){
            return `
            <input type="checkbox" name="status" class="visibilitySwitch" value="status" checked>
            <span class="slider round"></span>
          `
        } else {
            return `
            <input type="checkbox" name="status" class="visibilitySwitch" value="status">
            <span class="slider round"></span>
          `
        }
    }

    function loopOptions(product) {
        return product.optionItems.map(option => {
            return `
            <li class="d-flex justify-content-evenly">
                <input type="text" class="form-control mb-2 optionItem border border-warning" name="existingOptions" value="${option}" required>
                <i class="fas fa-trash-alt optionDelete"></i>
            </li>
        `
        }).join('');
    }

    function printProductOptions(product) {
        if (product.optionItems !== undefined) {
            if (product.optionItems.length>0){
                return `                
                <select class="form-select mb-1" aria-label="Select Option" id="pOption" name="pOption">
                    <option value="false">Not applicable</option>
                    <option value="true" selected>Present</option>
                </select>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary optionBtn mt-1">Add option</button>
                </div>
                <ul class="optionsList">
                    <div class="d-flex my-2">
                        <div class="rectangle border border-warning"></div>
                        <div class="text-muted ms-1 "> shows already existing options</div>
                    </div>
                    ${loopOptions(product)}
                </ul>`
            } else {
                return `                
                <select class="form-select mb-1" aria-label="Select Option" id="pOption" name="pOption">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary optionBtn mt-1" disabled>Add option</button>
                </div>
                <ul class="optionsList"></ul>`
            }
        } else{
            return `                
                <select class="form-select mb-1" aria-label="Select Option" id="pOption" name="pOption">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary optionBtn mt-1" disabled>Add option</button>
                </div>
                <ul class="optionsList"></ul>`
        }
    }



    return layout({
        title: title,
        content: `
<div id="add-product" class="container card mt-3 mb-5">
    <div class="card-header">
        Product Information
    </div>
    <div class="card-body">
        <form id="editProductsForm" method="POST" enctype="multipart/form-data">
        
            <div class="mb-3 form-group">
                <label for="product_name" class="form-label">Product Name</label>
                <input name="product_name" value="${product.product_name}" type="text" class="form-control" id="product_name"
                       aria-describedby="product name">
                <div class="form-text">use this format (brand: product name : for device - colour) e.g Nillkin frosted shield for iPhone 12 - Black</div>
                <div class="inputError">${getError(error, 'product_name')}</div>
            </div>

            <div class="row mb-4">
                <div class="mb-3 col-md-4 form-group ">
                    <label for="category" class="form-label" required>Category</label>
                    <select class="form-select" aria-label="Select Category" id="category" name="categoryID"
                            required>
                        <option value="">-Select a category-</option>
                        ${renderedCategories}
                    </select>
                    <div class="form-text">quickly type the name to select</div>
                </div>

                <div class="mb-3 col-md-4 form-group ">
                    <label for="brand" class="form-label" required>Brand</label>
                    <select class="form-select" aria-label="Select Brand" id="brand" name="brandID" required>
                        <option value="">-Select a brand or a sub brand-</option>
                        ${renderedBrands}
                    </select>
                    <div class="form-text">quickly type the name to select</div>
                </div>

                <div class="mb-3 col-md-4 form-group ">
                    <label for="special" class="form-label" required>Special Category</label>
                    <select class="form-select" aria-label="Special Category" id="special" name="specialID"
                            required>
                        <option value="">-Select a special category-</option>
                        ${renderedSpecials}
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

                <div class="descriptionCopy d-none">${checkDescription(product)}</div>

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

                <div class="inBoxCopy d-none">${checkinBox(product)}</div>
            </div>

            <div class="mb-4 table-responsive">
                <div class="subHeading">PRICING</div>
                <table class="table table-bordered mt-3" id="addProductT">
                    <thead>
                    <tr class="table-primary">
                        <th scope="col" required>Quantity</th>
                        <th scope="col" required>Shop Price (ksh)</th>
                        <th scope="col" required>Price (ksh)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input type="number" name="quantity" min="1" value="${getInput(product, 'quantity')}" required>
                            <div class="inputError">${getError(error, 'quantity')}</div>
                        </td>
                        <td>
                            <input type="number" name="shop_price" min="1" value="${getInput(product, 'shop_price')}" required>
                            <div class="inputError">${getError(error, 'shop_price')}</div>
                        </td>
                        <td>
                            <input type="number" name="price" min="1" value="${getInput(product, 'price')}" required>
                            <div class="inputError">${getError(error, 'price')}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="mb-4">
                <div class="subHeading">IMAGES</div>
                <div class="form-text" style="color: red; font-size:1rem">Deleting an image will delete all images
                    except the main image. Refresh the page to undo the deletion
                </div>
                <div class="row editImgRow">
                    <input class="imagesLength d-none" value="${product.product_images.length}">
                    ${printImages(product.product_images)}
                </div>
            </div>
            
           <div class="mb-3 form-group">
                <label for="pOption" class="form-label">Product options</label>
                ${printProductOptions(product)}
            </div>

            <div class="my-3 d-md-flex justify-content-evenly">
                <div>
                    <span id="visibility" class="mt-3">Visibility</span>
                    <label class="switch"> 
                        ${visibility(product.status)}
                    </label>
                </div>
                <button class="btn btn-success save" type="submit" formaction="/admin/products/edit/${product.id}">SAVE</button>
                <button class="btn btn-warning save" type="submit" formaction="/admin/products/edit/copy/${product.id}">SAVE AND CREATE NEW COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/products/cancel'">CANCEL</a>
            </div>
        </form>
    </div>
</div>

        `});
};