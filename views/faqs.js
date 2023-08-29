const {printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'FAQS'

module.exports = ({req, wishlist, cart, header, categories}) => {

    const about = (accordionButton, accordionMenu) => {
        return `<div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button ${accordionButton}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse ${accordionMenu}" aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${process.env.ABOUT}
                </div>
            </div>
        </div>`
    }

    const terms = (accordionButton, accordionMenu) => {
        return `<div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button ${accordionButton}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse ${accordionMenu}" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${process.env.TERMS}
                </div>
            </div>
        </div>`
    }

    const deliveries = (accordionButton, accordionMenu) => {
        return `<div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button ${accordionButton}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse ${accordionMenu}" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${process.env.DELIVERIES}
                </div>
            </div>
        </div>`
    }

    const renderFAQ = (faq, status) => {
        const accordionButton = status ? "" : "collapsed"

        const accordionMenu = status ? "show" : ""

        return faq(accordionButton, accordionMenu)
    }

    function printAccordion(header) {
        switch (header) {
            case 'about':
                req.session.faq = 'default'
                return `
        ${renderFAQ(about, true)}
        ${renderFAQ(terms, false)}
        ${renderFAQ(deliveries, false)}
                `
            case 'terms':
                req.session.faq = 'default'
                return `
        ${renderFAQ(about, false)}
        ${renderFAQ(terms, true)}
        ${renderFAQ(deliveries, false)}
                `
            case 'deliveries':
                req.session.faq = 'default'
                return `
        ${renderFAQ(about, false)}
        ${renderFAQ(terms, false)}
        ${renderFAQ(deliveries, true)}
                `
            default:
                return `
        ${renderFAQ(about, true)}
        ${renderFAQ(terms, false)}
        ${renderFAQ(deliveries, false)}  
                `
        }
    }

    return layout({
        title: title,
        req: req,
        categories,
        content: `<section class="container" id="faq">

    <div class="accordion my-5" id="faqAccordion">
            ${printAccordion(header)}
    </div>

</section>


${printWishlistModal(req, wishlist)}

${printCartModal(req, cart)} 
  
        `
    })
}
