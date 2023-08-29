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
 

    <title>${title} | ${process.env.BUSINESS_NAME}</title>
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
        <h4>ADMIN</h4>
        <div class="sidebarItem ">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/admins/'">
                     Admins
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/brands/'">
                     Brands
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/categories/'">
                     Categories
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/customers/'" >
                     Customers
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/dashboard/'">
                     Dashboard
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/orders/'">
                    <div>Orders</div></li>
                <li class="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#productsMenu">
                     Products<i class="fas fa-caret-down ms-1"></i>
                </li>
                <div class="collapse collapseMenu" id="productsMenu">
                    <div class="card card-body">
                        <ul class="mt-0 px-0">
                            <li class="list-group-item list-group-item-action" onclick="location.href='/admin/products/'">Populated  </li>
                            <li class="list-group-item list-group-item-action" onclick="location.href='/admin/products/unpopulated'">Unpopulated  </li>
                        </ul>
                    </div>
                </div>
                <li class="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#reportsMenu">
                     Reports <i class="fas fa-caret-down ms-1"></i>
                </li>
                <div class="collapse collapseMenu" id="reportsMenu">
                    <div class="card card-body">
                        <ul class="mt-0 px-0">
                            <li class="list-group-item list-group-item-action" onclick="location.href='/admin/reports/'">Internal Analytics</li>
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Google Analytics</li></a>
                            <a href="#" class="reportsLinks" target="_blank"><li class="list-group-item list-group-item-action">Ad Manager</li></a>
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Expense Sheet</li></a>                     
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Google Maps</li></a>
                        </ul>
                    </div>
                </div>
                <li class="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#socialsMenu">
                     Socials<i class="fas fa-caret-down ms-1"></i>
                </li>
                <div class="collapse collapseMenu" id="socialsMenu">
                    <div class="card card-body">
                        <ul class="mt-0 px-0">
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Facebook</li></a>                        
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Instagram</li></a>
                            <a href="#" target="_blank" class="reportsLinks"><li class="list-group-item list-group-item-action">Twitter</li></a>
                        </ul>
                    </div>
                </div>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/special/'">
                     Special Categories
                </li>
            </ul>
            <div class="change">
                <button class="btn btn-primary" onclick="location.href='/pos/pricelist/'">POS</button>
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
                    <button class="btn btn-primary addBtn" onclick="location.href='/admin/products/new'">Add Product</button>
                </li>
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
        &copy; ${process.env.BUSINESS_NAME} <span id="copyright"> 2021</span>. All Rights Reserved.
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
    
    $(document).ready(function() {
    $('#newOrderPTable').DataTable( {
    pageLength : 3,
    lengthMenu: [[3, 10, 50], [3, 10, 50]]
    } );
} );
    
    $(document).ready(function() {
    $('#orderViewT').DataTable( {
        "order": [[ 0, "desc" ]],
        retrieve: true,
    } );
} );
    
    $(document).ready(function() {
    $('#customersT').DataTable( {
        "order": [[ 5, "desc" ]],
        retrieve: true,
    } );
} );
    
    $(document).ready(function() {
    $('.table:not(#dashorders,#brandsT,#adminT,#addProductT, #bestp, #worstp)').DataTable({
         retrieve: true,
    });
} );
    

</script>

</body>
</html>
`
}
