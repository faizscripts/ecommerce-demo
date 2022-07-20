const layout = require('./layout');
const title = 'Internal Analytics'
const {displayDate, displayMonth} = require('../../middlewares/otherFunctions')

module.exports = ({orders, customers, categories, brands}) => {

    function allProductsDaily(orders) {
        let today = new Date();
        let data = {
            date: [],
            income: [],
            ordersCount: []
        }

        let specialSum=0;
        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = displayDate(special2)
        let special4 = special2.getDate()
        orders.forEach(order => {
            if (displayDate(order.orderDate) === special3){
                specialSum += (order.total - order.shopTotal)
                specialCount++
            }
        })

        data.date.push(special4)
        data.income.push(specialSum)
        data.ordersCount.push(specialCount)


        for (let i=0; i<=29; i++){
            let sum =0;
            let count = 0;
            let dayReformat =  today.setDate(today.getDate()-1);
            let dayReformat2 = new Date(dayReformat)
            let dayReformat3 = dayReformat2.setHours(0,0,0)
            let dayReformat4 = new Date(dayReformat3)
            let dayReformat5 = displayDate(dayReformat4)
            let dayReformat6 = dayReformat4.getDate()


            orders.forEach(order => {
                let reformat = displayDate(order.orderDate)

                if (reformat === dayReformat5){
                    sum += (order.total - order.shopTotal)
                    count++
                }
            })

            data.date.push(dayReformat6)
            data.income.push(sum)
            data.ordersCount.push(count)
        }

        return data
    }

    function allProductsMonthly(orders) {
        let today = new Date();
        let data = {
            date: [],
            income: [],
            ordersCount: []
        }

        let specialSum=0;
        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = displayMonth(special2)
        let special4 = special2.getMonth()+1
        orders.forEach(order => {
            if (displayMonth(order.orderDate) === special3){
                specialSum += (order.total - order.shopTotal)
                specialCount++
            }
        })

        data.date.push(special4)
        data.income.push(specialSum)
        data.ordersCount.push(specialCount)

        for (let i=0; i<=10; i++){
            let sum =0;
            let count = 0;
            let monthReformat =  today.setMonth(today.getMonth()-1);
            let monthReformat2 = new Date(monthReformat)
            let monthReformat3 = monthReformat2.setHours(0,0,0)
            let monthReformat4 = new Date(monthReformat3)
            let monthReformat5 = displayMonth(monthReformat4)
            let monthReformat6 = monthReformat4.getMonth()+1


            orders.forEach(order => {
                let reformat = displayMonth(order.orderDate)

                if (reformat === monthReformat5){
                    sum += (order.total - order.shopTotal)
                    count++
                }
            })


            data.date.push(monthReformat6)
            data.income.push(sum)
            data.ordersCount.push(count)
        }

        return data
    }

    function customersRegDaily(customers) {
        let today = new Date();
        let data = {
            date: [],
            customerCount: []
        }

        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = displayDate(special2)
        let special4 = special2.getDate()
        customers.forEach(customer => {
            if (displayDate(customer.dateCreated) === special3){
                specialCount++
            }
        })

        data.date.push(special4)
        data.customerCount.push(specialCount)

        for (let i=0; i<=30; i++){
            let count = 0;
            let dayReformat =  today.setDate(today.getDate()-1);
            let dayReformat2 = new Date(dayReformat)
            let dayReformat3 = dayReformat2.setHours(0,0,0)
            let dayReformat4 = new Date(dayReformat3)
            let dayReformat5 = displayDate(dayReformat4)
            let dayReformat6 = dayReformat4.getDate()


            customers.forEach(customer => {
                let reformat = displayDate(customer.dateCreated)

                if (reformat === dayReformat5){
                    count++
                }
            })


            data.date.push(dayReformat6)
            data.customerCount.push(count)
        }

        return data
    }

    function customersRegMonthly(customers) {
        let today = new Date();
        let data = {
            date: [],
            customersCount: []
        }

        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = displayMonth(special2)
        let special4 = special2.getMonth()+1
        customers.forEach(customer => {
            if (displayMonth(customer.dateCreated) === special3){
                specialCount++
            }
        })

        data.date.push(special4)
        data.customersCount.push(specialCount)

        for (let i=0; i<=10; i++){
            let count = 0;
            let monthReformat =  today.setMonth(today.getMonth()-1);
            let monthReformat2 = new Date(monthReformat)
            let monthReformat3 = monthReformat2.setHours(0,0,0)
            let monthReformat4 = new Date(monthReformat3)
            let monthReformat5 = displayMonth(monthReformat4)
            let monthReformat6 = monthReformat4.getMonth()+1


            customers.forEach(customer => {
                let reformat = displayMonth(customer.dateCreated)

                if (reformat === monthReformat5){
                    count++
                }
            })


            data.date.push(monthReformat6)
            data.customersCount.push(count)
        }

        return data
    }

    function timeStats(orders) {
        let today = new Date();
        let data = {
            date: [],
            income: [],
            ordersCount: []
        }

        let specialSum=0;
        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = special2.getHours()
        orders.forEach(order => {
            if (order.orderDate.getHours() === special3){
                specialSum += (order.total - order.shopTotal)
                specialCount++
            }
        })

        data.date.push(special3)
        data.income.push(specialSum)
        data.ordersCount.push(specialCount)

        for (let i=0; i<=22; i++){
            let sum =0;
            let count = 0;
            let hourReformat =  today.setHours(today.getHours()+1);
            let hourReformat2 = new Date(hourReformat)
            let hourReformat3 = hourReformat2.getHours()


            orders.forEach(order => {
                let reformat = order.orderDate.getHours()

                if (reformat === hourReformat3){
                    sum += (order.total - order.shopTotal)
                    count++
                }
            })


            data.date.push(hourReformat3)
            data.income.push(sum)
            data.ordersCount.push(count)
        }

        return data
    }

    function dayStats(orders) {
        let today = new Date();
        let data = {
            date: [],
            income: [],
            ordersCount: []
        }

        let specialSum=0;
        let specialCount=0;
        let special = today.setHours(0,0,0)
        let special2 = new Date(special)
        let special3 = special2.getDay()
        let days = ["'Sun'", "'Mon'", "'Tue'", "'Wed'", "'Thu'", "'Fri'", "'Sat'"];
        let d = new Date(special2);
        let dayName = days[d.getDay()];
        orders.forEach(order => {
            if (order.orderDate.getDay() === special3){
                specialSum += (order.total - order.shopTotal)
                specialCount++
            }
        })

        data.date.push(dayName)
        data.income.push(specialSum)
        data.ordersCount.push(specialCount)

        for (let i=0; i<=5; i++){
            let sum =0;
            let count = 0;
            let dayReformat =  today.setDate(today.getDate()+1);
            let dayReformat2 = new Date(dayReformat)
            let dayReformat3 = dayReformat2.setHours(0,0,0)
            let dayReformat4 = new Date(dayReformat3)
            let dayReformat5 = dayReformat4.getDay()
            let days = ["'Sun'", "'Mon'", "'Tue'", "'Wed'", "'Thu'", "'Fri'", "'Sat'"];
            let d = new Date(dayReformat4);
            let dayName = days[d.getDay()];


            orders.forEach(order => {
                let reformat = order.orderDate.getDay()

                if (reformat === dayReformat5){
                    sum += (order.total - order.shopTotal)
                    count++
                }
            })


            data.date.push(dayName)
            data.income.push(sum)
            data.ordersCount.push(count)
        }

        return data
    }

    function catStats(categories) {
        let data = {
            name: [],
            income: [],
            unitsSold: []
        }

        categories.forEach(category => {
            data.name.push('"'.concat(category.category_name.split(' ')[0]).concat('"') );
            data.income.push(category.income)
            data.unitsSold.push(category.unitsSold)
        })

        return data;
    }

    function brandStats(brands) {
        let data = {
            name: [],
            income: [],
            unitsSold: []
        }

        brands.forEach(brand => {
            data.name.push('"'.concat(brand.brand_name.split(' ')[0]).concat('"') );
            data.income.push(brand.income)
            data.unitsSold.push(brand.unitsSold)
        })

        return data;
    }



    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card report-section">
    <h2 class="rheading">ALL PRODUCTS STATS</h2>
    <div class="row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="categoriesIncome"></canvas>
                <script>

                    const ci = document.getElementById('categoriesIncome').getContext('2d');
                    const cio = new Chart(ci, {
                        type: 'line',
                        data: {
                            labels: [${allProductsDaily(orders).date}],
                            datasets: [{
                                label: 'Daily Income',
                                data: [${allProductsDaily(orders).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="categoriesOrders"></canvas>
                <script>
                    const co = document.getElementById('categoriesOrders').getContext('2d');
                    const coc = new Chart(co, {
                        type: 'line',
                        data: {
                            labels: [${allProductsDaily(orders).date}],
                            datasets: [{
                                label: 'Daily Orders',
                                data: [${allProductsDaily(orders).ordersCount}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>
    <div class="mt-5 row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="categoriesIncomeM"></canvas>
                <script>

                    const cim = document.getElementById('categoriesIncomeM').getContext('2d');
                    const ciom = new Chart(cim, {
                        type: 'bar',
                        data: {
                            labels: [${allProductsMonthly(orders).date}],
                            datasets: [{
                                label: 'Monthly Income',
                                data: [${allProductsMonthly(orders).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="categoriesOrdersM"></canvas>
                <script>
                    const com = document.getElementById('categoriesOrdersM').getContext('2d');
                    const cocm = new Chart(com, {
                        type: 'bar',
                        data: {
                            labels: [${allProductsMonthly(orders).date}],
                            datasets: [{
                                label: 'Monthly Orders',
                                data: [${allProductsMonthly(orders).ordersCount}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>

</div>

<div id="viewProducts" class="mt-3 card report-section">
    <h2 class="rheading">TIME AND DAY OF ORDERS STATS</h2>
    <div class="row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="timeIncome"></canvas>
                <script>

                    const ti = document.getElementById('timeIncome').getContext('2d');
                    const tio = new Chart(ti, {
                        type: 'bar',
                        data: {
                            labels: [${timeStats(orders).date}],
                            datasets: [{
                                label: 'Hourly Income',
                                data: [${timeStats(orders).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="timeOrders"></canvas>
                <script>
                    const to = document.getElementById('timeOrders').getContext('2d');
                    const toc = new Chart(to, {
                        type: 'bar',
                        data: {
                            labels: [${timeStats(orders).date}],
                            datasets: [{
                                label: 'Hourly Orders',
                                data: [${timeStats(orders).ordersCount}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>
    <div class="mt-5 row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="dayIncome"></canvas>
                <script>

                    const di = document.getElementById('dayIncome').getContext('2d');
                    const dio = new Chart(di, {
                        type: 'bar',
                        data: {
                            labels: [${dayStats(orders).date}],
                            datasets: [{
                                label: 'Day of the week income',
                                data: [${dayStats(orders).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="dayOrders"></canvas>
                <script>
                    const dao = document.getElementById('dayOrders').getContext('2d');
                    const doc = new Chart(dao, {
                        type: 'bar',
                        data: {
                            labels: [${dayStats(orders).date}],
                            datasets: [{
                                label: 'Day of the week orders',
                                data: [${dayStats(orders).ordersCount}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>
</div>

<div id="viewProducts" class="mt-3 card report-section">
    <h2 class="rheading">CUSTOMER REGISTRATION STATS</h2>
    <div class="row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="custDaily"></canvas>
                <script>

                    const cdi = document.getElementById('custDaily').getContext('2d');
                    const cdio = new Chart(cdi, {
                        type: 'line',
                        data: {
                            labels: [${customersRegDaily(customers).date}],
                            datasets: [{
                                label: 'Daily Customer Registration',
                                data: [${customersRegDaily(customers).customerCount}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="cusMonthly"></canvas>
                <script>

                    const cmim = document.getElementById('cusMonthly').getContext('2d');
                    const cmiom = new Chart(cmim, {
                        type: 'bar',
                        data: {
                            labels: [${customersRegMonthly(customers).date}],
                            datasets: [{
                                label: 'Monthly Customer Registration',
                                data: [${customersRegMonthly(customers).customersCount}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>

</div>

<div id="viewProducts" class="mt-3 card report-section">
    <h2 class="rheading">CATEGORIES AND BRANDS STATS</h2>
    <div class="row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="catIncome"></canvas>
                <script>

                    const tci = document.getElementById('catIncome').getContext('2d');
                    const tcio = new Chart(tci, {
                        type: 'bar',
                        data: {
                            labels: [${catStats(categories).name}],
                            datasets: [{
                                label: 'Categories Income',
                                data: [${catStats(categories).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="catUnits"></canvas>
                <script>

                    const tcu = document.getElementById('catUnits').getContext('2d');
                    const tcuo = new Chart(tcu, {
                        type: 'bar',
                        data: {
                            labels: [${catStats(categories).name}],
                            datasets: [{
                                label: 'Categories Units Sold',
                                data: [${catStats(categories).unitsSold}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>
    <div class="mt-5 row chartsRow">
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="brandIncome"></canvas>
                <script>
                    const tbi = document.getElementById('brandIncome').getContext('2d');
                    const tbio = new Chart(tbi, {
                        type: 'bar',
                        data: {
                            labels: [${brandStats(brands).name}],
                            datasets: [{
                                label: 'Brands Income',
                                data: [${brandStats(brands).income}],
                                borderColor: 'rgba(2, 117, 216, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
        <div class="col-md-6 ">
            <div class="chart-container">
                <canvas id="brandUnits"></canvas>
                <script>

                    const tbu = document.getElementById('brandUnits').getContext('2d');
                    const tbuo = new Chart(tbu, {
                        type: 'bar',
                        data: {
                            labels: [${brandStats(brands).name}],
                            datasets: [{
                                label: 'Brands Units Sold',
                                data: [${brandStats(brands).unitsSold}],
                                borderColor: 'rgba(92, 184, 92, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y:
                                    {
                                        grid: {
                                            display: false
                                        },
                                        beginAtZero: true
                                    }
                            }
                        }
                    });
                </script>
            </div>
        </div>
    </div>
</div>
`})
}