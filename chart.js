var config = {
  type: 'line',
  data: {
    datasets: [{
      label: "infectados",
      fill: true,
      pointRadius: 2,
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
    }, {
      label: "mortos",
      fill: true,
      pointRadius: 2,
      borderColor: 'rgba(0, 0, 0, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }, {
      label: "curados",
      fill: true,
      pointRadius: 2,
      borderColor: 'rgba(0, 255, 0, 1)',
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
    }, {
      label: "capacidade do sistema de saúde",
      fill: false,
      pointRadius: 1,
      borderColor: 'rgb(0, 0, 255)',
      borderWeight: 1,
    }, {
      label: "",
      data: [popSize]
    }],
  },
  options: {
    defaultFontColor: 'white',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: {
        ticks: {
          max: 300,
          min: 200,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  }
}
var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, config);
