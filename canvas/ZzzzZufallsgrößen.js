// histogramm
const canvas = document.getElementById('histogramm');
if (canvas) {
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0', '1', '2', '3', '4', '5'],
      datasets: [{
        label: 'P(X = x)',
        data: [0.21, 0.32, 0.19, 0.15, 0.09, 0.04],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  });
  console.warn('Canvas mit id="histogramm" wurde gefunden.');
} else {
  console.warn('Canvas mit id="histogramm" nicht gefunden.');
}

// Graph

  const ctx = document.getElementById('myChart').getContext('2d');

  // Funktionen
  function f(x) {
      return x * x;
  }

  function fPrime(x) {
      return 2 * x;
  }

  function F(x) {
      return (x * x * x) / 3;
  }

  // Werteberechnung
  const x = [];
  const y_f = [];
  const y_fPrime = [];
  const y_F = [];

  for (let i = -2; i <= 2; i += 0.1) {
      x.push(i.toFixed(2));  // Optional: Zahlen mit 2 Nachkommastellen
      y_f.push(f(i));
      y_fPrime.push(fPrime(i));
      y_F.push(F(i));
  }

  // Diagramm erstellen
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: x,
          datasets: [
              {
                  label: 'f(x) = x²',
                  data: y_f,
                  borderColor: 'blue',
                  borderWidth: 2,
                  pointRadius: 0
              },
              {
                  label: "f'(x) = 2x",
                  data: y_fPrime,
                  borderColor: 'red',
                  borderWidth: 2,
                  pointRadius: 0,
                  borderDash: [5, 5]
              },
              {
                  label: 'F(x) = x³⁄3',
                  data: y_F,
                  borderColor: 'green',
                  borderWidth: 2,
                  pointRadius: 0
              }
          ]
      },
      options: {
          responsive: true,
          aspectRatio: 1,
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'x-Werte',
                      font: {
                          size: 14,
                          weight: 'bold'
                      }
                  },
                  ticks: {
                      stepSize: 1,
                      min: -2,
                      max: 2,
                      callback: function(value) {
                          return Number.isInteger(value) ? value : '';
                      }
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'y-Werte',
                      font: {
                          size: 14,
                          weight: 'bold'
                      }
                  },
                  ticks: {
                      beginAtZero: true,
                      stepSize: 1
                  }
              }
          },
          plugins: {
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          return `${context.dataset.label}: ${context.formattedValue}`;
                      }
                  }
              },
              legend: {
                  labels: {
                      font: {
                          size: 12
                      }
                  }
              }
          }
      }
  });