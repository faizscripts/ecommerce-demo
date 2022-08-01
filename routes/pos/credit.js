const _ = require('lodash');
const {Credit} = require('../../models/pos/credit');
const {displayDate, printCOD} = require('../../middlewares/otherFunctions');
const viewCreditTemplate = require('../../views/pos/credit/index');
const viewHistoryTemplate = require('../../views/pos/credit/view');
const newCreditTemplate = require('../../views/pos/credit/new');
const existingCreditTemplate = require('../../views/pos/credit/existing');
const express = require('express');
const mongoose = require("mongoose");
const editCreditTemplate = require("../../views/pos/credit/edit");
const router = express.Router();
const fs = require('fs');
const Pdfmake = require('pdfmake');

router.get('/', async (req, res) => {
    const credits = await Credit.find();

    res.send(viewCreditTemplate({credits}));
});

router.get('/new', (req, res) => {
    const newD = undefined;

    res.send(newCreditTemplate({newD}));
})

router.post('/', async(req, res) => {

    const credits = await Credit.find();

    let duplicate = undefined

    if (credits.length > 0){
        duplicate = credits.find(credit => credit.debtor.toLowerCase() === req.body.debtor.toLowerCase() || `0${credit.phone}` === req.body.phone)
    }

    if (duplicate) {
        req.session.existing = duplicate
        req.session.newD = req.body
        return res.send(existingCreditTemplate({existing: duplicate, newD: req.body}))
    } else {

        let credit = new Credit(
            _.pick(req.body,
                ['debtor', 'phone', 'amount', 'debtorNotes'])
        );


        let products = []

        if (typeof req.body.date === "string"){
            products.push({
                creditDate: req.body.date,
                cod: req.body.cod,
                item: req.body.product,
                quantity: req.body.quantity,
                unitPrice: req.body.unitPrice,
                total : req.body.subAmount })
        } else if (typeof req.body.date === "object"){
            for (let i=0; i<req.body.date.length; i++){
                products.push({
                    creditDate: req.body.date[i],
                    cod: req.body.cod[i],
                    item: req.body.product[i],
                    quantity: req.body.quantity[i],
                    unitPrice: req.body.unitPrice[i],
                    total : req.body.subAmount[i] })
            }
        }

        credit.products = products;

        await credit.save()

        res.redirect('/pos/credit');
    }

})

router.get('/view/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const credit = await Credit.findById(req.params.id);
    if (!credit) return res.status(404).send(`Sorry, that record doesn't exist`);

    res.send(viewHistoryTemplate({credit}));
})

router.get('/join', async(req, res) => {
    let existing = req.session.existing
    let newD = req.session.newD
    req.session.existing = null
    req.session.newD = null

    if (existing){
        let products = []

        if (typeof newD.date === "string"){
            products.push({
                creditDate: newD.date,
                cod: newD.cod,
                item: newD.product,
                quantity: newD.quantity,
                unitPrice: newD.unitPrice,
                total : newD.subAmount })
        } else if (typeof newD.date === "object"){
            for (let i=0; i<newD.date.length; i++){
                products.push({
                    creditDate: newD.date[i],
                    cod: newD.cod[i],
                    item: newD.product[i],
                    quantity: newD.quantity[i],
                    unitPrice: newD.unitPrice[i],
                    total : newD.subAmount[i] })
            }
        }

        let credit = await Credit.findById(existing._id)

        credit.products = products.concat(credit.products)

        credit.amount += parseInt(newD.amount)

        credit.lastUpdate = Date.now()

        await credit.save()

        res.redirect('/pos/credit');
    } else {
        res.redirect('/pos/credit')
    }



})

router.get('/cancel', (req, res) => {
    let newD = req.session.newD
    req.session.existing = null
    req.session.newD = null

    if (newD){
        res.send(newCreditTemplate({newD}));
    } else {
        res.redirect('/pos/credit')
    }


})

router.get('/edit/:id', async(req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const credit = await Credit.findById(req.params.id);
    if (!credit) return res.status(400).send(`Sorry, that customer doesn't exist`);

    res.send(editCreditTemplate({credit}));
})

router.post('/edit/:id', async(req, res) => {
    let credit = await Credit.findById(req.params.id)
    if (!credit) return res.status(404).send(`Sorry, that debtor doesn't exist`);

    let products = []
    let existingProducts = []

    if (typeof req.body.date === "string"){
        products.push({
            creditDate: req.body.date,
            cod: req.body.cod,
            item: req.body.product,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            total : req.body.subAmount })
    } else if (typeof req.body.date === "object"){
        for (let i=0; i<req.body.date.length; i++){
            products.push({
                creditDate: req.body.date[i],
                cod: req.body.cod[i],
                item: req.body.product[i],
                quantity: req.body.quantity[i],
                unitPrice: req.body.unitPrice[i],
                total : req.body.subAmount[i] })
        }
    }

    if (typeof req.body.existingDate === "string"){
        existingProducts.push({
            creditDate: req.body.existingDate,
            cod: req.body.existingCod,
            item: req.body.existingProduct,
            quantity: req.body.existingQuantity,
            unitPrice: req.body.existingUnitPrice,
            total : req.body.existingSubAmount })
    } else if (typeof req.body.existingDate === "object"){
        for (let i=0; i<req.body.existingDate.length; i++){
            existingProducts.push({
                creditDate: req.body.existingDate[i],
                cod: req.body.existingCod[i],
                item: req.body.existingProduct[i],
                quantity: req.body.existingQuantity[i],
                unitPrice: req.body.existingUnitPrice[i],
                total : req.body.existingSubAmount[i] })
        }
    }

    credit.products = products.concat(existingProducts);

    Object.assign(credit, {debtor:req.body.debtor, phone:req.body.phone, amount:req.body.amount, debtorNotes:req.body.debtorNotes, lastUpdate: Date.now()})

    await credit.save()

    res.redirect('/pos/credit');
})

router.post('/printPDF/:id', async(req, res) => {
    const credit = await Credit.findById(req.params.id)
    if (!credit) return res.status(404).send(`Sorry, that debtor doesn't exist`);

    let fonts = {
        Roboto: {
            normal: './public/fonts/roboto/Roboto-Regular.ttf',
            bold: './public/fonts/roboto/Roboto-Medium.ttf',
            italics: './public/fonts/roboto/Roboto-Italic.ttf',
            bolditalics: './public/fonts/roboto/Roboto-MediumItalic.ttf'
        }
    };

    let pdfmake = new Pdfmake(fonts);

    let jsdom = require("jsdom");
    let { JSDOM } = jsdom;
    let { window } = new JSDOM("");
    let htmlToPdfMake = require("html-to-pdfmake");

    let startDate = new Date(req.body.startPDF)
    let endDate = new Date(req.body.endPDF)
    let currentTime = new Date()
    let totalCredit = 0
    let totalDebit = 0

    function printTableRows(credit, startDate, endDate) {
        let rowString = ''
        credit.products.forEach( product => {
            let productDate = new Date(product.creditDate)
            if (productDate >= startDate && productDate <= endDate){
                if (product.cod === 'CREDIT'){
                    rowString += `
                      <tr style="font-size: 0.75rem">
                          <td>${displayDate(productDate)}</td>
                          <td>${product.item}</td>
                          <td>${product.quantity}</td>
                          <td>${product.unitPrice}</td>
                          <td>${product.total}</td>
                          <td></td>
                        </tr>
                `
                    totalCredit += product.total
                } else if (product.cod === 'DEBIT'){
                    rowString += `
                      <tr style="font-size: 0.75rem">
                          <td>${displayDate(productDate)}</td>
                          <td>${product.item}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>${product.total}</td>
                        </tr>
                `
                    totalDebit += product.total
                }

            }
        })

        return rowString
    }


    let html = htmlToPdfMake(`
    <img src="./public/img/logo.jpg" alt="Logo" style="text-align: right; width: 150px; margin-bottom: 1rem;">
    <h2 style="text-align: center; text-decoration: underline; margin: 1.5rem 0;"><b>LEDGER HISTORY</b></h2>
    <div style="text-align: left;  margin: 1rem 0;">
        ${credit.debtor}, <a href="tel:${credit.phone}">0${credit.phone}</a> <br>
        Period: ${displayDate(startDate)} - ${displayDate(endDate)} <br>
        Generated on: ${currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })}, ${displayDate(currentTime)} <br>
       
    </div>
    <table style="margin-top: 1rem;" data-pdfmake="{'headerRows':1}">
  <tr>
    <th style="width:11%; height: 1.5rem; background-color: #c6c0c0;">DATE</th>
    <th style="width:49%; height: 1.5rem; background-color: #c6c0c0;">PRODUCTS & PAYMENTS</th>
    <th style="width:10%; height: 1.5rem; background-color: #c6c0c0;">QTY</th>
    <th style="width:10%; height: 1.5rem; background-color: #c6c0c0;">PRICE</th>
    <th style="width:10%; height: 1.5rem; background-color: #c6c0c0;">CREDIT</th>
    <th style="width:10%; height: 1.5rem; background-color: #c6c0c0;">DEBIT</th>
  </tr>
  ${printTableRows(credit, startDate, endDate)}
  <tr>
    <td style="border: white"></td>
    <td style="border: white"><b>TOTAL</b></td>
    <td style="border: white"></td>
    <td style="border: white"></td>
    <td style="border: white"><b>${totalCredit}</b></td>
    <td style="border: white"><b>${totalDebit}</b></td>
  </tr>
  <tr>
    <td style="border: white"></td>
    <td style="border: white">ksh. ${printCOD(totalDebit-totalCredit)}</td>
    <td style="border: white"></td>
    <td style="border: white"></td>
    <td style="border: white"></td>
    <td style="border: white"></td>
  </tr>
  
</table>
    `, {window:window, tableAutoSize:true});

    let docDefinition = {
        content: [
            html
        ],
        footer: (currentPage) => {
            return {
                margin: [72, 0, 72, 0],
                fontSize: 10,
                columns: [
                    {
                    with: 'auto',
                    alignment: 'left',
                    text: `© ${process.env.BUSINESS_NAME}`
                },
                    {
                        with: 'auto',
                        alignment: 'right',
                        // text: 'Page | 1'
                        text: [{
                            color: '#7f7f7f',
                            text: 'Page | '
                        },
                            {
                                text: currentPage
                            }
                        ]
                    }

                ],
            }
        },
    }

    function getPathDate(date) {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear().toString().slice(-2);

        return `${day}.${month + 1}.${year}`
    }

    let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
    let pdf
    let path = `./public/pdfs/${credit.debtor} ${getPathDate(startDate)} to ${getPathDate(endDate)}.pdf`
    pdfDoc.pipe(pdf = fs.createWriteStream(path));
    pdfDoc.end();

    pdf.on('finish', async function () {
        res.download(path);
    });
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const credit = await Credit.findByIdAndDelete(req.params.id);
    if (!credit) return res.status(404).send(`Sorry, that customer doesn't exist`);

    res.redirect('/pos/credit');
})

module.exports = router;