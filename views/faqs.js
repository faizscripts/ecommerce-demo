const {printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'FAQS'

module.exports = ({req, wishlist, cart, header, categories}) => {

    function printAccordion(header) {
        switch (header) {
            case 'about':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse show" aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
        
                `
            case 'terms':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse" aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website. </p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'demo':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse" aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website. </p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse show" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'reg':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse show" aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'search':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'add':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'checkout':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            case 'deliveries':
                req.session.faq = 'default'
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>
                `
            default:
                return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingZero">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                    About us
                </button>
            </h2>
            <div id="collapseZero" class="accordion-collapse collapse " aria-labelledby="aboutUS"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>
                        Amazon Cellular Outfitters is an online as well as physical shop based in Nairobi Kenya. We
                        focus on
                        selling accessories for phones, tablets, smart watches, cameras, car, computer and TVs. Phone
                        accessories
                        are further subdivided to cases, power devices such as power banks, protectors and audio devices
                        like
                        earphones.
                    </p>
                    <p>
                        With an easy to use website, we're committed to providing our users with quality accessories at
                        your door
                        step with payment options that are most convenient to our customers. We make deliveries to all
                        counties in Kenya.
                    </p>
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=-1.283733332480186%2C36.827665514486654&travelmode=driving" target="_blank">Get directions to our physical shop</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Terms and conditions
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                        <p>Amazon Cellular Outfitters (“website”) is a physical and online store which sells mobile, tablets, smart watches, car and computers accessories in Kenya. By using our website, you accept these terms and conditions in full. Do not use the website If you disagree with these terms and conditions or any part of these terms and conditions.</p>
                        <ol>
                            <li>User data provided during registration will ONLY be used to facilitate easy and efficient deliveries to the customer.</li>
                            <li>We may suspend or cancel your account, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these terms and conditions, we will refund you in respect of the same.</li>
                            <li>Products must be of satisfactory quality, fit and safe for any purpose specified in, and conform in all material respects to, the product listing and any other description of the product.</li>
                            <li>No extra charges will be billed to the customer other than what is stated in the order placed.</li>
                            <li>Payment on delivery only applies to deliveries within a 7km radius from Nairobi Central Business District. Users shall be asked to pay via mpesa to till number 9180681 registered as Yassin Faiz. This is to enable cheaper delivery prices to distant places as the deliveries require payment beforehand. </li>
                            <li>We only accept returned goods if the seal is not yet broken. We however assure you that our products are of high quality and returning products is a rare thing.</li>
                            <li>Orders will be processed and delivered to the customer in the shortest time possible. In the case of delays, a full refund will be issued if the order is not processed within 2 weeks of placing the order.</li>
                            <li>We may revise these terms and conditions from time to time. The revised terms and conditions shall apply from the date of publication on the website</li>
                        </ol>
                    
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThreeVid" aria-expanded="false" aria-controls="collapseThree">
                    video guide
                </button>
            </h2>
            <div id="collapseThreeVid" class="accordion-collapse collapse " aria-labelledby="headingThree"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <iframe width="270" height="540" src="https://www.youtube.com/embed/uCpxKfBrX7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="reg">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#regLog"
                        aria-expanded="true" aria-controls="regLog">
                    How to Register/ Login
                </button>
            </h2>
            <div id="regLog" class="accordion-collapse collapse " aria-labelledby="reg"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="regAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseOne" aria-expanded="false"
                                        aria-controls="regCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="regCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="regheadingOne" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rm1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rm2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rm3.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rm4.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="regheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#regCollapseTwo" aria-expanded="false"
                                        aria-controls="regCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="regCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="regheadingTwo" data-bs-parent="#regAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the register and login button at the top most bar on all
                                                    pages.
                                                    <img loading="lazy" src="/img/faqs/rl1.webp" alt=""
                                                         class="faqLgImage border border-1">
                                                </li>
                                                <li>
                                                    At the footer of every page there is another set of register and
                                                    login buttons
                                                    <img loading="lazy" src="/img/faqs/rl2.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    For registering as a new user, enter your details namely: name,
                                                    email address, phone number (safaricom number if you want to use
                                                    mpesa payments), password and pin the location where you want to
                                                    receive your deliveries then submit.
                                                    <img loading="lazy" src="/img/faqs/rl3.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">

                                                </li>
                                                <li>
                                                    For an already existing user, enter your email and password to
                                                    login.
                                                    <img loading="lazy" src="/img/faqs/rl4.webp" alt=""
                                                         class="faqLgImage border border-1" style="height: 100%">
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to find products
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="accordion" id="searchAcc">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseOne" aria-expanded="false"
                                        aria-controls="searchCollapseOne">
                                    Mobile devices
                                </button>
                            </h2>
                            <div id="searchCollapseOne" class="accordion-collapse collapse"
                                 aria-labelledby="searchheadingOne" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>
                                            <ul>
                                                <li>
                                                    Click the search button on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms1.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                                <li>
                                                    Click the search bar that pops up, enter the name of the product you
                                                    want to search for.
                                                    <img loading="lazy" src="/img/faqs/ms2.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    Products are grouped in categories. You can find a product from the
                                                    category tiles on the home screen.
                                                    <div class="d-flex justify-content-start">
                                                        <img loading="lazy" src="/img/faqs/ms3.webp" alt=""
                                                             class="faqMobileImage border border-1">
                                                        <img loading="lazy" src="/img/faqs/ms4.webp" alt=""
                                                             class="faqMobileImage border border-1 ms-3 ms-lg-5">
                                                    </div>
                                                </li>
                                                <li>
                                                    You can also view the categories by clicking the categories button
                                                    on the bottom panel.
                                                    <img loading="lazy" src="/img/faqs/ms5.webp" alt=""
                                                         class="faqMobileImage border border-1">
                                                </li>
                                            </ul>
                                        </li>
                                        <li>The home page contains a special categories section which display products
                                            which are featured, new arrivals and on sale.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="searchheadingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#searchCollapseTwo" aria-expanded="false"
                                        aria-controls="searchCollapseTwo">
                                    Tablets, Computers and other large screen devices
                                </button>
                            </h2>
                            <div id="searchCollapseTwo" class="accordion-collapse collapse "
                                 aria-labelledby="searchheadingTwo" data-bs-parent="#searchAcc">
                                <div class="accordion-body">
                                    <ol>
                                        <li>There's a search bar on the navigation bar in each page, enter the name of
                                            product you want to search for.
                                            <img loading="lazy" src="/img/faqs/ls1.webp" alt=""
                                                 class="faqLgImage border border-1">
                                        </li>
                                        <li>The navigation bar on all pages contains a dropdown list of categories which
                                            one can select then narrow down to the product they're looking for.
                                        </li>
                                        <li>The home page contains tiles of all the categories. One can select this to
                                            get to the product they are looking for.
                                        </li>
                                        <img loading="lazy" src="/img/faqs/ls2.webp" alt=""
                                             class="faqLgImage border border-1" style="height: 100%">
                                        <li>The home page contains a special category for Featured Products, New
                                            Arrivals and items that are on Sale.
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to add a product to wishlist or cart 
                </button>
            </h2>
            <div id="collapseOne2" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Once you've found the item you want to order, the item display contains two buttons, a ❤
                            which adds the item to your Wishlist (a place where you place items that you like and wish
                            to buy in the
                            future) and a 🛒 which adds the item to your cart
                            <img loading="lazy" src="/img/faqs/c1.webp" alt="" class="faqMobileImage border border-1"
                                 style="height: 28rem">
                        </li>
                        <li>You can also click on the product to view more details and in the products view page you
                            will be given an option to add the item to your wishlist or cart
                            <img loading="lazy" src="/img/faqs/c2.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For mobile devices, the bottom panel has a wishlist button and a cart button which enables
                            you to view the items in your wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c3.webp" alt="" class="faqMobileImage border border-1">
                        </li>
                        <li>For tablets, computers and other large screen devices, the navigation bar at the top of the
                            page has a wishlist button and a cart button which enables you to view the items in your
                            wishlist and cart respectively
                            <img loading="lazy" src="/img/faqs/c4.webp" alt="" class="faqLgImage border border-1"
                                 style="height: 100%">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne3"
                        aria-expanded="true" aria-controls="collapseOne">
                    How to checkout
                </button>
            </h2>
            <div id="collapseOne3" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ol>
                        <li>
                            You need to be logged in order to check out.
                        </li>
                        <li>
                            <ul>
                                <li>
                                    The top most part of every page gives you a checkout button.
                                    <img loading="lazy" src="/img/faqs/k1.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    The product view page contains a checkout button
                                    <img loading="lazy" src="/img/faqs/k2.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                                <li>
                                    Viewing your cart from the bottom panel for mobiles or from the navigation bar for large screens gives you a checkout button. Here you can modify ypur cart by changing the quantity you want to buy or removing items from your cart. This page also shows you the total cash due for your cart. Click checkout to proceed.
                                    <img loading="lazy" src="/img/faqs/k3.webp" alt=""
                                         class="faqMobileImage border border-1">
                                </li>
                            </ul>
                        </li>
                        <li>
                            Once at the checkout page, you will see your contact information and an option to modify it. Details of the cart your checking out will also be shown to you for one last confirmation. You will also be given an option to choose your prefered payment method. Note that payment on delivery is only available for Nairobi and its environs. Below the payment methods is s subtotal of your order, delivery fee and the final total. Click the place order button to confirm your order.
                            <img loading="lazy" src="/img/faqs/k4.webp" alt="" class="faqLgImage border border-1" style="height: 100%">

                        </li>
                        
                    </ol>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Deliveries and Payment 
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Delivery fee is calculated based on the distance of the delivery location and our physical shop which is at Munyu Road, Nairobi CBD.</li>
                        <li>For orders within a radius of 7km from Nairobi CBD, payment on delivery option is available. However, for areas outside that, payment has to be made before delivery in order to cater for the cheaper long distance delivery fee. This payment will be made via mpesa to till number 9180681 registered as Yassin Faiz. </li>
                        <li>Same day deliveries for Nairobi metropolitan orders placed before 12.30pm and deliveries within 24 hours for orders after.</li>
                    </ul>
                </div>
            </div>
        </div>    
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