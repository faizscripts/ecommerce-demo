const layout = require('../layout');
const {displayDate} = require("../../../middlewares/otherFunctions");
const title = 'View Quantity History';

module.exports = ({product}) => {

    function printHistoryRows(product) {
        if (product.quantityHistory.length>0){
            return product.quantityHistory.map(row => {
                return `
                    <tr>
                        <td><span class="dateSorta">${row.historyDate.toISOString()}</span>${displayDate(row.historyDate)}</td>
                        <td>${row.quantity}</td>
                        <td>${row.store_quantity}</td>
                    </tr>
            `
            }).join('')
        } else return `
            <tr>
                <td>-</td>
                <td>${product.quantity}</td>
                <td>${product.store_quantity}</td>
            </tr>
        `

    }

    return layout({
        title: product.product_name,
        content: `
<div id="viewProducts" class="card ">
    <div class="card-body table-responsive ">
    
    <table class="table table-hover table-bordered mt-2 fullHistoryTable">
        <thead>
        <tr class="table-dark">
            <th scope="col" >Date</th>
            <th scope="col" >Shop Quantity</th>
            <th scope="col" >Store Quantity</th>
        </tr>
        </thead>
        <tbody> 
            ${printHistoryRows(product)}
        </tbody>
    </table> 
    
    <div class="d-flex justify-content-center">
        <a class="btn btn-secondary save" onclick="location.href='/pos/inventory'">CANCEL</a>
</div>   
                        
`})
}