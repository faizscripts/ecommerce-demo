const {displayDate, printCOD} = require('../../../middlewares/otherFunctions')
const layout = require('../layout');
const title = 'Credits & Debits'

module.exports = ({credits}) => {

    const renderedCredits = credits.map(credit => {
        return `
<tr>
    <td><span class="dateSorta">${credit.lastUpdate.toISOString()}</span>${displayDate(credit.lastUpdate)}</td>
    <td class="debtorInfo"> <span class="debtorName">${credit.debtor}</span> <span class="debtorPhone"><a href="tel:${credit.phone}">0${credit.phone}</a></span>    ${printCreditNotes(credit)}</td>
    <td class="productHistory">
        <span class="currentTotal">${printCOD(credit.amount)}</span> <br> 
        ${printProducts(credit)} <br> 
        <a class="full" href="/pos/credit/view/${credit._id}">view full history</a>
    </td>
    <td>
        <a href="/pos/credit/edit/${credit._id}"><i class="far fa-edit"></i></a> 
        <div  class="deleteForm ms-4">
            <button type="button" data-bs-toggle="modal" data-bs-target="#delete${credit._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
    </td>
    <td>${printPDF(credit)}</td>
</tr>
       `;
    }).join('');

    function printCreditNotes(credit) {
        if (credit.debtorNotes) {
            return `
            Notes: <br>
            ${credit.debtorNotes}`
        } else {
            return ``
        }
    }

    function printProducts(credit) {
        let htmlString = ''
        let latestDate = new Date(2000, 1, 1)
        credit.products.forEach(product => {
            if (product.creditDate.toISOString() > latestDate.toISOString()) {
                latestDate = product.creditDate
            }
        })

        credit.products.forEach(product => {
            if (displayDate(product.creditDate) === displayDate(latestDate)) {
                if (product.cod === 'CREDIT'){
                    htmlString += `
                    <ul>
                        <li>
                            ${displayDate(product.creditDate)}, ${product.item} <br>
                            Credit: ${product.quantity} pcs @ ${product.unitPrice} = <b>${product.total}</b>
                        </li>
                    </ul>
            `} else if (product.cod === 'DEBIT'){
                    htmlString += `
                    <ul>
                        <li>
                            ${displayDate(product.creditDate)}, ${product.item} <br> 
                            Debit = <b>${product.total}</b>
                        </li>
                    </ul>
            `}
            }
        })
        return htmlString
    }

    function printPDF(credit) {
        let sd = startDate(credit.products)
        const ed2 = new Date()
        const ed = ed2.toLocaleDateString('en-CA')

        return `
        <form action="/pos/credit/printPDF/${credit._id}" method="POST">
            <label for="startPDF">Start:</label>
            <input type="date" min="${sd}" max="${ed}" name="startPDF" value="${sd}"/> <br> <br>
            <label for="endPDF">End:</label>
            <input type="date" min="${sd}" max="${ed}" name="endPDF" value="${ed}"/> <br> <br>
            <button class="btn btn-success" type="submit" value="submit" style="font-size: 0.8rem">Send</button>
        </form>
        `
    }

    function startDate(products) {
        let earliest = new Date()

        products.forEach(product => {
            if (earliest.toISOString() > product.creditDate.toISOString()) {
                earliest = product.creditDate;
            }
        })

        return earliest.toLocaleDateString('en-CA')

    }

    function accTotal(credits) {
        let sum = 0;
        credits.forEach(credit => {
            sum += credit.amount
        })
        return sum
    }

    const renderedDeleteModals = credits.map(credit => {
        return `
        <div class="modal fade" id="delete${credit._id}" tabindex="-1" aria-labelledby="deleteCreditModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>DELETE</b> <span class="text-capitalize">${credit.debtor}</span>, total = ${credit.amount}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/pos/credit/delete/${credit._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
           `;
    }).join('');

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="d-flex justify-content-between">
        <p class="accTotal">TOTAL: ${accTotal(credits)}</p>
        <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/pos/credit/new'">Add New Customer</button>
</div>
    <div class="card-body table-responsive ">
        <table class="table table-hover table-bordered mt-2" id="creditIndexT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="creditSmall">Last Update</th>
                <th scope="col" class="creditML">Customer Info</th>
                <th scope="col" class="creditLarge">Products & Payments History</th>
                <th scope="col" class="creditSmall">Actions</th>
                <th scope="col" class="creditMid">Share PDF</th>
            </tr>
            </thead>
            <tbody>
                ${renderedCredits}
            </tbody>
        </table>
    </div>
</div>

${renderedDeleteModals}

`
    });
};