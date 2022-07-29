const {printProductModal, printMainImage, printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');

module.exports = ({req, products, wishlist, cart, page, iterator, endingLink, numberOfPages, categories}) => {
    function renderProducts(products, wishlist, cart) {
        if (products.length>0) {

            return products.map(product => {
                return `
            <div class="col-6 col-md-3 col-lg-2">
                    <div class="card">
                        <img src="/img/products/${printMainImage(product)}" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#_${product._id}">
                        <div class="card-body">
                            <h6 class="card-title" data-bs-toggle="modal"
             data-bs-target="#_${product._id}">${product.product_name}</h6>
                            <p class="card-text mb-0">ksh. ${product.price}</p>
                            <div class="action">
                                ${wishlistButton(product._id, wishlist)}      
                                ${cartButton(product._id, cart)}  
                            </div>
                        </div>
                    </div>
                </div>
                
            ${printProductModal(product, wishlist, cart)}
        `}).join('')

        } else {
            return `<h6 class="no-results text-muted">Didn't find any products with that filter. <br> Try another filter.</h6>`
        }

    }

    function printSort(sort) {
        switch (sort) {
            case 'product_name':
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Alphabetically
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth/">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
            case 'default':
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Default
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth/">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
            case '-dateCreated':
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Latest
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
            case 'price':
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Price - Low to High
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
            case '-price':
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Price - High to Low
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
            default:
                return `
                    <span class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Alphabetically
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">
                        <li><a class="dropdown-item" href="/search/alpha">Alphabetically</a></li>
                        <li><a class="dropdown-item" href="/search/default">Default</a></li>
                        <li><a class="dropdown-item" href="/search/latest">Latest</a></li>
                        <li><a class="dropdown-item" href="/search/lth">Price - Low to High</a></li>
                        <li><a class="dropdown-item" href="/search/htl">Price - High to Low</a></li>
                    </ul>
                </span>
                `
        }
    }

    function printPg(paginationString,i, active) {
        if (active) {
            if (req.originalUrl.includes('lth')) {
                paginationString.push(`<li class="page-item active"><a class="page-link" href="/search/lth/?query=${req.session.query}&page=${i}">${i}</a></li>`)
            } else if (req.originalUrl.includes('htl')) {
                paginationString.push(`<li class="page-item active"><a class="page-link" href="/htl/?page=${i}">${i}</a></li>`)
            }  else if (req.originalUrl.includes('alpha')) {
                paginationString.push(`<li class="page-item active"><a class="page-link" href="/alpha/?page=${i}">${i}</a></li>`)
            }  else if (req.originalUrl.includes('latest')) {
                paginationString.push(`<li class="page-item active"><a class="page-link" href="/latest/?page=${i}">${i}</a></li>`)
            }
            else {
                paginationString.push(`<li class="page-item active"><a class="page-link" href="/search?query=${req.session.query}&page=${i}">${i}</a></li>`)
            }
        } else {
            if (req.originalUrl.includes('lth')) {
                paginationString.push(`<li class="page-item "><a class="page-link" href="/search/lth?query=${req.session.query}&page=${i}">${i}</a></li>`)
            } else if (req.originalUrl.includes('htl')) {
                paginationString.push(`<li class="page-item "><a class="page-link" href="/htl/?page=${i}">${i}</a></li>`)
            } else if (req.originalUrl.includes('alpha')) {
                paginationString.push(`<li class="page-item "><a class="page-link" href="/alpha/?page=${i}">${i}</a></li>`)
            } else if (req.originalUrl.includes('latest')) {
                paginationString.push(`<li class="page-item "><a class="page-link" href="/latest/?page=${i}">${i}</a></li>`)
            } else {
                paginationString.push(`<li class="page-item"><a class="page-link" href="/search?query=${req.session.query}&page=${i}">${i}</a></li>`)
            }
        }
    }

    function printPagination(page, iterator, endingLink, numberOfPages) {

        let paginationString = [];

        if (page > 1) {
            if (req.originalUrl.includes('lth')) {
                paginationString.push(`
                <li class="page-item">
                    <a class="page-link" href="/search/lth?query=${req.session.query}&page=${page - 1}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `)
            } else if (req.originalUrl.includes('htl')) {
                paginationString.push(`
                <li class="page-item">
                    <a class="page-link" href="/htl/?page=${page - 1}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `)
            } else if (req.originalUrl.includes('alpha')) {
                paginationString.push(`
                <li class="page-item">
                    <a class="page-link" href="/alpha/?page=${page - 1}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `)
            } else if (req.originalUrl.includes('latest')) {
                paginationString.push(`
                <li class="page-item">
                    <a class="page-link" href="/latest/?page=${page - 1}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `)
            }  else {
                paginationString.push(`
                <li class="page-item">
                    <a class="page-link" href="/search/?query=${req.session.query}&page=${page - 1}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `)
            }
        }


        for (let i = iterator; i <= endingLink; i++) {
            if (i < 1) {

            } else if (i === page) {
                printPg(paginationString, i, true)
            }
            else {
                printPg(paginationString, i, false)
            }
        }

        if (page < numberOfPages) {
            if (req.originalUrl.includes('lth')) {
                paginationString.push(`
                <li class="page-item">
                     <a class="page-link" href="/lth/?page=${page + 1}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>
            `)            } else if (req.originalUrl.includes('htl')) {
                paginationString.push(`
                <li class="page-item">
                     <a class="page-link" href="/htl/?page=${page + 1}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>
            `)            } else if (req.originalUrl.includes('alpha')) {
                paginationString.push(`
                <li class="page-item">
                     <a class="page-link" href="/alpha/?page=${page + 1}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>
            `)            } else if (req.originalUrl.includes('latest')) {
                paginationString.push(`
                <li class="page-item">
                     <a class="page-link" href="/latest/?page=${page + 1}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>
            `)            } else {
                paginationString.push(`
                <li class="page-item">
                     <a class="page-link" href="/search/?query=${req.session.query}&page=${page + 1}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>
            `)            }
        }

        return paginationString.join('')
    }

    return layout({
        title: req.session.query,
        req: req,
        categories,
        content: `
<!--Cases Main-->
<section class="category-main">
    <!--    Display-->
    <div class="container-fluid" id="category-display">
        <div class="card">
            <div class="card-header d-flex justify-content-between mt-1">
                <div class="queryDisplay">Search: ${req.session.query}</div>
<!--                <div class="sortBy mt-1">-->
<!--                    Sort:  -->
<!--                </div>-->
            </div>
            <div class="card-body  mainContent row">
                ${renderProducts(products, wishlist, cart)}
                <nav class="d-flex justify-content-center mt-2" aria-label="Page navigation">
                      <ul class="pagination">
                         ${printPagination(page, iterator, endingLink, numberOfPages)}
                      </ul>
                </nav>
            </div>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)} 
  
        `})
}