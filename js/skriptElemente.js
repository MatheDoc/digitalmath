function resizeIframe(iframe) {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const height = iframeDoc.body.scrollHeight;
    iframe.style.height = height + 20 + "px";
    iframe.style.width = "100%";
    iframe.style.border = "none";
  } catch (e) {
    console.warn("Kein Zugriff auf iframe-Inhalt:", e);
  }
}

function ladeIframe(divId, url) {
  const container = document.getElementById(divId);
  if (!container) {
    console.error('Div mit ID "' + divId + '" nicht gefunden.');
    return;
  }

  container.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen style="width:100%;"></iframe>`;
  const iframe = container.querySelector("iframe");

  iframe.onload = () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const h1 = iframeDoc.querySelector("h1");
    if (h1) h1.style.display = "none";
    const h2 = iframeDoc.querySelector("h2");
    if (h2) h2.style.display = "none";
  };

  if (!iframe) {
    console.error("iframe konnte nicht erstellt werden.");
    return;
  }

  iframe.addEventListener("load", () => {
    setTimeout(() => resizeIframe(iframe), 1000);
  });
}

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

// histogramme
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
