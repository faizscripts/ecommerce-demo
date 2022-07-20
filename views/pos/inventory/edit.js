const layout = require('../layout');
const title = 'Edit Inventory';

module.exports = ({product}) => {
    const today2 = new Date()
    const today = today2.toLocaleDateString('en-CA')

    function printHistoryRow(product) {
            if (product.quantityHistory.length>1){
                return product.quantityHistory.map(row => {
                    return `
        <tr>
                        <td class="border border-warning border-2" ><input type="date" class="form-control" name="existingDate" value="${row.historyDate.toLocaleDateString('en-CA')}" required></td>
                        <td class="border border-warning border-2" ><input type="text" class="form-control" name="existingQuantity" value="${row.quantity}" required></td>
                        <td class="border border-warning border-2" ><input type="text" class="form-control" name="existing_store_quantity" value="${row.store_quantity}" required></td>
                        <td class="border border-warning border-2" >        
                            <div  class="deleteForm d-flex justify-content-center">
                                <button type="button" class="formBtn">
                                <i class="far fa-trash-alt deleteInvRow"></i>
                                </button>
                            </div>
                        </td>
        </tr>  
                    `}).join('')
            } else if (product.quantityHistory.length===1){
            return `
        <tr>
                        <td class="border border-warning border-2" ><input type="date" class="form-control" name="existingDate" value="${product.quantityHistory[0].historyDate.toLocaleDateString('en-CA')}" required></td>
                        <td class="border border-warning border-2" ><input type="text" class="form-control" name="existingQuantity" value="${product.quantityHistory[0].quantity}" required></td>
                        <td class="border border-warning border-2" ><input type="text" class="form-control" name="existing_store_quantity" value="${product.quantityHistory[0].store_quantity}" required></td>
                        <td class="border border-warning border-2" >        
                            <div  class="deleteForm d-flex justify-content-center">
                                <button type="button" class="formBtn">
                                <i class="far fa-trash-alt deleteInvRow"></i>
                                </button>
                            </div>
                        </td>
        </tr>
        `
            }  else {
                return `
        <tr>
            <td class="border border-warning border-2" ><input type="date" class="form-control" name="existingDate" value="${today}" required></td>
            <td class="border border-warning border-2" ><input type="text" class="form-control" name="existingQuantity" value="${product.quantity}" required></td>
            <td class="border border-warning border-2" ><input type="text" class="form-control" name="existing_store_quantity" value="0" required></td>
            <td class="border border-warning border-2" >        
                <div  class="deleteForm d-flex justify-content-center">
                    <button type="button" class="formBtn">
                    <i class="far fa-trash-alt deleteInvRow"></i>
                    </button>
                </div>
            </td>
        </tr>
            `
            }
        }


    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Edit Inventory Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="mb-3 form-group">
                <label for="product_name" class="form-label" required>Product Name</label>
                <input name="product_name" type="text" class="form-control" id="product_name" aria-describedby="product_name" value="${product.product_name}" required>
            </div>
            <div class="mb-3 form-group">
                <label for="shop_price" class="form-label" required>Price</label>
                <input name="shop_price" type="number" class="form-control" id="shop_price" aria-describedby="shop_price" value="${product.shop_price}" required>
            </div>
            <div class="mb-3 form-group">
            <div class="d-flex justify-content-between mb-2">
                <label for="quantity" class="form-label" required>Quantity History</label>
                <div class="btn btn-sm btn-primary" id="newInvAddBtn">Add new</div>
            </div>
            <div class="d-flex my-2">
                <div class="rectangle border border-warning border-3"></div>
                <div class="text-muted ms-1 "> shows already existing records</div>
            </div>
            <div class="table-responsive">
            <table class="table table-hover table-bordered mt-2" id="newInvTable">
                <thead>
                <tr class="table-dark">
                    <th scope="col" >Date</th>
                    <th scope="col" >Shop Quantity</th>
                    <th scope="col" >Store Quantity</th>
                    <th scope="col" ></th>
                </tr>
                </thead>
                <tbody class="newInvTableBody"> 
                    ${printHistoryRow(product)}
                </tbody>
            </table> 
            </div>   
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/pos/inventory/edit/${product._id}">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/pos/inventory'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}