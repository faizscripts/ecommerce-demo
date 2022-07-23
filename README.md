## About
This is a fully functional e-commerce website which is fast, has good SEO and is fully responsive across all screens. It uses Google Maps api to
calculate delivery fee and give accurate directions for efficient deliveries. The payment system is powered by daraja api which enables m-pesa, Kenya's most popular payment system. Lastly, It's integrated with Google Analytics and facebook pixel to boost sales.

At the moment, I have two variants running at real time, [Alpha Supplements]("http://alpha-supplement.com/") which sells gym accessories and [Amazon Cellular]("http://139.162.233.144/") which sells electronics. My clients are pleased with the website and have reported a smooth operation of their online businesses.

## Pre requisites for running repo
1. Node JS
2. MongoDB
3. Redis

## Project set up 

```
git clone https://github.com/faizscripts/ecommerce-demo.git
cd ecommerce-demo
npm i
npm start
```

The code will now run successfully on [home page](http://localhost:3003/). However, you will need to upload some products from the admin panel for them to show in the home page.

From the admin panel, add at least one [category](http://localhost:3003/admin/categories/new), [brand](http://localhost:3003/admin/brand/new), [special category](http://localhost:3003/admin/specials/new) (featured products, sale and new arrivals) and [product](http://localhost:3003/admin/products/new).

In order to restrict access to the admin panel to only admins, create an admin user in the [add admin page](http://localhost:3003/admin/admins/new). Open the [start-up route file](/startup/routes.js) in your code editor and uncomment the admin login middleware line named adminLoginMiddleware
```
    // uncomment the line below to restrict access to the admin panel to admins only
    // app.use(adminLoginMiddleware)
```

To enable google maps, create a .env file in the root directory and add your google maps api key

```KEY=YOUR_API_KEY```
