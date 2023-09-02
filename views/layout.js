const {extraNav, footer, wishlistCount, cartCount, navbarDropdown} = require('../middlewares/otherFunctions');

module.exports = ({title, req, content, categories}) => {

    return `
<!DOCTYPE html>
<html lang="en">
<head>

    <!-- Required meta tags -->
    <title>${title} | ${process.env.BUSINESS_NAME}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="Quality accessories for phones and tablets (cases, screen protectors, audio, power), smart watches, cameras, cars and computers">
    <meta name="keywords" content="kenya, e-commerce, online, cases, screen protectors, audio, earphones, earbuds, apple, iphone, power bank, smart watch, camera, accessories, car, computer, premium, quality">
    <meta property="og:image" content="/img/logo.webp">
    <meta name="author" content="Faiz Ahmed">
    
    <!-- Maps   -->
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
   

    <!--    Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="/img/favicons/site.webmanifest">
    <link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!--    Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" >

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css" >

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css" >

    <!--        Font Awesome -->
    <link rel="preload" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous" as="style"
    onload="this.onload=null;this.rel='stylesheet'">

    <!--    Bootstrap Icons -->
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
    
    <!-- Google Analytics Code -->
    <!-- Add your code here -->
    <!-- End Google Analytics Code -->
    
    <!-- Facebook Pixel Code -->
    <!-- Add your facebook pixel base code here -->
    <!-- End Facebook Pixel Code -->
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>

<!--Navbar -->
<nav class=" navbar navbar-expand-lg navbar-light bg-white py-0 border-bottom">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="/img/logo.webp" alt="" class="img-fluid" id="logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-column flex-lg-row mt-1" id="navbarSupportedContent">

            <div id="nav-icons" class="order-lg-last ml-lg-auto row justify-content-center">
                <form method="get" class="form-inline d-flex col-10 col-md-7 col-lg-10 col-xl-11" action="/search">
                    <div class="input-group">
                        <label for="search-nav"></label>
                        <input type="text" class="form-control" name="query" placeholder="Search" id="search-nav">
                        <div class="input-group-append">
                    <span class="input-group-text notification">
                        <button type="submit" class="formBtn searchPixel"><i class="bi bi-search mx-2 "></i></button>
                    </span>
                        </div>
                    </div>
                    
                    <i class="bi bi-heart mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#wishlist"><span class="tip">${wishlistCount(req)}</span></i>
                       
                    <i class="bi bi-cart3 mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#cart"><span class="tip">${cartCount(req)}</span></i>
                </form>
            </div>

            <ul class="navbar-nav mb-2 order-lg-first mx-lg-auto">
                <li class="nav-item mx-2">
                    <a class="nav-link pb-0" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item mx-2 dropdown">
                    <a class="nav-link dropdown-toggle pb-0" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        ${navbarDropdown(categories)}
                    </ul>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link pb-0" href="/faqs">FAQs</a>
                </li>
            </ul>


        </div>
    </div>
</nav>


${content}



<!--Footer-->
<section id="footer" class="container-fluid px-0">
    <div class="footer1 p-2 p-md-4">
        <div class="row">
            <div class="col-md-3 col-lg-2 offset-xl-2 offset-md-1">
                <div class="info-heading mb-md-2">
                    FAQS
                </div>
                <ul class="info-list">
                    <li><a href="/faqs/about">About us</a></li>
                    <li><a href="/faqs/terms">Terms and Conditions</a></li>
                    <li><a href="/faqs/deliveries">Deliveries and Payment</a></li>
                </ul>
            </div>
            <div class="col-md-5 col-lg-4 offset-lg-1 offset-xl-0">
                <div class="text-center">
                    <p id="reach">Contact us</p>
                    <p>
                        <button class="btn btn-primary phone contactPixel"><a href="tel:${process.env.PHONE}"><i
                                class="bi bi-telephone-fill"></i> Call </a></button>
                        <button class="btn btn-primary phone contactPixel"><a href="mailto:${process.env.EMAIL}"><i
                                class="bi bi-envelope-fill"></i> Mail</a></button>
                        <button class="btn btn-primary phone contactPixel"><a href="sms:${process.env.PHONE}"><i
                                class="bi bi-chat-dots-fill"></i> SMS</a></button>
                    </p>
                    <p>
                        <a href="${process.env.FACEBOOK}" target="_blank" class="contactPixel"><i class="fab fa-facebook-f"></i></a>
                        <a href="${process.env.INSTAGRAM}" target="_blank" class="contactPixel"><i class="fab fa-instagram"></i></a>
                        <a href="https://wa.me/${process.env.PHONE}" target="_blank" class="contactPixel"><i class="fab fa-whatsapp"></i></a>
                    </p>
                </div>
            </div>
            <div class="col-md-2 offset-lg-1">
                <div class="d-flex justify-content-evenly justify-content-md-between flex-md-column ">
                    ${footer(req)}
                </div>
            </div>
        </div>
    </div>

    <div class="footer2 text-center p-2">
        &copy; ${process.env.BUSINESS_NAME} <span id="copyright"> 2022</span>. All Rights Reserved.
    </div>
</section>

<!--Search overlay-->
<div id="myOverlay" class="overlay">
  <span class="closebtn" title="Close Overlay">x</span>
  <div class="overlay-content">
    <form method="get" action="/search">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="e.g iPhone 13" name="query">
          <button type="submit" class="searchPixel"><i class="bi bi-search mx-2 " style="color: black"></i></button>
        </div>
    </form>
  </div>
</div>

<!--bottom panel-->
<section id="bottom-panel" >
   <div id="wrapper">
        <div class="b-item" onclick="window.location.href='/'"><i class="fas fa-home"></i> <br>Home</div>
        <div class="b-item" onclick="window.location.href='/categories'"><i class="fas fa-list-alt"></i> <br>Categories</div>
        <div class="b-item" data-bs-toggle="modal" data-bs-target="#wishlist">                    
            <i class="fas fa-heart mx-2 notification mt-1" ><span class="tip">${wishlistCount(req)}</span></i>
            <br> Wishlist
        </div>
        <div class="b-item" data-bs-toggle="modal" data-bs-target="#cart">
            <i class="fas fa-shopping-cart mx-2 notification mt-1" ><span class="tip">${cartCount(req)}</span></i>
            <br> Cart
        </div>
        <div class="b-item" id="bpSearch"><i class="fas fa-search"></i> <br> Search</div>
   </div>
</section>




<!--Back to top -->
<a href="#" class="to-top">
    <i class="fas fa-chevron-up"></i>
</a>



<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>

<!--Custom JS -->
<script src="/js/app.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=${process.env.KEY}&callback=initMap&libraries=places&v=weekly" async defer>
</script>

<!--Modals-->
<script>
    let myModal = document.getElementById('myModal')
    let myInput = document.getElementById('myInput')

    if (myModal) {
        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus()
        })
    }
</script>

</body>
</html>

`
}
