//maps
let latitude = document.querySelector('#latitude')
if (latitude) {
    let map;
    let marker;
    let longitude = document.querySelector('#longitude')

    function initMap() {
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
                    } else if (dist <= 15) {
                        df = Math.round((dist * 62) / 50) * 50
                        // deliveryExplaination.innerHTML = `Quick delivery within hours with an option of payment on delivery.`
                        if (df < 200) {
                            delivery_fee.value = 200
                        } else {
                            delivery_fee.value = df
                        }
                    } else if (dist<=15){
                        delivery_fee.value = 500
                        // deliveryExplaination.innerHTML = `Delivery within 24 hours, payment before delivery through MPESA`
                    } else{
                        delivery_fee.value = 600
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
}