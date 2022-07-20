const { printOrdersNew, displayDate, orderDeleteModals } = require('../../middlewares/otherFunctions')
const layout = require('./layout');
const title = 'Dashboard';

module.exports = ({orders, income, unitsSold, totalProducts, totalCustomers, best, worst, allOrders, totalOrders, customers}) => {

    function printPerformer(products) {
        return products.map(
            product => {
                return `
                    <tr>
                        <td class="performerProduct">${product._id}</td>
                        <td class="performerProduct">${product.product_name}</td>
                        <td>${displayDate(product.dateCreated)}</td>
                        <td>${product.shop_price}</td>
                        <td>${product.price}</td>
                        <td>${product.income}</td>
                        <td>${product.unitsSold}</td>
                        <td>${product.quantity}</td>
                    </tr>                
                `}
        ).join('')
    }

    function incomePercentage(orders) {
        if (orders.length>0){
            let today = new Date();
            let sum =0;
            let sum2 =0;
            let lw;
            let lwb1;

            let special = today.setHours(0,0,0)
            let special2 = new Date(special)
            let special3 = displayDate(special2)
            if (displayDate(orders[0].orderDate) === special3){
                sum += (orders[0].total - orders[0].shopTotal)
            }

            for (let i=0; i<=6; i++){
                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)


                orders.forEach(order => {
                    let reformat = displayDate(order.orderDate)
                    if (reformat === dayReformat5){
                        sum += (order.total - order.shopTotal)
                    }
                })
            }

            lw = sum

            for (let i=0; i<=6; i++){
                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)


                orders.forEach(order => {
                    let reformat = displayDate(order.orderDate)

                    if (reformat === dayReformat5){
                        sum2 += (order.total - order.shopTotal)
                    }
                })
            }

            lwb1 = sum2

            if (lw+lwb1 === 0){
                return 0
            } else {
                let total = ((lw - lwb1)*100)/(lw+lwb1)
                return Math.round(total)
            }

        } else {
            return 0
        }
    }

    function ordersPercentage(orders) {
        if (orders.length>0){
            let today = new Date();
            let count =0;
            let count2 =0;
            let lw;
            let lwb1;

            let special = today.setHours(0,0,0)
            let special2 = new Date(special)
            let special3 = displayDate(special2)
            if (displayDate(orders[0].orderDate) === special3){
                count++
            }

            for (let i=0; i<=6; i++){

                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)


                orders.forEach(order => {
                    let reformat = displayDate(order.orderDate)

                    if (reformat === dayReformat5){
                        count++
                    }
                })


            }
            lw = count

            for (let i=0; i<=6; i++){
                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)



                orders.forEach(order => {
                    let reformat = displayDate(order.orderDate)

                    if (reformat === dayReformat5){
                        count2++
                    }
                })
            }

            lwb1 = count2

            if (lw+lwb1 === 0){
                return 0
            } else {
                let total = ((lw - lwb1)*100)/(lw+lwb1)
                return Math.round(total)
            }

        } else {
            return 0
        }
    }

    function customersPercentage(customers) {
        if (customers.length>0){
            let today = new Date();
            let count =0;
            let count2 =0;
            let lw;
            let lwb1;

            let special = today.setHours(0,0,0)
            let special2 = new Date(special)
            let special3 = displayDate(special2)
            if (displayDate(customers[0].dateCreated) === special3){
                count++
            }

            for (let i=0; i<=6; i++){

                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)


                customers.forEach(customer => {
                    let reformat = displayDate(customer.dateCreated)

                    if (reformat === dayReformat5){
                        count++
                    }
                })


            }
            lw = count

            for (let i=0; i<=6; i++){
                let dayReformat =  today.setDate(today.getDate()-1);
                let dayReformat2 = new Date(dayReformat)
                let dayReformat3 = dayReformat2.setHours(0,0,0)
                let dayReformat4 = new Date(dayReformat3)
                let dayReformat5 = displayDate(dayReformat4)



                customers.forEach(customer => {
                    let reformat = displayDate(customer.dateCreated)

                    if (reformat === dayReformat5){
                        count2++
                    }
                })
            }

            lwb1 = count2

            if (lw+lwb1 === 0){
                return 0
            } else {
                let total = ((lw - lwb1)*100)/(lw+lwb1)
                return Math.round(total)
            }

        } else {
            return 0
        }

    }

    function printStatCard(total, percentage) {
        if (percentage>0){
            return `
                <div class="firstRow">
                    <div class="statNum">${total}</div>
                    <i class="fas fa-arrow-up profit"></i>
                </div>
                <p class="percentage profit">+${percentage}% <span>(last 7 days)</span></p>
            `
        } else if (percentage === 0){
            return `
                <div class="firstRow">
                    <div class="statNum">${total}</div>
                    <i class="fas fa-minus"></i>
                </div>
                <p class="percentage">${percentage}% <span>(last 7 days)</span></p>           
            `
        } else if (percentage<0){
            return `
                <div class="firstRow">
                     <div class="statNum">${total}</div>
                          <i class="fas fa-arrow-down loss"></i>
                     </div>
                <p class="percentage loss">${percentage}% <span>(last 7 days)</span></p>
            `
        }
        else {
            return `
                <div class="firstRow">
                    <div class="statNum">${total}</div>
<!--                    <i class="fas fa-minus"></i>-->
                </div>
                <p class="percentage">Error</p>           
            `
        }
    }

    return layout({
        title: title,
        content: `
        <!--New Orders-->
        <div class="card order">
            <div class="card-header text-center">
                New Orders
            </div>
            <div class="card-body table-responsive">
                <table class="table table-hover table-bordered " id="dashorders">
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
                        ${printOrdersNew(orders)}
                        ${orderDeleteModals(orders)}
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    <a href="/admin/orders/" class="mb-2" style="text-decoration: none">view all orders</a>
                </div>
            </div>
        </div>

        <!--        Stats-->
        <div id="stats">
            <div class="row">
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Monthly Income</h5>
                        <div class="card-text">
                            ${printStatCard(income, incomePercentage(allOrders))}
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Monthly Orders</h5>
                        <div class="card-text">
                            ${printStatCard(totalOrders, ordersPercentage(allOrders))}
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Total Customers</h5>
                        <div class="card-text">
                            ${printStatCard(totalCustomers, customersPercentage(customers))}
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Total Units Sold</h5>
                        <div class="card-text">
                            <div class="d-flex justify-content-end">
                                <div class="statNum">${unitsSold}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Total Products</h5>
                        <div class="card-text">
                            <div class="d-flex justify-content-end">
                                <div class="statNum">${totalProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--        Best performers-->
        <div class="card order">
            <div class="card-header text-center">
                Best Performers
            </div>
            <div class="card-body table-responsive">
                <table class="table table-hover table-bordered performer" id="bestp">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col" class="performerHeading">Product ID</th>
                        <th scope="col" class="performerName">Name</th>
                        <th scope="col" class="performerHeading">Created on</th>
                        <th scope="col" class="performerHeading">Shop Price</th>
                        <th scope="col" class="performerHeading">Price</th>
                        <th scope="col" class="performerHeading">Income</th>
                        <th scope="col" class="performerHeading">Units Sold</th>
                        <th scope="col" class="performerHeading">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${printPerformer(best)}
                    </tbody>
                </table>               
            </div>
        </div>

        <!--        Worst performers-->
        <div class="card order">
            <div class="card-header text-center">
                Worst Performers
            </div>
            <div class="card-body table-responsive">
                <table class="table table-hover table-bordered performer" id="worstp">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col" class="performerID">Product ID</th>
                        <th scope="col" class="performerName">Name</th>
                        <th scope="col" class="performerHeading">Created on</th>
                        <th scope="col" class="performerHeading">Shop Price</th>
                        <th scope="col" class="performerHeading">Price</th>
                        <th scope="col" class="performerHeading">Income</th>
                        <th scope="col" class="performerHeading">Units Sold</th>
                        <th scope="col" class="performerHeading">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${printPerformer(worst)}
                    </tbody>
                </table>               
            </div>
        </div>
        `})
}