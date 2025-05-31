function zeichneDiskretesHistogramm(xWerte, yWerte, divId, titel = "") {
  const data = [
    {
      x: xWerte,
      y: yWerte,
      type: "bar",
      name: "P(X = x)",
      marker: {
        color: "rgba(54, 162, 235, 0.3)",
        line: {
          color: "rgba(162, 162, 162, 0.7)", // Farbe des Rahmens
          width: 1, // Dicke des Rahmens
        },
      },
    },
  ];

  const layout = {
    title: titel,
    xaxis: {
      title: "x",
      tickmode: "array",
      tickvals: xWerte,
    },
    yaxis: {
      title: "P(X = x)",
      range: [0, Math.max(...yWerte) * 1.1],
      gridcolor: "rgba(0, 0, 0, 0.2)",
    },
    bargap: 0,
    showlegend: false,
    margin: { t: 100, r: 20, b: 40, l: 50 },
    dragmode: false,
  };

  const config = { scrollZoom: false };

  Plotly.newPlot(divId, data, layout, config);
}
