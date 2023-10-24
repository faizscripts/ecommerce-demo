module.exports = ({existing, newD}) => {

    function printDuplicateTable(existing, newD) {
        return `
            <tr>
                <td><b>Name</b></td>
                <td style="text-transform: capitalize;">${existing.debtor.toLowerCase()}</td>
                <td style="text-transform: capitalize;">${newD.debtor.toLowerCase()}</td>
            </tr>
            <tr>
                <td><b>Phone</b></td>
                <td>0${existing.phone}</td>
                <td>${newD.phone}</td>
            </tr>
            <tr>
                <td><b>Amount</b></td>
                <td>${existing.amount}</td>
                <td>${newD.amount}</td>
            </tr>
        `
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

    <title>Existing Duplicate | ${process.env.BUSINESS_NAME}</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>


<section class="register adminLogin">
    <div class="card" id="login_card">
        <div class="card-header">
            EXISTING DUPLICATE
        </div>
        <div class="card-body">
            <p>A record with a similar name or phone number already exists</p>
            <table class="table table-hover table-bordered mt-2">
                <thead>
                <tr class="table-dark">
                    <th scope="col"></th>
                    <th scope="col">Existing</th>
                    <th scope="col">New</th>
                </tr>
                </thead>
                <tbody> 
                    ${printDuplicateTable(existing,newD)}
                </tbody>
            </table>    
            <div class="d-flex justify-content-evenly">
                <button class="btn btn-success" onclick="location.href='/pos/credit/join'">Join</button>
                <button class="btn btn-secondary" onclick="location.href='/pos/credit/cancel'">Cancel</button>
            </div>
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
