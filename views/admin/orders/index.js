const { printOrdersRecent, orderDeleteModals} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Orders'

module.exports = ({orders}) => {

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
        <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/orders/new'">Add New Order</button>
    </div> 
    <div class="card-body table-responsive">
        <table class="table table-hover table-bordered" id="orderViewT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="ordersHeading">Date</th>
                <th scope="col" class="ordersEmail">ID</th>
                <th scope="col" class="ordersHeading">Contacts</th>
                <th scope="col" class="ordersHeadingBig">Products & Notes</th>
                <th scope="col" class="ordersHeading">Amount</th>
                <th scope="col" class="ordersHeading">Payment</th>
                <th scope="col" class="ordersHeading">Status</th>
                <th scope="col" class="ordersHeading">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${printOrdersRecent(orders)}
            ${orderDeleteModals(orders)}
            </tbody>
        </table>
    </div>
</div>`})
}