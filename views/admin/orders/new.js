const layout = require('../layout');
const title = 'New Order';

module.exports = ({products}) => {

    const renderedProducts = products.map(product => {
        return `
<tr class="product-row newOrderP">
    <td class="product-name">${product.product_name}</td>
    <td>${product.shop_price}</td>
    <td>${product.price}</td>
    <td>${product.price - product.shop_price}</td>
    <td>${product.unitsSold}</td>
    <td>${product.income}</td>
    <td>${product.quantity}</td>
</tr>
           `;
    }).join('');

    return layout({
        title: title,
        content: `<div id="add-product" class="container card my-5">
    <div class="card-header">
        Order Information
    </div>
    <div class="card-body">
        <form method="post" >
            <div class="row mb-4">
                <div class="mb-3 col-md-4 form-group">                    
                <label for="fullname" class="form-label" required>Name</label>
                <input name="fullname" type="fullname" class="form-control" id="fullname" aria-describedby="name" required>
            </div>
                <div class="mb-3 col-md-4 form-group">
                <label for="email" class="form-label" required>Email</label>
                <input name="email" type="text" class="form-control" id="email" aria-describedby="email" required>
            </div>
                <div class="mb-3 col-md-4 form-group">
                <label for="phone" class="form-label" required>Phone</label>
                <input name="phone" type="text" class="form-control" id="phone" aria-describedby="phone" required>
            </div>
            </div>
            <div>
            <label for="products" class="form-label" required>Products</label>
            <div id="viewProducts" class="m-0">
                <div class="card-body table-responsive ">
                     <table class="table table-hover table-bordered mt-2" id="newOrderPTable">
                        <thead>
                        <tr class="table-dark">
                            <th scope="col" class="product-name-heading">Product Name</th>
                            <th scope="col" class="product-others">Shop Price</th>
                            <th scope="col" class="product-others">Price</th>
                            <th scope="col" class="product-others">Profit</th>
                            <th scope="col" class="product-others">Units Sold</th>
                            <th scope="col" class="product-others">Income</th>
                            <th scope="col" class="product-others">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${renderedProducts}
                        </tbody>
                    </table>
                </div>
            </div>
            <label for="products" class="form-label">Selected products</label>
            <div id="viewProducts" class="m-0">
            <div class="card-body table-responsive ">
            <table class="table table-success table-striped">
                
            </table>
            </div>
            </div>
            
</div>
            
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" >SAVE</button>
                <button class="btn btn-warning save" type="submit" value="submit" >SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/orders'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}