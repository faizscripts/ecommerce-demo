module.exports = ({confirmationError}) => {

    function printConfirmationError(confirmationError) {
        if (confirmationError) {
            return `
                <p class="card-text mb-2" id="paymentError" style="text-transform: uppercase;">Payment confirmation failed. <br> Make sure you received your mpesa message then try again.</p>
            `
        } else return ``
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <title>Confirmation | Amazon Cellular Outfitters</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="Quality accessories for phones and tablets (cases, screen protectors, audio, power), smart watches, cameras, cars and computers">
    <meta name="keywords" content="kenya, e-commerce, online, cases, screen protectors, audio, earphones, earbuds, apple, iphone, power bank, smart watch, camera, accessories, car, computer, premium, quality">
    <meta property="og:image" content="/img/logosq.webp">
    <meta name="author" content="Faiz Ahmed">

    <!--    Favicon -->
    <link rel="icon" href="/img/favicon.ico">

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
</head>
<body>



<div class="adminLogin"">        
            <div class="card text-center">
          <div class="card-body">
            ${printConfirmationError(confirmationError)}
            <p class="card-text">Confirm the payment once you've received the mpesa message.</p>
            <p class="card-text">In case of any issue with the payment please reach out to us for assistance.</p>
            <p class="card-text d-flex justify-content-evenly">
                        <button class="btn btn-primary btn-sm"><a href="tel:+254792200373" style="text-decoration: none; color: inherit;"><i
                                class="bi bi-telephone-fill"></i> Call </a></button>
                        <button class="btn btn-primary btn-sm "><a href="mailto:amazon.cellular.outfitters@gmail.com" style="text-decoration: none; color: inherit;"><i
                                class="bi bi-envelope-fill"></i> Mail</a></button>
                        <button class="btn btn-primary btn-sm"><a href="sms:+254792200373" style="text-decoration: none; color: inherit;"><i
                                class="bi bi-chat-dots-fill"></i> SMS</a></button>
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between" style="background: white">
            <button class="btn btn-success" onclick="location.href='/orders/confirm'">Confirm Payment</button>
            <button class="btn btn-danger" onclick="location.href='/orders/cancel'">Cancel</button>
          </div>
    </div>
</div>




<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>


</body>
</html>

`
}