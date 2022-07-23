const layout = require('../layout');

module.exports = ({product}) => {

    function detailedPrice(price) {
        if (price){
            return price
        } else {
            return 0
        }
    }

    return layout({
        title: product.product_name,
        content: ` 
<div id="add-product" class="container card mt-3 mb-5">
    <div class="card-header">
        Product Information
    </div>
    <div class="card-body">
        <form method="POST" >
           <div class="my-2 form-group">
        <label for="product_name" class="form-label" required>Product Name</label>
        <input name="product_name" type="text" class="form-control product_name" aria-describedby="product_name" value="${product.product_name}" required>
    </div>
           <div class="row">
                <div class="col-md-6 mb-2 form-group">
                    <label for="bp" class="form-label">BP</label>
                    <input name="bp" type="number" class="form-control bp" aria-describedby="bp" min="0" step="any"  step="any" value="${detailedPrice(product.bp)}">
                </div>
                <div class="col-md-6 mb-2 form-group">
        <label for="rate" class="form-label">Rate</label>
        <input name="rate" type="number" class="form-control rate" aria-describedby="rate" min="0" step="any" value="${detailedPrice(product.rate)}">
    </div>
           </div>
           <div class="row">
                <div class="col-md-6 mb-2 form-group">
        <label for="shipping" class="form-label">Shipping Fee</label>
        <input name="shipping" type="number" class="form-control shipping" aria-describedby="shipping" min="0" step="any" value="${detailedPrice(product.shipping)}">
    </div>
                <div class="col-md-6 mb-2 form-group">
        <label for="buying" class="form-label" >Buying Price</label>
        <input name="buying" type="number" class="form-control buying" aria-describedby="buying" step="any" value="${detailedPrice(product.buying)}" readonly>
    </div>
            </div>
           <div class="row">
                <div class="col-md-6 mb-2 form-group">
        <label for="profitP" class="form-label">Profit %</label>
        <input name="profitP" type="number" class="form-control profitP" aria-describedby="profitP" min="0" step="any" value="${detailedPrice(product.profitP)}">
    </div>
                <div class="col-md-6 mb-2 form-group">
        <label for="selling" class="form-label">Selling Price</label>
        <input name="selling" type="number" class="form-control selling" aria-describedby="selling" step="any" value="${detailedPrice(product.selling)}" readonly>
    </div>
            </div>
           <div class="row">
                 <div class="col-md-6 mb-2 form-group">
        <label for="shop_price" class="form-label">Wholesale Price</label>
        <input name="shop_price" type="number" class="form-control shop_price" aria-describedby="shop_price" step="any" value="${detailedPrice(product.shop_price)}">
    </div>
                 <div class="col-md-6 mb-2 form-group">
        <label for="price" class="form-label">Site Price</label>
        <input name="price" type="number" class="form-control price" aria-describedby="price" step="any" value="${detailedPrice(product.price)}">
    </div>
            </div>
           <input type="hidden" name="id" value="${product._id}">
           <div class="my-3 d-flex justify-content-evenly">
        <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/detailed/">SAVE</button>
        <a class="btn btn-secondary save" href="/admin/detailed/">CANCEL</a>
    </div>
       </form>  
    </div>
</div>
        `});
};