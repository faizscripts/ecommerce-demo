const layout = require('../layout');
const title = 'Add New Inventory';

module.exports = () => {
    const today2 = new Date()
    const today = today2.toLocaleDateString('en-CA')

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        New Inventory Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="mb-3 form-group">
                <label for="product_name" class="form-label" required>Product Name</label>
                <input name="product_name" type="text" class="form-control" id="product_name" aria-describedby="product_name" required>
            </div>
            <div class="mb-3 form-group">
                <label for="shop_price" class="form-label" required>Price</label>
                <input name="shop_price" type="number" class="form-control" id="shop_price" aria-describedby="shop_price" required>
            </div>
            <div class="mb-3 form-group">
            <div class="d-flex justify-content-between mb-2">
                <label for="quantity" class="form-label" required>Quantity History</label>
                <div class="btn btn-sm btn-primary" id="newInvAddBtn">Add new</div>
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
                    <tr>
                        <td><input type="date" class="form-control" name="date" value="${today}" required></td>
                        <td><input type="text" class="form-control" name="quantity" required></td>
                        <td><input type="text" class="form-control" name="store_quantity" required></td>
                        <td>        
                            <div  class="deleteForm d-flex justify-content-center">
                                <button type="button" class="formBtn">
                                <i class="far fa-trash-alt deleteInvRow"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> 
            </div>   
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/pos/inventory/new">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/pos/inventory'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}