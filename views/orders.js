const {displayDate, printWishlistModal, printCartModal, printProducts, printPaymentMethod, printStatusBtn} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Orders'

module.exports = function ({req, orders, wishlist, cart, categories}) {
    function printOption(order) {
        if (order.option){
            return `Option:&nbsp;${order.option}`
        } else return ''
    }

    const renderedOrders = orders.map(
        order => {

            return `
               <tr>
                    <td>${displayDate(order.orderDate)}</td>
                    <td>
                        <ul class="orderItems">
                            <span class="orderID">Order ID: ${order._id}</span>
                            ${printProducts(order.products)}
                            ${printOption(order)}
                        </ul>
                    </td>
                    <td>${order.total + order.delivery_fee}</td>
                    <td>${printPaymentMethod(order)}</td>
                    ${printStatusBtn(order)}
                </tr>
            `}
    ).join('');

    return layout({
        title: title,
        req: req,
        categories,
        content: `


<section class="register">
    <div class="card mt-4" id="order">
        <div class="card-header">
            Orders
        </div>
        <div class="card-body table-responsive">
            <table class="table table-striped table-bordered">
                <thead >
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col" class="itemsTh">Item Name(s)</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment</th>
                    <th scope="col" class="status text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                ${renderedOrders}
                </tbody>
            </table>
        </div>
    </div>
</section>


${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)}

      
        `})
}

