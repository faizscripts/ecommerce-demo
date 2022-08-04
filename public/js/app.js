// Pre Loader
window.addEventListener("load", () => {
    let loader = document.querySelector(".loader")
    loader.classList.add("loader-finish");
});


// Back to top button
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


//load same scroll position
window.addEventListener('scroll', function () {
    localStorage.setItem('scrollPosition', window.scrollY);
}, false);
window.addEventListener('load', function () {
    if (document.referrer === window.location.href && window.location.pathname !== '/register' && window.location.pathname !== '/login' && window.location.pathname !== '/register/edit' && window.location.pathname !== '/checkout' && window.location.pathname !== '/orders' && window.location.pathname !== '/faqs') {
        if (localStorage.getItem('scrollPosition') !== null) {
            window.scrollTo(0, localStorage.getItem('scrollPosition'));
        }
    }
}, false);


// Copyright year
let year = new Date().getFullYear();
document.querySelector('#copyright').innerHTML = year;


//open modal externally
window.addEventListener('load', () => {
    let url = window.location.href;

    if (url.includes('#wishlist')) {
        let myModal = new bootstrap.Modal(document.querySelector('#wishlist'), {})
        myModal.show()
    }

    if (url.includes('#cart')) {
        let myModal = new bootstrap.Modal(document.querySelector('#cart'), {})
        myModal.show()
    }

    if (url.includes('ext')) {
        const splits = url.split('/ext/')
        const extID = splits[1]
        const modalID = '#_'.concat(extID)
        let myModal = new bootstrap.Modal(document.querySelector('.product-view'), {})
        myModal.show()
    }


})


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


//Add number in checkout page
// const addNum = document.querySelector('#add-num');
// if (addNum){
//     addNum.addEventListener('click', () => {
//         let anotherNumber = document.querySelector('.anotherNumber');
//         anotherNumber.innerHTML += `
//        <input type="number" class="form-control mb-2" id="phone" aria-describedby="phone number" placeholder="Add another number (optional)">
//     `;
//     })
// }


//calculate price on cart
const qtyInputs = document.querySelectorAll('.qty');
if (qtyInputs.length > 0) {
    const priceInputs = document.querySelectorAll('.itemPrice');
    const shopPriceInputs = document.querySelectorAll('.itemShopPrice');
    const subtotalInputs = document.querySelectorAll('.subtotal');
    const shopSubtotalInputs = document.querySelectorAll('.shopSubtotal');
    const total = document.querySelector('.total');
    const totalOutput = document.querySelector('.totalOutput')
    const shopTotalOutput = document.querySelector('.shopTotalOutput')
    let sum = 0;
    let shopSum = 0;

    for (let i = 0; i < qtyInputs.length; i++) {
        subtotalInputs[i].innerHTML = `${qtyInputs[i].value * parseInt(priceInputs[i].innerHTML)}`
        shopSubtotalInputs[i].innerHTML = `${qtyInputs[i].value * parseInt(shopPriceInputs[i].innerHTML)}`
        qtyInputs[i].addEventListener('change', evt => {
            subtotalInputs[i].innerHTML = `${evt.target.value * parseInt(priceInputs[i].innerHTML)}`
            shopSubtotalInputs[i].innerHTML = `${evt.target.value * parseInt(shopPriceInputs[i].innerHTML)}`
            sum = 0;
            shopSum = 0;

            subtotalInputs.forEach(sub => {
                sum += parseInt(sub.innerHTML);
            })
            shopSubtotalInputs.forEach(sub => {
                shopSum += parseInt(sub.innerHTML);
            })

            total.innerHTML = sum;
            totalOutput.value = sum
            shopTotalOutput.value = shopSum
        })
    }

    subtotalInputs.forEach(sub => {
        sum += parseInt(sub.innerHTML);
    })
    shopSubtotalInputs.forEach(sub => {
        shopSum += parseInt(sub.innerHTML);
    })
    total.innerHTML = sum;
    totalOutput.value = sum;
    shopTotalOutput.value = shopSum
}


//calculate price on product view
const qtyInputsPV = document.querySelectorAll('.qtyPV');
if (qtyInputsPV.length > 0) {
    qtyInputsPV.forEach(qtyInput => {
        qtyInput.addEventListener('change', event => {
            const path = event.path || (event.composedPath && event.composedPath());
            let price = path[2].children[0].children[1]
            let subtotal = path[1].children[1].children[1];

            subtotal.innerHTML = `${evt.target.value * parseInt(price.innerHTML)}`
        })
    })
}


//wishlist and cart buttons
const wishlistBtns = document.querySelectorAll('.wishlistBtn');
if (wishlistBtns.length > 0) {
    for (let i = 0; i < wishlistBtns.length; i++) {
        console.log(wishlistBtns[i]);
    }
}


//maps
let latitude = document.querySelector('#latitude')
if (latitude) {
    let map;
    let marker;
    let longitude = document.querySelector('#longitude')

    window.initMap = function initMap() {
        let shopLocation = {lat: -1.283733332480186, lng: 36.827665514486654};
        let userLocation = {lat: parseFloat(latitude.value), lng: parseFloat(longitude.value)}

        let strictBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-4.6, 33.9),
            new google.maps.LatLng(2.3, 41.3)
        );

        function getLatLng() {
            if (latitude.value) {
                return userLocation
            } else return shopLocation;
        }

        map = new google.maps.Map(document.getElementById("map"), {
            center: getLatLng(),
            restriction: {
                latLngBounds: strictBounds,
                strictBounds: true,
            },
            zoom: 15,
            mapTypeId: "roadmap",
            mapTypeControl: false,
            streetViewControl: false,
        });

        // Create the search box and link it to the UI element.
        const input = document.getElementById("pac-input");
        const options = {
            bounds: strictBounds,
            strictBounds: true,
            componentRestrictions: {country: "ke"},
        };
        const searchBox = new google.maps.places.SearchBox(input, options);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                marker.setMap(null);

                marker = new google.maps.Marker({
                    map,
                    draggable: true,
                    animation: google.maps.Animation.BOUNCE,
                    position: place.geometry.location,
                    title: "Delivery Address"
                });

                latitude.value = marker.position.lat()
                longitude.value = marker.position.lng()

                calcRoute()

                google.maps.event.addListener(marker, 'dragend', function (evt) {
                    latitude.value = evt.latLng.lat();
                    longitude.value = evt.latLng.lng();
                    calcRoute()
                });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        marker = new google.maps.Marker({
            map,
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            position: getLatLng(),
            title: "Delivery Address"
        });


        if (!latitude.value) {
            latitude.value = shopLocation.lat;
            longitude.value = shopLocation.lng;
        }

        google.maps.event.addListener(marker, 'dragend', function (evt) {
            latitude.value = evt.latLng.lat();
            longitude.value = evt.latLng.lng();
            calcRoute()
        });

        function calcRoute() {
            let directionsService = new google.maps.DirectionsService();
            let delivery_fee = document.querySelector('#delivery_fee');
            let distance = document.querySelector('#distance');
            let deliveryExplaination = document.querySelector('.deliveryExplaination');

            let request = {
                origin: shopLocation,
                destination: marker.position,
                travelMode: google.maps.TravelMode.WALKING,
                unitSystem: google.maps.UnitSystem.METRIC
            }

            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    const dist = parseFloat(result.routes[0].legs[0].distance.text)
                    let df;
                    distance.value = dist
                    if (dist <= 1) {
                        delivery_fee.value = 0
                        // deliveryExplaination.innerHTML = `FREE quick delivery within hours with an option of payment on delivery.`
                    } else if (dist <= 7) {
                        df = Math.round((dist * 62) / 50) * 50
                        // deliveryExplaination.innerHTML = `Quick delivery within hours with an option of payment on delivery.`
                        if (df < 200) {
                            delivery_fee.value = 200
                        } else {
                            delivery_fee.value = df
                        }
                    } else if (dist<=17){
                        delivery_fee.value = 400
                        // deliveryExplaination.innerHTML = `Delivery within 24 hours, payment before delivery through MPESA`
                    } else{
                        delivery_fee.value = 500
                        // deliveryExplaination.innerHTML = `Delivery may take more that 24 hours, payment before delivery through MPESA`
                    }

                    let DF = document.querySelector('#DF')
                    if (DF){
                        DF.innerHTML = delivery_fee.value

                        let ST = document.querySelector('#ST')
                        let CT = document.querySelector('#CT')
                        CT.innerHTML = parseInt(ST.innerHTML) + parseInt(DF.innerHTML);
                    }

                } else {

                    map.setCenter(shopLocation);

                    delivery_fee.value = "Unable to calculate delivery fee";
                    // deliveryExplaination.innerHTML = `An error occurred in calculating the delivery fee`
                }
            });



        }

        calcRoute()
    }
} else {
    window.initMap = function initMap(){}
}


//checkout total
let checkoutTotal = document.querySelector('#checkoutTotal');
if (checkoutTotal) {
    let cartTotal = document.querySelector('#cartTotal')
    let deliveryFee = document.querySelector('#deliveryFee')

    checkoutTotal.innerHTML = parseInt(cartTotal.innerHTML) + parseInt(deliveryFee.innerHTML);
}

//express df
let DF = document.querySelector('#DF')
if (DF){
    let ST = document.querySelector('#ST')
    let CT = document.querySelector('#CT')
    CT.innerHTML = parseInt(ST.innerHTML) + parseInt(DF.innerHTML);

    // DF.addEventListener('change', () => {
    //     CT.innerHTML = parseInt(ST.innerHTML) + parseInt(DF.innerHTML);
    // })
}


//search panel mobile
let search = document.querySelector('#bpSearch');
let searchPanel = document.querySelector('#myOverlay')
if (search) {
    search.addEventListener('click', () => {
        searchPanel.style.display = 'block'
    })
}

let closeSearch = document.querySelector('.closebtn');
if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchPanel.style.display = 'none'
    })
}


// side filter toggle
const filterButton = document.querySelector('#filterButton');
if (filterButton) {
    filterButton.addEventListener('click', (e) => {
        let categoryPage = document.querySelector('.category-main');
        e.preventDefault();
        categoryPage.classList.toggle('toggled');
    })
}


// copy to clipboard
const c2c = document.querySelectorAll('.c2cLink');
if (c2c.length > 0) {
    c2c.forEach(link => {
        link.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            navigator.clipboard.writeText(path[2].children[3].value);
            path[1].innerHTML = `<button class="c2cLink btn btn-secondary"> copied product link <i class="fas fa-clipboard c2c" ></i> </button>`
        })
    })
}


//show password
const passIcon = document.querySelector('.passIcon')
if (passIcon){
    passIcon.addEventListener('click', ()=>{
        const passInput = document.querySelector('.passInput')
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);
        passIcon.classList.toggle('bi-eye');

        const confirmPassIcon = document.querySelector('.confirmPassIcon')
        if (confirmPassIcon){
            const confirmPassInput = document.querySelector('.confirmPassInput')
            const type = confirmPassInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassInput.setAttribute('type', type);
            confirmPassIcon.classList.toggle('bi-eye');
        }
    })
}

//show confirm password
const confirmPassIcon = document.querySelector('.confirmPassIcon')
if (confirmPassIcon){
    confirmPassIcon.addEventListener('click', ()=>{
        const confirmPassInput = document.querySelector('.confirmPassInput')
        const type = confirmPassInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassInput.setAttribute('type', type);
        confirmPassIcon.classList.toggle('bi-eye');

        const passIcon = document.querySelector('.passIcon')
        const passInput = document.querySelector('.passInput')
        const type2 = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type2);
        passIcon.classList.toggle('bi-eye');
    })
}


//fb pixels
//add to wishlist
// const wishlist = document.querySelector('.wishlistPixel')
// if (wishlist){
//     wishlist.addEventListener('click', () => {
//         fbq('track', 'AddToWishlist');
//     })
// }
//
// //product view cart
// const cart = document.querySelector('.cartPixel')
// if (cart){
//     cart.addEventListener('click', () => {
//         fbq('track', 'AddToCart');
//     })
// }
//
// //initiate checkout
// const checkoutBtn = document.querySelector('.checkoutPixel')
// if (checkoutBtn){
//     checkoutBtn.addEventListener('click', () => {
//         fbq('track', 'InitiateCheckout');
//     })
// }
//
// //completed checkout
// const placeOrder = document.querySelector('#placeOrder')
// if (placeOrder){
//     placeOrder.addEventListener('click', (evt) => {
//         console.log(evt);
//         fbq('trackCustom', 'CompeletedOrder');
//     })
// }
//
// //contact us
// const contactPixel = document.querySelector('.contactPixel')
// if (contactPixel){
//     contactPixel.addEventListener('click', () => {
//         fbq('track', 'Contact');
//     })
// }
//
// //search
// const searchPixel = document.querySelector('.searchPixel')
// if (searchPixel){
//     searchPixel.addEventListener('click', () => {
//         fbq('track', 'Search');
//     })
// }
//
// //registration
// const registerPixel = document.querySelector('.registerPixel')
// if (registerPixel){
//     registerPixel.addEventListener('click', () => {
//         fbq('track', 'CompleteRegistration');
//     })
// }
//













