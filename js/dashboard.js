var baseUrl = 'https://api.ploutos.capital';
var aum = [];
var initialAum = 0;
var currentAum = 0;
var numTokens = 27874.44024;

/* Grab all AUM data */
function getAum() {
    return axios.get(`${baseUrl}/aum`)
    .then((res) => {
        aum = res.data.data
        initialAum = aum[0].total; // most recent total
        currentAum = aum[aum.length].total; // most recent total
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

    var relevantAum = aum; // all

    if (period === 'day') {
        relevantAum = aum.slice(-1 * 24); // last 24 hours 
    } else if (period === 'month') {
        relevantAum = aum.slice(-1 * 24 * 30); // last 30 days
    }
    
    data = relevantAum.map(function(aum) { return aum.total / numTokens; })
    labels = relevantAum.map(function(aum) { return aum.timestamp; })
    
    // labels = ["January", "February", "March", "April", "May", "June", "July"];
    // data = [0, 10, 5, 2, 20, 30, 45];

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

/* Uses current AUM to calculate token value */
function updateTokenValue() {
    let tokenValue = currentAum / numTokens;
    document.getElementById('token-value').innerHTML = `$${tokenValue.toFixed(2)} USD`;
}

/* Updates curent AUM */
function updateAum() {
    document.getElementById('aum-current').innerHTML = `$${currentAum.toFixed(2)} USD`;
    document.getElementById('aum-initial').innerHTML = `$${initialAum.toFixed(2)} USD`;
}

function init() {
    // updateTrades();
    // updateVolume();

    getAum()
    .then(function() {
        updateChart('day');
        updateTokenValue();
        updateAum();
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
