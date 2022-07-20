const layout = require('../layout');
const {displayDate} = require("../../../middlewares/otherFunctions");
const title = 'Inventory'

module.exports = ({products}) => {

    const renderedProducts = products.map(product => {
        return `
<tr class="product-row">
    <td class="product-name">${product.product_name}</td>
    <td >${product.shop_price}</td>
    <td >${product.quantity}</td>
    <td >${product.store_quantity}</td>
    <td>        
        <a href="/pos/inventory/view/${product._id}"><i class="fas fa-eye"></i></a>
        <a href="/pos/inventory/edit/${product._id}"><i class="far fa-edit"></i></a>
        <div  class="deleteForm ms-4">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${product._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div></td>
</tr>
           `;
    }).join('');

    const renderedDeleteModals = products.map(product => {
        return `
        <div class="modal fade" id="delete${product._id}" tabindex="-1" aria-labelledby="deleteProductModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>DELETE</b> ${product.product_name}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/pos/inventory/delete/${product._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
           `;
    }).join('');

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/pos/inventory/new'">Add New Inventory</button>
    </div>
    <div class="card-body table-responsive ">
        <table class="table table-hover table-bordered mt-2" id="inventoryIndexT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="invName">Product Name</th>
                <th scope="col" class="invOthers">Price</th>
                <th scope="col" class="invOthers">Shop Quantity</th>
                <th scope="col" class="invOthers">Store Quantity</th>
                <th scope="col" class="invAction">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${renderedProducts}
            </tbody>
        </table>
    </div>
</div>

${renderedDeleteModals}

`});
};