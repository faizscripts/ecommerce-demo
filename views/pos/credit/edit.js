const layout = require('../layout');
const title = 'Edit Customer';

module.exports = ({credit}) => {
    const today2 = new Date()

    function printExistingProducts(products) {
        let htmlString = ''
        let row = ''
        const sortedProducts = products.slice().sort((a, b) => b.creditDate - a.creditDate)
        sortedProducts.forEach(product => {
            if (product.cod === 'CREDIT'){
                row = `
                   <tr>
                    <td class="border border-warning border-2"><input type="date" name="existingDate" class="form-control" value="${product.creditDate.toLocaleDateString('en-CA')}" required></td>
                    <td class="border border-warning border-2"><input type="text" name="existingCod" class="form-control" value="CREDIT" style="color: red" readonly></td>
                    <td class="border border-warning border-2"><textarea type="text" class="form-control" name="existingProduct" rows="3"  required>${product.item}</textarea></td>
                    <td class="border border-warning border-2"><input type="number" name="existingQuantity" class="form-control quantity" value="${product.quantity}" required></td>
                    <td class="border border-warning border-2"><input type="number" name="existingUnitPrice" class="form-control unitPrice" value="${product.unitPrice}" required></td>
                    <td class="border border-warning border-2"><input type="number" name="existingSubAmount" class="subAmount form-control" value="${product.total}" style="color: red" readonly></td>
                    <td class="border border-warning border-2">        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                    </tr>`
            } else if (product.cod === 'DEBIT'){
                row = `
                    <tr>
                    <td class="border border-warning border-2"><input type="date" name="existingDate" value="${product.creditDate.toLocaleDateString('en-CA')}" class="form-control" required></td>
                    <td class="border border-warning border-2"><input type="text" name="existingCod" value="DEBIT" class="form-control" style="color: green" readonly></td>
                    <td class="border border-warning border-2"><textarea type="text" class="form-control" name="existingProduct" rows="3"  required>${product.item}</textarea></td>
                    <td class="border border-warning border-2">-<input type="hidden" name="existingQuantity" value="0"></td>
                    <td class="border border-warning border-2">-<input type="hidden" name="existingUnitPrice" value="0"></td>
                    <td class="border border-warning border-2"><input type="number" name="existingSubAmount" class="subAmount form-control" value="${product.total}" style="color: green" required></td>
                    <td class="border border-warning border-2">        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                </tr>`
            }

            htmlString += row
        })
        return htmlString
    }

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Edit Customer Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="row">
                <div class="mb-3 col-md-6 form-group">
                <label for="debtor" class="form-label" required>Credit Name</label>
                <input name="debtor" type="text" class="form-control" id="debtor" aria-describedby="debtor" value="${credit.debtor}" required>
            </div>
                <div class="mb-3 col-md-6 form-group">
                    <label for="phone" class="form-label" required>Phone</label>
                    <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone" value="0${credit.phone}" required>
                </div> 
            </div>
            <div class="mb-3 form-group">
            <div class="d-flex justify-content-between mb-2">
                <label for="product" class="form-label" required>Product & Payments Details</label>
                <div class="dropdown">
                  <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Add New
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" id="newCreditAddBtn">Credit</a></li>
                    <li><a class="dropdown-item" id="newDebitAddBtn">Debit</a></li>
                  </ul>
                </div>
            </div>
            <div class="d-flex my-2">
                <div class="rectangle border border-warning border-3"></div>
                <div class="text-muted ms-1 "> shows already existing records</div>
            </div>
            <div class="table-responsive">
            <table class="table table-hover table-bordered mt-2" id="newDebtorTable">
                <thead>
                <tr class="table-dark">
                    <th scope="col" class="newDebtorColSmall">Date</th>
                    <th scope="col" class="newDebtorColSmall">Type</th>
                    <th scope="col" class="newDebtorColBig">Products & Payments</th>
                    <th scope="col" class="newDebtorColSmall">Quantity</th>
                    <th scope="col" class="newDebtorColSmall">Unit Price</th>
                    <th scope="col" class="newDebtorColSmall">Total</th>
                    <th scope="col" class="newDebtorColSmallest"></th>
                </tr>
                </thead>
                <tbody class="newDebtorTableBody"> 
                    ${printExistingProducts(credit.products)}
                </tbody>
            </table>    
            </div>
            </div>
            <div class="mb-3 form-group">
                <label for="amount" class="form-label" required>Total</label>
                <input name="amount" type="text" class="form-control" id="amount" aria-describedby="amount" value="${credit.amount}" readonly>
            </div>
            <div class="mb-3 form-group">
                <label for="debtorNotes" class="form-label" >Customer Notes</label>
                <textarea type="text" class="form-control" id="debtorNotes" name="debtorNotes" rows="4" >${credit.debtorNotes}</textarea>
            </div> 
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/pos/credit/edit/${credit._id}">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/pos/credit'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}