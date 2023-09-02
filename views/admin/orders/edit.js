const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'Edit Order';

module.exports = ({order}) => {

    function printStatus(order) {
        switch (order.orderStatus.toLowerCase()) {
            case "order placed":
                return `
                    <option value="Order placed" selected>Order placed</option>
                    <option value="In transit" >In transit</option>
                    <option value="Delivered" >Delivered</option>
                    <option value="Cancelled" >Cancelled</option>
                `

            case "in transit":
                return `
                    <option value="Order placed" >Order placed</option>
                    <option value="In transit" selected>In transit</option>
                    <option value="Delivered" >Delivered</option>
                    <option value="Cancelled" >Cancelled</option>
                `

            case "delivered":
                return `
                    <option value="Delivered" selected>Delivered</option>
                `

            case "cancelled":
                return `
                    <option value="Cancelled" selected>Cancelled</option>
                `
        }
    }

    function printProducts(order) {
        if (order.eEmail) {
                const renderedProducts = order.products.map(
                    product => {
                        return `
                <li class="d-lg-flex justify-content-evenly">
                    <input type="hidden" name="productID" value="${product.productID}" >
                    <input type="text" class="form-control mb-2 orderProductEdit " name="product_name" value="${product.product_name}" readonly>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderPriceEdit" name="price" value="${order.total}" readonly><span class="mt-2">X</span>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderQtyInputs" min="1" name="quantity" value="1" readonly> <span class="mt-2">=</span>  
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderSubtotalEdit"  readonly>    
                    <i class="fas fa-trash-alt orderProductDelete"></i>
                </li>                
        `
                    }
                ).join('')

                return `
            <div class="mb-2">
                <label for="email" class="form-label" >Products</label>
                <ul class="orderListEdit">
                    ${renderedProducts}
                    <li class="otEdit">products total: <span class="editOrderTotal">${order.total}</span></li>
                    <input type="hidden" name="orderOutput" class="orderOutput">
                </ul>
            </div>   
        `

            } else {

                const renderedProducts = order.products.map(
                    product => {
                        return `
                <li class="d-lg-flex justify-content-evenly">
                    <input type="hidden" name="productID" value="${product.productID}" >
                    <input type="text" class="form-control mb-2 orderProductEdit " name="product_name" value="${product.product_name}" readonly>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderPriceEdit" name="price" value="${product.price}" readonly><span class="mt-2">X</span>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderQtyInputs" min="1" name="quantity" value="${product.quantity}" readonly> <span class="mt-2">=</span>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderSubtotalEdit"  readonly>    
                </li>                
        `
                    }
                ).join('')

                return `
            <div class="mb-2">
                <label for="email" class="form-label" >Products</label>
                <ul class="orderListEdit">
                    ${renderedProducts}
                    <li class="otEdit">Total: <span class="editOrderTotal">${order.total}</span></li>
                    <input type="hidden" name="orderOutput" class="orderOutput">
                </ul>
            </div>   
        `
            }
    }

    function printName(order) {
        if (order.eName) {
            return order.eName
        } else return order.customerName
    }

    function printEmail(order) {
        if (order.ePhone) {
            return order.eEmail
        } else return order.customerEmail
    }

    function printPhone(order) {
        if (order.ePhone) {
            return order.ePhone
        } else return order.customerPhone
    }

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Order Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/orders/edit/${order.id}">
            <div class="row">
                <div class="mb-2 col-md-6 form-group">
                    <label for="orderID" class="form-label" >Order ID</label>
                    <input type="text" class="form-control" id="orderID" aria-describedby="name" value="${order._id}" disabled>
                </div>
                <div class="mb-2 col-md-6 form-group">
                    <label for="orderDate" class="form-label" >Order Date</label>
                    <input type="text" class="form-control" id="orderDate" aria-describedby="name" value="${displayDate(order.orderDate)} @ ${order.orderDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}" disabled>
                </div>
            </div>

            <div class="row">
                <div class="mb-2 col-md-4 form-group">
                    <label for="name" class="form-label" >Customer Name</label>
                    <input type="text" class="form-control" id="name" name="name" aria-describedby="name" value="${printName(order)}">
                </div>
                <div class="mb-2 col-md-4 form-group">
                    <label for="email" class="form-label" >Email Address</label>
                    <input type="email" class="form-control" name="email" id="email" value="${printEmail(order)}" >
                </div>
                <div class="mb-2 col-md-4 form-group">
                    <label for="phone" class="form-label" >Phone Number</label>
                    <input type="number" class="form-control" name="phone" id="phone" value="${printPhone(order)}" >
                </div>    
            </div>
            
            ${printProducts(order)}
            
            <div class="row">
                <div class="mb-2 col-md-6 form-group">
                    <label for="shopTotal" class="form-label" >Buying Price</label>
                    <input type="number" class="form-control" name="shopTotal" id="shopTotal" value="${order.shopTotal}" required readonly>
                </div>
            <div class="mb-2 col-md-6 form-group">
                    <label for="delivery_fee" class="form-label" >Delivery Fee</label>
                    <input type="number" class="form-control" name="delivery_fee" id="delivery_fee" aria-describedby="name" value="${order.delivery_fee}" required>
            </div>  
            </div>
            
            <div class="mb-2 form-group">
                <label for="orderNotes" class="form-label" >Order Notes</label>
                <textarea type="text" class="form-control" id="orderNotes" name="orderNotes" rows="4" >${order.orderNotes}</textarea>
            </div> 
            
            <div class="d-flex justify-content-evenly">
                <p class="otEdit"> order total: <span class="tdf"> ${order.total+ order.delivery_fee}</span></p>
                <input type="hidden" class="outputtdf" name="outputtdf" value="${order.total+ order.delivery_fee}">
                <p class="otEdit"> profit: <span class="income"> ${order.total - order.shopTotal}</span></p>
            </div> 
         
            <div class="my-3 form-group ">
                <label for="orderStatus" class="form-label" required>Order Status</label>
                <select class="form-select" aria-label="Select Category" id="orderStatus" name="orderStatus" required>
                    ${printStatus(order)}
                </select>
            </div>
                
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/orders/edit/${order.id}">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/orders'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `
    })
}
