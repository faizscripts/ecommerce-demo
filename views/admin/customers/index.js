const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Customers';

module.exports = ({customers}) => {
    const renderedCustomers = customers.map(
        customer => {
            return `
<tr>
    <td>${displayDate(customer.dateCreated)}</td>
    <td>${customer.full_name}</td>
    <td><a href="mailto:${customer.email}"> ${customer.email}</a></td>
    <td><a href="tel:0${customer.phone}">0${customer.phone}</a></td>
    <td><a href="https://www.google.com/maps/dir/?api=1&origin=${process.env.SHOP_LATITUDE}%2C${process.env.SHOP_LONGITUDE}&destination=${customer.latitude}%2C${customer.longitude}&travelmode=driving" target="_blank">My address</a></td>
    <td>${customer.income_gen}</td>
    <td>${customer.order_count}</td>
</tr>
            `}).join('')

    return layout({
        title: title,
        content: `
        <div id="viewProducts" class="card ">
    <div class="card-body table-responsive">
        <table class="table table-hover table-bordered" id="customersT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader customerName">Name</th>
                <th scope="col" class="tableHeader">Email</th>
                <th scope="col" class="tableHeader">Phone</th>
                <th scope="col" class="tableHeader">Address</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Order Count</th>
            </tr>
            </thead>
            <tbody>
            ${renderedCustomers}
            </tbody>
        </table>
    </div>
</div>
        `})
}
