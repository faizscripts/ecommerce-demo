// Back to top button
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


// Pre Loader
window.addEventListener("load", () => {
    let loader = document.querySelector(".loader")
    loader.classList.add("loader-finish");
});


// Copyright year
let year = new Date().getFullYear();
if (document.querySelector('#copyright')) {
    document.querySelector('#copyright').innerHTML = year;
}


//modals
let myModal = document.getElementById('myModal')
let myInput = document.getElementById('myInput')

if (myModal) {
    myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus()
    })
}


// sidebar toggle
const toggleButton = document.querySelector('#sidebarToggle');
if (toggleButton) {
    toggleButton.addEventListener('click', (e) => {
        let admin = document.querySelector('#admin');
        e.preventDefault();
        admin.classList.toggle('toggled');
    })
}


// description input and what's in the box
if (document.querySelectorAll('.descriptionBtn').length > 0) {
    const descriptionBtns = document.querySelectorAll('.descriptionBtn');
    window.addEventListener("load", () => {
        descriptionFrame.document.head.innerHTML += `<link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"> <link rel="stylesheet" href="/css/iframe.css" >`;
        descriptionFrame.document.designMode = 'On'

        inBoxFrame.document.head.innerHTML += `<link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"> <link rel="stylesheet" href="/css/iframe.css" >`;
        inBoxFrame.document.designMode = 'On'
    });

    descriptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let cmd = btn.dataset['command'];
            descriptionFrame.document.execCommand(cmd, false, null)
            descriptionInput.value = descriptionFrame.document.body.innerHTML;
        })
    })

    const descriptionInput = document.querySelector('#description')
    descriptionFrame.document.addEventListener('keyup', () => {
        descriptionInput.value = descriptionFrame.document.body.innerHTML;
    })

    const descriptionCopy = document.querySelector('.descriptionCopy');
    if (descriptionCopy.innerHTML !== 'null') {
        descriptionFrame.document.body.innerHTML = descriptionCopy.innerHTML;
        descriptionInput.value = descriptionCopy.innerHTML;
    }


    const inBoxBtns = document.querySelectorAll('.inBoxBtn');
    inBoxBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let cmd = btn.dataset['command'];
            inBoxFrame.document.execCommand(cmd, false, null)
            inBoxInput.value = inBoxFrame.document.body.innerHTML;
        })
    })

    const inBoxInput = document.querySelector('#inBox')
    inBoxFrame.document.addEventListener('keyup', () => {
        inBoxInput.value = inBoxFrame.document.body.innerHTML;
    })

    const inBoxCopy = document.querySelector('.inBoxCopy');
    if (inBoxCopy.innerHTML !== 'null') {
        inBoxFrame.document.body.innerHTML = inBoxCopy.innerHTML;
        inBoxInput.value = inBoxCopy.innerHTML;
    }
}


//Add image
const imgRow = document.querySelector('.imgRow');
if (imgRow) {
    let i = 2;

    imgRow.addEventListener('click', evt => {
        const target = evt.target;
        if (target.matches('.addImage')) {
            if (i <= 10) {
                let card = document.createElement('div');
                card.classList.add('col-2', 'card', 'imageCard');
                card.innerHTML = `
                <img src="..." class="imgCol">
                <div class="card-body ">
                    <div class="d-flex justify-content-end">
                        <label for="image${i}"><i class="far fa-edit"></i></label>
                        <input type="file" id="image${i}" name="image${i}" accept="image/*" hidden>
                        <i class="far fa-trash-alt mx-2"></i>
                        <i class="fas fa-plus addImage"></i>
                    </div>
                </div>
                `
                i++;
                let row = document.querySelector('.imgRow');
                row.append(card);
            }
        }
        const path = evt.path || (evt.composedPath && evt.composedPath());

        if (target.matches('.fa-edit')) {
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {
            path[3].remove()
            i--;
        }

    })
}


//edit image
const editImgRow = document.querySelector('.editImgRow');
if (editImgRow) {
    const imagesLength = document.querySelector('.imagesLength')
    let i = parseInt(imagesLength.value);
    (i === 0) ? i = 2 : i += 1;

    editImgRow.addEventListener('click', evt => {
        const path = evt.path || (evt.composedPath && evt.composedPath());
        const target = evt.target;
        if (target.matches('.addImage')) {
            if (i <= 10) {
                let card = document.createElement('div');
                card.classList.add('col-2', 'card', 'imageCard');
                card.innerHTML = `
                <img src="..." class="imgCol">
                <div class="card-body ">
                    <div class="d-flex justify-content-end">
                        <label for="image${i}"><i class="far fa-edit"></i></label>
                        <input type="file" id="image${i}" name="image${i}" accept="image/*" hidden>
                        <i class="far fa-trash-alt mx-2" style="color: red"></i>
                        <i class="fas fa-plus addImage"></i>
                    </div>
                </div>
                `
                i++;
                let row = document.querySelector('.editImgRow');
                row.append(card);
            }

        }

        if (target.matches('.fa-edit')) {
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {

            for (let j = 2; j < path[4].children.length; j++) {
                path[4].children[j].remove()
                j--;
                i--;
            }


        }

    })
}


//category image
const catRow = document.querySelector('.catRow');
if (catRow) {

    catRow.addEventListener('click', evt => {
        const path = evt.path || (evt.composedPath && evt.composedPath());
        const target = evt.target;

        if (target.matches('.fa-edit')) {
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

    })
}


//visibility switch
const checkbox = document.querySelector('.visibilitySwitch')
if (checkbox) {
    checkbox.value = checkbox.checked;

    checkbox.addEventListener('change', () => {
        checkbox.value = checkbox.checked;
    })
}


//sub-brand
const subBrand = document.querySelector('#subBrand');
if (subBrand) {
    const brandCategory = document.querySelector('.brand-category')
    const brandCategoryInput = document.querySelector('.brand-category-select')
    const addSubBtn = document.querySelector('.subBrandBtn');
    let subBrandsList = document.querySelector('.subBrandsList');
    let subBrandDeleteBtns = document.querySelectorAll('.subBrandDelete');
    let subBrandCategories = document.querySelectorAll('#subBrandCategories');


    subBrand.addEventListener('change', evt => {
        brandCategory.classList.toggle('d-none');
        brandCategoryInput.value = 'none'

        addSubBtn.disabled = !evt.target[1].selected;
        subBrandsList.innerHTML = ``
    });


    addSubBtn.addEventListener('click', evt => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-evenly');
        li.innerHTML = subBrandCategories[0].innerHTML;
        li.classList.remove('d-none')
        subBrandsList.append(li);

        subBrandDeleteBtns = document.querySelectorAll('.subBrandDelete');
        subBrandDeleteBtns.forEach(subBrandDelete => {
            subBrandDelete.addEventListener('click', evt => {
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[1].remove()
            })
        })
    })

    subBrandDeleteBtns.forEach(subBrandDelete => {
        subBrandDelete.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[1].remove()
        })
    })
}


//product options
const option = document.querySelector('#pOption');
if (option) {
    const addOptBtn = document.querySelector('.optionBtn');
    let optionsList = document.querySelector('.optionsList');
    let optionDeleteBtns = document.querySelectorAll('.optionDelete');

    option.addEventListener('change', evt => {
        addOptBtn.disabled = !evt.target[1].selected;
        optionsList.innerHTML = ``
    });


    addOptBtn.addEventListener('click', evt => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-evenly');
        li.innerHTML = `
            <input type="text" class="form-control optionItem" name="optionItems" required>
            <i class="fas fa-trash-alt optionDelete"></i>
        `
        optionsList.append(li);

        optionDeleteBtns = document.querySelectorAll('.optionDelete');
        optionDeleteBtns.forEach(optionDelete => {
            optionDelete.addEventListener('click', evt => {
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[1].remove()
            })
        })
    })

    optionDeleteBtns.forEach(optionDelete => {
        optionDelete.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[1].remove()
        })
    })
}


// add shop price to order
const productsList = document.querySelector('.orderListEdit')
if (productsList) {

    const inputs = document.querySelectorAll('.orderQtyInputs')
    let subtotals = document.querySelectorAll('.orderSubtotalEdit')
    const price = document.querySelectorAll('.orderPriceEdit')
    const total = document.querySelector('.editOrderTotal')
    const totalOutput = document.querySelector('.orderOutput')
    const df = document.querySelector('#delivery_fee')
    const tdf = document.querySelector('.tdf')
    const outputtdf = document.querySelector('.outputtdf')
    const income = document.querySelector('.income')
    const shopTotal = document.querySelector('#shopTotal')
    let sum = 0;

    for (let i = 0; i < subtotals.length; i++) {
        subtotals[i].value = price[i].value * inputs[i].value;

        inputs[i].addEventListener('change', evt => {
            subtotals[i].value = price[i].value * inputs[i].value
            sum = 0;

            subtotals.forEach(sub => {
                sum += parseInt(sub.value)
            })
            total.innerHTML = sum;
            totalOutput.value = sum;
            tdf.innerHTML = sum + parseInt(df.value);
            outputtdf.value = sum + parseInt(df.value);
            income.innerHTML = parseInt(totalOutput.value) - parseInt(shopTotal.value)
        })

        price[i].addEventListener('change', evt => {
            subtotals[i].value = price[i].value * inputs[i].value
            sum = 0;

            subtotals.forEach(sub => {
                sum += parseInt(sub.value)
            })
            total.innerHTML = sum;
            totalOutput.value = sum
            tdf.innerHTML = sum + parseInt(df.value);
            outputtdf.value = sum + parseInt(df.value);
            income.innerHTML = parseInt(totalOutput.value) - parseInt(shopTotal.value)
        })

        df.addEventListener('change', evt => {
            tdf.innerHTML = sum + parseInt(df.value);
            outputtdf.value = sum + parseInt(df.value);
            income.innerHTML = parseInt(totalOutput.value) - parseInt(shopTotal.value)
        })

        shopTotal.addEventListener('change', evt => {
            income.innerHTML = parseInt(totalOutput.value) - parseInt(shopTotal.value)
        })
    }

    subtotals.forEach(sub => {
        sum += parseInt(sub.value)
    })
    total.innerHTML = sum;
    totalOutput.value = sum;

    const orderProductDelete = document.querySelectorAll('.orderProductDelete')
    orderProductDelete.forEach(button => {
        button.addEventListener('click', evt => {
            if (orderProductDelete.length > 1) {
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[1].remove()

                subtotals = document.querySelectorAll('.orderSubtotalEdit')
                sum = 0
                subtotals.forEach(sub => {
                    sum += parseInt(sub.value)
                })
                total.innerHTML = sum;
                totalOutput.value = sum
            } else {
                alert(`Can not delete all the items`)
            }

        })
    })


}


// copy to clipboard
const c2c = document.querySelectorAll('.orderClip');
if (c2c.length > 0) {
    c2c.forEach(link => {
        link.addEventListener('click', evt => {

            for (let i = 0; i <= c2c.length - 1; i++) {
                c2c[i].innerHTML = `<i class="far fa-clipboard"></i>`
            }

            const path = evt.path || (evt.composedPath && evt.composedPath());

            const phone = path[4].children[2].children[0].innerText
            const address = path[4].children[2].children[3].href
            const products = path[4].children[3].innerText
            const payment = path[4].children[5].innerText
            const totalAmount = path[4].children[4].innerText
            const amount = totalAmount.split('=')

            navigator.clipboard.writeText(`Phone number - ${phone}\n\nAddress - ${address}\n\nPayment - ${payment}\n\nAmount - ${amount[1]}\n\n${products}`);
            path[1].innerHTML = ` <i class="fas fa-clipboard"></i>`
        })
    })
}


// Product view image
let smallImages = document.querySelectorAll('.prod-small-img');
if (smallImages.length > 0) {
    smallImages.forEach(smallImage => {
        smallImage.addEventListener('click', (evt) => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[4].children[0].children[0].src = smallImage.src
        })
    })
}

// copy to clipboard product view
const c2cp = document.querySelectorAll('.c2cLink');
if (c2cp.length > 0) {
    c2cp.forEach(link => {
        link.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            navigator.clipboard.writeText(path[2].children[3].value);
            path[1].innerHTML = `<button class="c2cLink btn btn-secondary"> copied product link <i class="fas fa-clipboard c2c" ></i> </button>`
        })
    })
}


//detailed price list calc
const bps = document.querySelectorAll('.bp');
if (bps.length > 0) {
    function calculatePrices(evt) {
        const path = evt.path || (evt.composedPath && evt.composedPath());

        let newBp = path[3][1].value
        let rate = path[3][2].value;
        let shipping = parseFloat(path[3][3].value);
        let buying = path[3][4];
        let profitP = parseFloat(path[3][5].value);
        let selling = path[3][6];

        let newBuying = Math.ceil((newBp * rate) + shipping)
        buying.value = newBuying;
        buying.innerHTML = newBuying;

        let newSelling = Math.ceil((profitP / 100 * newBuying) + newBuying)
        selling.value = newSelling;
        selling.innerHTML = newSelling;
    }

    bps.forEach(bp => {
        bp.addEventListener('change', evt => {
            calculatePrices(evt)
        })
    })

    const rates = document.querySelectorAll('.rate');
    rates.forEach(rate => {
        rate.addEventListener('change', evt => {
            calculatePrices(evt)
        })
    })

    const shippings = document.querySelectorAll('.shipping');
    shippings.forEach(shipping => {
        shipping.addEventListener('change', evt => {
            calculatePrices(evt)
        })
    })

    const profitPs = document.querySelectorAll('.profitP');
    profitPs.forEach(profitP => {
        profitP.addEventListener('change', evt => {
            calculatePrices(evt)
        })
    })
}

//show password
const passIcon = document.querySelector('.passIcon')
if (passIcon) {
    passIcon.addEventListener('click', () => {
        const passInput = document.querySelector('.passInput')
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);

        passIcon.classList.toggle('bi-eye');
    })
}

//new order
const products = document.querySelectorAll('.newOrderP');
if (products.length > 0) {
    products.forEach(product => {
        product.addEventListener('click', evt => {
            console.log(evt);
        })
    })
}

//debtor table
const newDebtorTable = document.querySelector('#newDebtorTable');
if (newDebtorTable) {
    const newCredit = document.querySelector('#newCreditAddBtn');
    const newDebit = document.querySelector('#newDebitAddBtn');
    const cod = document.querySelector('.cod');
    const tableBody = document.querySelector('.newDebtorTableBody');
    let deleteRowBtns = document.querySelectorAll('.deleteDebtorRow');
    let quantities = document.querySelectorAll('.quantity');
    let unitPrices = document.querySelectorAll('.unitPrice');
    let subAmounts = document.querySelectorAll('.subAmount');
    let amount = document.querySelector('#amount');
    const today2 = new Date()
    const today = today2.toLocaleDateString('en-CA')

    function calculateAmount(subAmounts) {

        let totalCredit = 0
        let totalDebit = 0
        subAmounts.forEach(subAmountLoop => {
            if (subAmountLoop.style.color === 'green') {
                totalDebit += parseInt(subAmountLoop.value)
            } else if (subAmountLoop.style.color === 'red')
                totalCredit += parseInt(subAmountLoop.value)
        })

        amount.value = totalDebit - totalCredit
    }

    function deleteRow() {
        deleteRowBtns = document.querySelectorAll('.deleteDebtorRow');
        deleteRowBtns.forEach(deleteRowBtn => {
            deleteRowBtn.addEventListener('click', evt => {
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[4].remove()

                subAmounts = document.querySelectorAll('.subAmount');
                calculateAmount(subAmounts)
            })
        })
    }

    newCredit.addEventListener('click', (evt) => {
        const newTr = document.createElement("tr")
        newTr.innerHTML = `                    
                    <td><input type="date" name="date" class="form-control" value="${today}" required></td>
                    <td><input type="text" name="cod" class="form-control cod" value="CREDIT" style="color: red" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required></textarea></td>
                    <td><input type="number" name="quantity" class="form-control quantity" value="1" required></td>
                    <td><input type="number" name="unitPrice" class="form-control unitPrice" value="0" required></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="0" style="color: red" readonly></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>`
        tableBody.prepend(newTr)

        deleteRow()

        quantities = document.querySelectorAll('.quantity');
        quantities.forEach(quantity => {
            quantity.addEventListener('change', (evt) => {
                const path = evt.path || (evt.composedPath && evt.composedPath());

                let up = path[2].children[4].children[0]
                let tot = path[2].children[5].children[0]

                tot.value = parseInt(quantity.value) * parseInt(up.value)
                tot.innerHTML = tot.value

                subAmounts = document.querySelectorAll('.subAmount');
                calculateAmount(subAmounts)
            })
        })

        unitPrices = document.querySelectorAll('.unitPrice');
        unitPrices.forEach(unitPrice => {
            unitPrice.addEventListener('change', (evt) => {
                const path = evt.path || (evt.composedPath && evt.composedPath());

                let quantity = path[2].children[3].children[0]
                let tot = path[2].children[5].children[0]

                tot.value = parseInt(quantity.value) * parseInt(unitPrice.value)
                tot.innerHTML = tot.value

                subAmounts = document.querySelectorAll('.subAmount');
                calculateAmount(subAmounts)
            })
        })

        subAmounts = document.querySelectorAll('.subAmount');
        calculateAmount(subAmounts)

    })

    newDebit.addEventListener('click', () => {
        const newTr = document.createElement("tr")
        newTr.innerHTML = `                    
                    <td><input type="date" name="date" value="${today}" class="form-control" required></td>
                    <td><input type="text" name="cod" value="DEBIT" class="form-control" style="color: green" readonly></td>
                    <td><textarea type="text" class="form-control" name="product" rows="3"  required></textarea></td>
                    <td>-<input type="hidden" name="quantity" value="0"></td>
                    <td>-<input type="hidden" name="unitPrice" value="0"></td>
                    <td><input type="number" name="subAmount" class="subAmount form-control" value="0" style="color: green" required></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteDebtorRow"></i>
                            </button>
                        </div>
                    </td>`
        tableBody.prepend(newTr)

        deleteRow()

        subAmounts = document.querySelectorAll('.subAmount');
        subAmounts.forEach(subAmount => {
            subAmount.addEventListener('change', () => {
                calculateAmount(subAmounts)
            })
        })
    })

    deleteRow()

    quantities = document.querySelectorAll('.quantity');
    quantities.forEach(quantity => {
        quantity.addEventListener('change', (evt) => {
            const path = evt.path || (evt.composedPath && evt.composedPath());

            let up = path[2].children[4].children[0]
            let tot = path[2].children[5].children[0]

            tot.value = parseInt(quantity.value) * parseInt(up.value)
            tot.innerHTML = tot.value

            subAmounts = document.querySelectorAll('.subAmount');
            calculateAmount(subAmounts)
        })
    })

    unitPrices = document.querySelectorAll('.unitPrice');
    unitPrices.forEach(unitPrice => {
        unitPrice.addEventListener('change', (evt) => {
            const path = evt.path || (evt.composedPath && evt.composedPath());

            let quantity = path[2].children[3].children[0]
            let tot = path[2].children[5].children[0]

            tot.value = parseInt(quantity.value) * parseInt(unitPrice.value)
            tot.innerHTML = tot.value

            subAmounts = document.querySelectorAll('.subAmount');
            calculateAmount(subAmounts)
        })
    })

    subAmounts = document.querySelectorAll('.subAmount');
    subAmounts.forEach(subAmount => {
        subAmount.addEventListener('change', () => {

            calculateAmount(subAmounts)
        })
    })

}

//inventory table
const newInvTable = document.querySelector('#newInvTable');
if (newInvTable) {
    const addBtn = document.querySelector('#newInvAddBtn');
    const tableBody = document.querySelector('.newInvTableBody');
    let deleteRowBtns = document.querySelectorAll('.deleteInvRow');
    const today2 = new Date()
    const today = today2.toLocaleDateString('en-CA')


    addBtn.addEventListener('click', () => {
        const newTr = document.createElement("tr")
        newTr.innerHTML = `                    
                    <td><input type="date" name="date" value="${today}" required></td>
                    <td><input type="text" name="quantity" required></td>
                    <td><input type="text" name="store_quantity" required></td>
                    <td>        
                        <div  class="deleteForm d-flex justify-content-center">
                            <button type="button" class="formBtn">
                            <i class="far fa-trash-alt deleteInvRow"></i>
                            </button>
                        </div>
                    </td>
`
        tableBody.prepend(newTr)

        deleteRowBtns = document.querySelectorAll('.deleteInvRow');
        deleteRowBtns.forEach(deleteRowBtn => {
            deleteRowBtn.addEventListener('click', evt => {
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[4].remove()
            })
        })

    })

    deleteRowBtns = document.querySelectorAll('.deleteInvRow');
    deleteRowBtns.forEach(deleteRowBtn => {
        deleteRowBtn.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[4].remove()
        })
    })

}







