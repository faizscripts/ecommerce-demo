const layout = require('../layout');
const title = 'Add New Customer';

module.exports = ({newD}) => {
    const today2 = new Date()
    const today = today2.toLocaleDateString('en-CA')

    function printName(newD) {
        if (newD){
            return `<input name="debtor" type="text" class="form-control" id="debtor" aria-describedby="debtor" value="${newD.debtor}" required>`
        } else {
            return `<input name="debtor" type="text" class="form-control" id="debtor" aria-describedby="debtor" required>`
        }
    }

    function printPhone(newD) {
        if (newD){
            return `<input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone" value="${newD.phone}" required>`
        } else {
            return `<input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone" required>`
        }
    }

    function printAmount(newD) {
        if (newD){
            return `<input name="amount" type="text" class="form-control" id="amount" aria-describedby="amount" value="${newD.amount}" readonly>`
        } else {
            return `<input name="amount" type="text" class="form-control" id="amount" aria-describedby="amount" value="0" readonly>`
        }
    }

    function printNotes(newD) {
        if (newD){
            return newD.debtorNotes
        } else {
            return ''
        }
    }

    function printProducts(newD) {
        if (newD){
            if (typeof newD.date === 'string'){
                if (newD.cod === 'CREDIT'){
                    return `
                <tr>
                    <td><input type="date" name="date" class="form-control" value="${newD.date}" required></td>
                    <td><input type="text" name="cod" class="form-control" value="CREDIT" style="color: red" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required>${newD.product}</textarea></td>
                    <td><input type="number" name="quantity" class="form-control quantity" value="${newD.quantity}" required></td>
                    <td><input type="number" name="unitPrice" class="form-control unitPrice" value="${newD.unitPrice}" required></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="${newD.subAmount}" style="color: red" readonly></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                    </tr>
                `
                } else if (newD.cod === 'DEBIT'){
                    return `
                <tr>
                    <td><input type="date" name="date" value="${newD.date}" class="form-control" required></td>
                    <td><input type="text" name="cod" value="DEBIT" class="form-control" style="color: green" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required>${newD.product}</textarea></td>
                    <td>-<input type="hidden" name="quantity" value="0"></td>
                    <td>-<input type="hidden" name="unitPrice" value="0"></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="${newD.subAmount}" style="color: green" required></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                    `}

            } else if (typeof newD.date === "object"){
                let cancelMultiple = ''
                let row = ''
                for (let i=0; i<newD.date.length; i++){
                    if (newD.cod[i] === 'CREDIT'){
                        row = `
                   <tr>
                    <td><input type="date" name="date" class="form-control" value="${newD.date[i]}" required></td>
                    <td><input type="text" name="cod" class="form-control" value="CREDIT" style="color: red" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required>${newD.product[i]}</textarea></td>
                    <td><input type="number" name="quantity" class="form-control quantity" value="${newD.quantity[i]}" required></td>
                    <td><input type="number" name="unitPrice" class="form-control unitPrice" value="${newD.unitPrice[i]}" required></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="${newD.subAmount[i]}" style="color: red" readonly></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                    </tr>`
                    } else if (newD.cod[i] === 'DEBIT'){
                        row = `
                    <tr>
                    <td><input type="date" name="date" value="${newD.date[i]}" class="form-control" required></td>
                    <td><input type="text" name="cod" value="DEBIT" class="form-control" style="color: green" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required>${newD.product[i]}</textarea></td>
                    <td>-<input type="hidden" name="quantity" value="0"></td>
                    <td>-<input type="hidden" name="unitPrice" value="0"></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="${newD.subAmount[i]}" style="color: green" required></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>
                </tr>`
                    }
                    cancelMultiple += row
                }

                return cancelMultiple
            }
        } else {
            return ``
        }
    }

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        New Customer Information
    </div>
    <div class="card-body">
        <form method="POST" >
            <div class="row">
                <div class="mb-3 col-md-6 form-group">
                <label for="debtor" class="form-label" required>Customer Name</label>
                ${printName(newD)}
            </div>
                <div class="mb-3 col-md-6 form-group">
                    <label for="phone" class="form-label" required>Phone</label>
                    ${printPhone(newD)}
                </div> 
            </div>
            <div class="mb-3 form-group">
            <div class="d-flex justify-content-between mb-2">
                <label for="product" class="form-label" required>Product & Payment Details</label>
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
            <div class="table-responsive">
            <table class="table table-hover table-bordered mt-2 NODT" id="newDebtorTable">
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
                    ${printProducts(newD)}
                </tbody>
            </table> 
            </div>   
            </div>
            <div class="mb-3 form-group">
                <label for="amount" class="form-label" required>Total</label>
                ${printAmount(newD)}
            </div>
            <div class="mb-3 form-group">
                <label for="debtorNotes" class="form-label" >Customer Notes</label>
                <textarea type="text" class="form-control" id="debtorNotes" name="debtorNotes" rows="4" >${printNotes(newD)}</textarea>
            </div> 
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/pos/credit">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/pos/credit'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}