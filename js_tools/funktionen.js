function zeichneFunktion(funktion, xMin, xMax, divId, titel = "") {
  const xWerte = [];
  const yWerte = [];
  for (let x = xMin; x <= xMax; x += 0.1) {
    xWerte.push(x);
    yWerte.push(funktion(x));
  }

  const data = [
    {
      x: xWerte,
      y: yWerte,
      type: "scatter",
      mode: "lines",
      line: { color: "blue" },
    },
  ];

  const layout = {
    title: titel,
    xaxis: {
      title: "x",
    },
    yaxis: {
      title: "y",
    },
    margin: { t: 40, r: 20, b: 40, l: 50 },
  };

  Plotly.newPlot(divId, data, layout);
}
