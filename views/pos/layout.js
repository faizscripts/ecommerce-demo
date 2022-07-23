module.exports = ({title, content}) => {
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" >

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css" >

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css">

    <!--    Font Awesome -->
    <link rel="preload" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous" as="style"
    onload="this.onload=null;this.rel='stylesheet'">

    <!--    Bootstrap Icons -->
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">

    <!--    Tables-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap5.min.css">   
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
 

    <title>${title} | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>

<!--Admin Layout-->
<section id="admin">
    <!--    Sidebar-->
    <div class="sidebar border border-end ">
        <div class="text-center mt-2 sidebarItem"><img src="/img/logo.webp" alt="Logo" class="img-fluid">
        </div>
        <h4>POS</h4>
        <div class="sidebarItem ">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action" onclick="location.href='/pos/pricelist/'">
                     Price List
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/pos/detailed/'">
                     Detailed Price List
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/pos/credit/'">
                     Credits & Debits
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/pos/inventory/'">
                     Inventory
                </li>
            </ul>
            <div class="change">
                <button class="btn btn-primary" onclick="location.href='/admin/dashboard/'">ADMIN</button>
            </div>
        </div>
    </div>

    <!--    Main Panel-->
    <div class="mainPanel">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
        <button class="btn btn-primary rounded-circle" id="sidebarToggle"><i class="fas fa-plus"></i></button>
        <a class="navbar-brand" href="#">${title}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <button class="btn btn-secondary addBtn" onclick="location.href='/pos/login/logout'">Log Out</button>
                </li>
            </ul>
        </div>
    </div>
</nav>
        
        ${content}

    </div>
</section>

<!--Footer-->
<section id="footer" class="container-fluid px-0">
    <div class="footer2 text-center p-2">
        &copy; Amazon Cellular <span id="copyright"> 2021</span>. All Rights Reserved.
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

<!--JQuery-->
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>

<!--Tables-->
<script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap5.min.js"></script>
<script >
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "num-html-pre": function ( a ) {
        var x = String(a).replace( /<[\\s\\S]*?>/g, "" );
        return parseFloat( x );
    },
 
    "num-html-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "num-html-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );

    $(document).ready(function() {
    $('#creditIndexT').DataTable( {
        "order": [[ 0, "desc" ]],
        "columnDefs": [
    { "type": "num-html", "targets": 3 }
  ],
        retrieve: true,
    } );
} );
   
    $(document).ready(function() {
    $('.fullHistoryTable').DataTable( {
        "order": [[ 0, "desc" ]]
    } );
} );
        
    $(document).ready(function() {
    $('.table:not(.NODT)').DataTable({
         retrieve: true,
    });
} );

</script>

</body>
</html>
`
}