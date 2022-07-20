const layout = require('../layout');
const {displayDate, printCOD} = require('../../../middlewares/otherFunctions')
const title = 'View Full History';

module.exports = ({credit}) => {

    function printExistingProducts(products) {
        let productString = ''
        let row = ''
        products.forEach(product => {
            if (product.cod === 'CREDIT'){
                row = `
                <tr class="creditRow">
                        <td><span class="dateSorta">${product.creditDate.toISOString()}</span>${displayDate(product.creditDate)}</td>
                        <td>Credit</td>
                        <td class="historyItem">${product.item}</td>
                        <td>${product.quantity}</td>
                        <td>${product.unitPrice}</td>
                        <td>${product.total}</td>    
                </tr>        
            `} else if (product.cod === 'DEBIT'){
                row = `
                <tr class="debitRow">
                        <td><span class="dateSorta">${product.creditDate.toISOString()}</span>${displayDate(product.creditDate)}</td>
                        <td>Debit</td>
                        <td class="historyItem">${product.item}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${product.total}</td>    
                </tr>        
            `}
            productString += row
        })
        return productString
    }

    return layout({
        title: credit.debtor,
        content: `
<div id="viewProducts" class="card ">
    <p class="accTotal">TOTAL: ${printCOD(credit.amount)}</p>
    <div class="card-body table-responsive ">
    <table class="table table-bordered mt-2 fullHistoryTable">
                            <thead>
                            <tr class="table-dark">
                                <th scope="col" class="modalColSmall">Date</th>
                                <th scope="col" class="modalColSmall">Type</th>
                                <th scope="col" class="modalColBig">Products & Payments</th>
                                <th scope="col" class="modalColSmall">Quantity</th>
                                <th scope="col" class="modalColSmall">Unit Price</th>
                                <th scope="col" class="modalColSmall">Amount</th>
                                
                            </tr>
                            </thead>
                            <tbody> 
                                ${printExistingProducts(credit.products)}
                            </tbody>
                        </table> 
    
    <div class="d-flex justify-content-center">
        <a class="btn btn-secondary save" onclick="location.href='/pos/credit'">CANCEL</a>
</div>   
                        
`})
}