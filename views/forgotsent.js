module.exports = ({email}) => {
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <title>Email Sent | ${process.env.BUSINESS_NAME}</title>
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



<div class="d-flex justify-content-center align-items-center" style="height: 100vh; width: 100vw">        
            <div class="card text-center">
          <div class="card-body">
            <p class="card-text p-2">An email has been sent to ${email} with instructions on how to reset your password.</p>
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