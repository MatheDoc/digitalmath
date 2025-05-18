function fakultaet(k) {
  if (k === 0 || k === 1) return 1;
  let f = 1;
  for (let i = 2; i <= k; i++) f *= i;
  return f;
}

function binomial(n, k, p) {
  const komb = fakultaet(n) / (fakultaet(k) * fakultaet(n - k));
  return komb * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function zeichneHistogrammEinzeln(n, p, a, b, divID, titel = '', autoY = true) {
  const xWerte = [];
  const yWerte = [];
  const farben = [];
  let summe = 0;
  const yKumuliert = [];

  for (let k = 0; k <= n; k++) {
    const wkt = binomial(n, k, p);
    summe += wkt;
    xWerte.push(k);
    yWerte.push(wkt);
    yKumuliert.push(summe);
    if (k >= a && k <= b) {
      farben.push("rgba(5, 56, 166, 0.6)");
    } else {
      farben.push("rgba(54, 162, 235, 0.4)");
    }
  }

  // Intervallwahrscheinlichkeit berechnen (optional für Anzeige)
  const P_b = yKumuliert[b] ?? 0;
  const P_vor_a = a > 0 ? yKumuliert[a - 1] : 0;
  let P_intervall = P_b - P_vor_a;
  if (a > b) P_intervall = 0;
  if (document.getElementById("intervallWert")) {
    document.getElementById("intervallWert").innerText =
      `P(${a} ≤ X ≤ ${b}) = ${P_intervall.toFixed(4)}`;
  }

  const spur = {
    x: xWerte,
    y: yWerte,
    type: "bar",
    marker: {
      color: farben,
      line: {
        color: "rgba(0, 0, 0, 0.5)",
        width: 1
      }
    },
    name: "P(X = k)"
  };

  const layout = {
    title: titel,
    xaxis: { title: "k", tickmode: "linear" },
    yaxis: { title: "P(X = k)", range: autoY ? undefined : [0, 1] },
    bargap: 0,
    dragmode: false,
  };

  const config = { scrollZoom: false };

  Plotly.newPlot(divID, [spur], layout, config);
}

function zeichneHistogrammKumuliert(n, p, a, b, divID, titel = '') {
  const xWerte = [];
  const yKumuliert = [];
  let summe = 0;

  for (let k = 0; k <= n; k++) {
    const wkt = binomial(n, k, p);
    summe += wkt;
    xWerte.push(k);
    yKumuliert.push(summe);
  }

  const farben = xWerte.map(k => {
    if (k === b) return "rgba(200, 0, 0, 0.7)";
    if (k === a - 1) return "rgba(255, 160, 160, 0.6)";
    return "rgba(100, 100, 100, 0.2)";
  });

  const spur = {
    x: xWerte,
    y: yKumuliert,
    type: "bar",
    marker: {
      color: farben,
      line: {
        color: "rgba(50, 50, 50, 0.5)",
        width: 1
      }
    },
    name: "P(X ≤ k)"
  };

  const layout = {
    title: titel,
    xaxis: { title: "k", tickmode: "linear" },
    yaxis: { title: "P(X ≤ k)", range: [0, 1.05] },
    bargap: 0,
    dragmode: false
  };

  const config = { scrollZoom: false };

  Plotly.newPlot(divID, [spur], layout, config);
}