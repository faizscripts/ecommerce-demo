const {getInput, getError}= require('../../middlewares/otherFunctions');

module.exports = ({ input, error, incorrect}) => {
    function showIncorrect(incorrect) {
        if (incorrect){
            return `
            <div class="loginError">Invalid email or password</div>
        `}
        else {
            return ` `
        }
    }


    return `

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">

    <!--    Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="/img/favicons/site.webmanifest">
    <link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!--    Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css">

    <!--    Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

    <!--    Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

    <!--    Chart JS-->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>

    <title>Admin Login | ${process.env.BUSINESS_NAME}</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>


<section class="register adminLogin">
    <div class="card" id="login_card">
        <div class="card-header">
            ADMIN LOG IN
        </div>
        <div class="card-body">
            <form method="post">
                ${showIncorrect(incorrect)}
                <div class="mb-2 form-group">
                    <label for="email" class="form-label" required>Email Address</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${getInput(input, 'email')}" required>
                    <div class="inputError">${getError(error, 'email')}</div>
                </div>
                <div class="mb-2 form-group">
                    <label for="password" class="form-label" required>Password</label>
                    <div class="d-block">
                        <input name="password" type="password" class="form-control passInput" id="password" required>
                        <i class="passIcon bi bi-eye-slash"></i>
                        <div class="inputError">${getError(error, 'password')}</div>
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="mt-1 btn btn-success" formaction="/pos/login">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</section>


<!--Back to top -->
<a href="#" class="to-top">
    <i class="fas fa-chevron-up"></i>
</a>

<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous">
</script>       

<!--Custom JS -->
<script src="/js/admin.js"></script>

</body>
</html>

`}
