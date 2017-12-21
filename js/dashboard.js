var baseUrl = 'https://api.ploutos.capital';
var aum = [];

/* Grab all AUM data */
function getAum() {
    return axios.get(`${baseUrl}/aum`)
    .then((res) => {
        aum = res.data
        return aum;
    })
    .catch((err) => {
        console.log(err);
    })
}

/* Update growth chart */
function updateChart(period) {
    var labels = [];
    var data = [];

    if (period === 'day') data = aum.slice(-1 * 24) // last 24 hours 
    else if (period === 'month') data = aum.slice(-1 * 24 * 30) // last 30 days
    else data = aum // all
    
    labels = ["January", "February", "March", "April", "May", "June", "July"];
    data = [0, 10, 5, 2, 20, 30, 45];

    var ctx = document.getElementById('growth-chart').getContext('2d');
    var primaryColor = 'rgb(64, 137, 247)';

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
    // updateTrades();
    // updateVolume();

    getAum()
    .then(function() {
        updateChart('day');
    })

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
