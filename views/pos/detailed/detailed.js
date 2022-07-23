const layout = require('../layout');
const title = 'Detailed Price List'

module.exports = ({products}) => {

    const renderedProducts = products.map(product => {
        if (product.shop_price< product.selling){
            return `
<tr class="product-row" style="color: red">
    <td class="product-name detailedCell">${product.product_name}</td>
    <td class="detailedCell">${printPrice(product.bp) }</td>
    <td class="detailedCell">${printPrice(product.rate) }</td>
    <td class="detailedCell">${printPrice(product.shipping) }</td>
    <td class="detailedCell">${printPrice(product.buying) }</td>
    <td class="detailedCell">${printPrice(product.profitP) }</td>
    <td class="detailedCell">${printPrice(product.selling) }</td>
    <td class="detailedCell">${printPrice(product.shop_price)}</td>
    <td class="detailedCell">${printPrice(product.price)}</td>
    <td>
    <a href="/admin/detailed/edit/${product._id}"><i class="far fa-edit"></i></a>
        <div  class="deleteForm det">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${product._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
    </td>
</tr>
           `;
        } else {
            return `
<tr class="product-row">
    <td class="product-name detailedCell">${product.product_name}</td>
    <td class="detailedCell">${printPrice(product.bp) }</td>
    <td class="detailedCell">${printPrice(product.rate) }</td>
    <td class="detailedCell">${printPrice(product.shipping) }</td>
    <td class="detailedCell">${printPrice(product.buying) }</td>
    <td class="detailedCell">${printPrice(product.profitP) }</td>
    <td class="detailedCell">${printPrice(product.selling) }</td>
    <td class="detailedCell">${printPrice(product.shop_price)}</td>
    <td class="detailedCell">${printPrice(product.price)}</td>
    <td>  
    <a href="/admin/detailed/edit/${product._id}"><i class="far fa-edit"></i></a>      
        <div  class="deleteForm det">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${product._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
    </td>
</tr>
           `;
        }

    }).join('');

    function printPrice(price) {
        if (price){
            return `${price}`
        } else {
            return `-`
        }
    }

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
                        <button class="btn btn-danger" type="submit" formaction="/admin/detailed/delete/${product._id}">Confirm</button>
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
        <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/detailed/new'">Add Product (Price Only)</button>
    </div>
    <div class="card-body table-responsive ">
        <table class="table table-hover table-bordered mt-2" id="priceListT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="detailedName">Product Name</th>
                <th scope="col" class="detailedCol">BP</th>
                <th scope="col" class="detailedCol">Rate</th>
                <th scope="col" class="detailedCol">Ship</th>
                <th scope="col" class="detailedCol">Buy </th>
                <th scope="col" class="detailedCol">Profit </th>
                <th scope="col" class="detailedCol">Sell </th>
                <th scope="col" class="detailedCol">W/Sale </th>
                <th scope="col" class="detailedCol">Site </th>
                <th scope="col" class="detailedDelete"></th>
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
}