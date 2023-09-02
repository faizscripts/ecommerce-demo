# About
This is a fully functional e-commerce website created using HTML, Sass, JS, Node and MongoDB. It is fast, has good SEO and is fully responsive across all screens. It uses Google Maps api to
calculate delivery fee and give accurate directions for efficient deliveries. The payment system is powered by daraja api which enables m-pesa, Kenya's most popular payment system. Lastly, It's integrated with Google Analytics and Facebook Pixel to boost sales.

At the moment, the following variants running at real time:
1. [Alpha Supplements](https://alpha-supplement.com/)  - gym accessories 
2. [Black dot digital](https://blackdotdigital.co.ke/) - electronics 
3. [Monza](https://monza.co.ke/) - perfumes
4. [Marikiti](https://marikiti-mombasa.com/) - groceries
5. [Tijara](https://tijara.co.ke/) - general marketplace

My clients are pleased with the website and have reported a smooth operation of their online businesses.

# Important Links
- [User side live demo](https://ecommerce.faizscripts.com/)
- [Admin side live demo](https://ecommerce.faizscripts.com/admin/dashboard)
- [YouTube video guide of how to set up the project with a demo of the site](https://youtu.be/La23zzDlVys)

# Pre requisites for running repo
1. Node JS
2. MongoDB
3. Redis

NB: These are a MUST and the project won't be able to run without them. Please make sure that they are all correctly installed.

# Project set up 

Run the following commands in your terminal.

```
git clone https://github.com/faizscripts/ecommerce-demo.git
cd ecommerce-demo
npm i
```

In the root directory of the project, create a .env file. This file is git ignored therefore it is safe to store our api keys and important private data. For now, in the .env file we've created, we will start with the name of the business we're running.

```
BUSINESS_NAME=YOUR_BUSINESS_NAME
```

We will then start the app by running the command below in the terminal.

```
npm start
```

The code will now run successfully on [home page](http://localhost:3000/). It will also create a database in your MongoDB instance named ecommerceDB. However, you will need to upload some products from the admin panel for them to show in the database and subsequently show in the home page.

From the admin panel, add at least one [category](http://localhost:3000/admin/categories/new), [brand](http://localhost:3000/admin/brands/new), [special category](http://localhost:3000/admin/special/new) (e.g. featured products, sale and new arrivals shown at the home page to increase visibility of the products) and [product](http://localhost:3000/admin/products/new).

After finishing uploading your products, you can enable a shuffle of the special categories on the home page which refreshes after an hour. For this, comment or delete the line below in the [routes index file (/routes/index.js)](/routes/index.js)
```
    // uncomment or delete the line below once finished setting up all products to enable shuffling of special categories products
    throw "delete this once finished uploading products"
```

In order to restrict access to the admin panel to only admins, create an admin user in the [add admin page](http://localhost:3000/admin/admins/new). Open the [start-up route file (/startup/routes.js)](/startup/routes.js) in your code editor and uncomment the admin login middleware line named adminLoginMiddleware.
```
    // uncomment the line below to restrict access to the admin panel to admins only
    // app.use(adminLoginMiddleware)
```

# Enabling APIs

## 1. Google Maps

To enable Google Maps, create a Google Maps api key from [Google Developers Console](https://console.developers.google.com/) and enable the apis named below:
1. Directions API
2. Maps JavaScript API
3. Places API
4. Geocoding API

Copy and paste your api key in the .env file created above. 

```KEY=YOUR_API_KEY```

**NOTE! This is an important step for the smooth running of the app and should NOT be skipped.**

## 2. Emails

This will send emails when a new customer registers on the system, placement of a new order and updates on order status, forgot password emails and low product quantity emails. To configure this, add the following data to the .env file we created earlier (this works for gmail. For other emails consult [Nodemailer docs](https://nodemailer.com/about/)). **For the password, open [my Google account security](https://myaccount.google.com/intro/security), enable 2-step verification and create a new app password.** 

```
EMAIL=YOUR_EMAIL
APP_PASSWORD=APP_PASSWORD
```

## 3. Google Analytics

Create a Google Analytics account and set up your property.

Choose web platform and set up your data stream.

In tagging instructions, choose add new on-page tag. Click Global site tag (gtag.js), copy the code shown and paste it in the head tag of [layout page (/views/layout.js)](/views/layout.js)

```
<!-- Google Analytics Code -->
<!-- Add your code here -->
<!-- End Google Analytics Code -->
```

## 4. Facebook Pixel

To enable Facebook Pixel, first verify your domain in business manager. 

Create a Facebook Pixel in your Ad Manager for web. Select set up manually and copy the base code in the head of [/views/layout.js](/views/layout.js).

```
<!-- Facebook Pixel Code -->
<!-- Add your facebook pixel base code here -->
<!-- End Facebook Pixel Code -->
</head>
```

This repository currently supports the following events: search, add to wishlist, add to cart, initiate checkout, purchase and complete registration. Select the ones you prefer (only allowed to choose 8).

Event details customer information parameters supported:
1. Add to cart - Client IP address, client user agent, external ID and country.
2. Add to wishlist - Client IP address, client user agent, external ID and country.
3. Complete registration - Client IP address, client user agent, country, phone number and email address.
4. Initiate checkout - Client IP address, client user agent, external ID and country.
5. Purchase - Client IP address, client user agent, country, phone number and email address.
6. Search - external ID and country.

In the see instructions step, choose manually implement the API and open the implementation guide. Generate an access token and paste it in the .env file as below. You can also add you facebook pixel ID to the .env file at this point.

```
PIXEL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
PIXEL_ID=YOUR_PIXEL_ID
```

Based on the events you have chosen, activate the tracking by uncommenting the facebook pixel code in the files shown below. 

1. [Add to cart (/routes/cart.js)](/routes/cart.js)
2. [Add to wishlist (/routes/wishlist.js)](/routes/wishlist.js)
3. [Complete registration (/routes/register.js)](/routes/register.js)
4. [Initiate checkout (/middlewares/logged.js)](/middlewares/logged.js)
5. [Purchase (/routes/orders.js)](/routes/orders.js)
6. [Search (/routes/search.js)](/routes/search.js)

```
//Start of add to cart pixel code, uncomment the code below to activate the tracking

/* pixel code is between these two tags */

//End of add to cart pixel code
```

# Footnote
For a complete set-up, please make sure you have filled the following correctly in your .env file

```
BUSINESS_NAME='My Business'
KEY='Google API key'
EMAIL=someone@gmail.com
APP_PASSWORD='gmail app password'
PHONE=+254712345678
FACEBOOK=https://facebook.com/
INSTAGRAM=https://instagram.com/
DOMAIN=https://domain.com
ABOUT="About the business"
TERMS="Terms and conditions"
DELIVERIES="Delivery instructions"
SHOP_LATITUDE='1.2345'
SHOP_LONGITUDE='1.2345'
MPESA_INSTRUCTIONS='Buy goods till number 12345678, forward mpesa message to 0712345678'
```

