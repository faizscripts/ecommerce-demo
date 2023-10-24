const {printMainImage} = require('../middlewares/otherFunctions');

module.exports = function ({product}) {

    function printImages(product) {
        return product.product_images.map(productImage => {
            return `
                    <img loading="lazy" src="/img/products/${productImage.filename}" alt="" class="expressImg">
                    <br>
            `
        }).join('');
    }

    function printPricing(product) {
        const extra = Math.round(product.price * 1.18)
        return `
            <div class="text-center mt-2">
                <p class="pn">${product.product_name}</p>
                <p>was ksh.&nbsp;<span class="extra">${extra}</span></p>
                <p class="discount">Enjoy a 15% discount today (save ksh. ${extra - product.price})</p>
                <p class="kpp" style="color: #eb8334 !important;" >ksh.&nbsp;<span class="pp" style="color: #eb8334 !important;">${product.price}</span></p> 
            </div>
        `
    }

    function loopOptions(product) {
        return product.optionItems.map(option => {
                return `<option value="${option}">${option}</option>`
        }).join('')
    }

    function printOptions(product) {
        
        if (product.optionItems.length>0){
            return `                
                <div class="mb-2 form-group">
                    <label for="options" class="form-label" required>Product Options</label>
                    <select class="form-select" id="options" name="options" required>
                        <option value="">-Select an option-</option>
                        ${loopOptions(product)}
                    </select>
                </div>`
        } else return ''
    }


    return  `
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-W552T52XSW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-W552T52XSW');
</script>

    <!-- Required meta tags -->
    <title>Express Checkout | ${process.env.BUSINESS_NAME}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="${process.env.META_DESCRIPTION}">
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
    
    <!-- Facebook Pixel Code -->
<meta name="facebook-domain-verification" content="2rf0ktgb9eormrp55idv5uuhgvmtd6" />

<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1557304177945106');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1557304177945106&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
</head>
<body>


<div class="quick">
        <div class="quick-product-view">
        <div class="logoContainer">
                <img loading="lazy" src="/img/logo.jpg" alt="" class="qlogo">  
        </div>
                <div class="product-name text-center">${product.product_name}</div>
                <div class="expressImgContainer">${printImages(product)}</div>
                <div class="why-us">
                            <h4 class="ytitle">Why ${process.env.BUSINESS_NAME}</h4>
                            <ul>
                                <li>Quality assurance with money back guaranteed in the case the product received isn't as specified</li>
                                <li>Quick countrywide deliveries to your doorstep within 24 hours of order placement</li>  
                                <li> FREE countrywide shipment with payment on delivery option available for orders within Nairobi</li>                          
                            </ul>
                        </div>   
                ${printPricing(product)}   
                <div class="mainImgContainer">
                    <img loading="lazy" src="/img/products/${printMainImage(product)}" alt="" class="expressImg">
                </div> 
        </div>
        <form method="POST" action="/quick/${product._id}" class="quick-register ">
                <h4 class="ytitle">SHIPMENT DETAILS</h4>
                ${printOptions(product)}
                <div class="mb-2 form-group">
                    <label for="fullname" class="form-label" required>Name</label>
                    <input name="fullname" type="fullname" class="form-control" id="fullname" aria-describedby="name" required>
                </div>
                <div class="row mt-3">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="email" class="form-label" required>Email</label>
                        <input name="email" type="email" class="form-control" id="email" aria-describedby="name" required>
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="fullname" type="text" class="form-control" id="fullname" aria-describedby="name" required>
                    </div>  
                </div>
                <div class="mb-2 form-group">
                    <label for="address" class="form-label" required>Shipping Address</label>
                </div>
                <input id="pac-input" class="controls border border-dark border-3" type="text" aria-describedby="address" placeholder="Search">
                <div id="map" class="form-control"></div>
                <input type="hidden" name="latitude" id="latitude">
                <input type="hidden" name="longitude" id="longitude">
                <input name="delivery_fee" type="hidden" class="form-control" id="delivery_fee" aria-describedby="name"  readonly>
                <input type="hidden" id="distance" name="distance">
                
                
                <div class="text-center my-5">
                    <button type="submit" class="btn btn-lg btn-success" id="placeOrder">PLACE ORDER </button>
                </div>
            </form>
</div>



<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>
        
<!--Custom JS -->
<script src="/js/quick.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=${process.env.KEY}&callback=initMap&libraries=places&v=weekly" async defer>
</script>


</body>
</html>
      
        `}
