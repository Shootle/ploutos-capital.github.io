var baseUrl = 'http://our.server.com'

// Element selectors


/* Update growth chart */
function updateChart(period) {
    // axios.post(`${baseUrl}/getGrowth?period=${period}`)
    // .then((res) => {
        var ctx = document.getElementById('growth-chart').getContext('2d');

        var labels = [];
        var data = [];
        var primaryColor = 'rgb(64, 137, 247)';

        labels = ["January", "February", "March", "April", "May", "June", "July"];
        data = [0, 10, 5, 2, 20, 30, 45];

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "USD",
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    data: data,
                }]
            },
            options: {}
        });
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
}


/* Update volume */
function updateVolume() {
    volumes = {
        'hour': parseInt(Math.random() * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        'month': parseInt(Math.random() * 100000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        'all': parseInt(Math.random() * 10000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };

    for (var v in volumes) {
        document.getElementById(`volume-${v}`).innerHTML = volumes[v];
    }

    // axios.post(`${baseUrl}/getVolume`)
    // .then((res) => {
    //     var volumes = res.data;

    //     for (var v in volumes) {
    //         document.getElementById(`volume-${v}`).innerHTML = volumes[v];
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
}


/* Update number of trades */
function updateTrades() {
    var trades = {
        'hour': parseInt(Math.random() * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        'month': parseInt(Math.random() * 100000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        'all': parseInt(Math.random() * 10000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };
    for (var t in trades) {
        document.getElementById(`trades-${t}`).innerHTML = trades[t];
    }

    // axios.post(`${baseUrl}/getTrades`)
    // .then((res) => {
    //     var trades = res.data;

    //     for (var t in trades) {
    //         document.getElementById(`trades-${t}`).innerHTML = trades[t];
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
}

function init() {
    updateTrades();
    updateVolume();
    updateChart('hourly');

    var periodSelectors = document.querySelectorAll('.period-selector button');

    periodSelectors.forEach(function(b) {
        b.addEventListener('click', function(e) {
            var period = e.target.dataset.period;

            periodSelectors.forEach(function(b) { b.className=''; });
            e.target.className = 'active';

            updateChart(period) ;       
        })
    })
}

init();
