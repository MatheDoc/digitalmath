const aspect = 4/3; 
const baseR = 0.076;
const r = baseR / Math.sqrt(aspect); // oder baseR / aspect


function shortenLine(x0, y0, x1, y1, rStart = r, rEnd = r) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  const x0s = x0 + (rStart * dx) / len;
  const y0s = y0 + (rStart * dy) / len;
  const x1s = x1 - (rEnd * dx) / len;
  const y1s = y1 - (rEnd * dy) / len;
  return { x0: x0s, y0: y0s, x1: x1s, y1: y1s };
}

function zeichneBaumdiagramm(
  pa, pba, pbna, divID, titel = '',
  labelA = 'A', labelAbar = 'A̅', labelB = 'B', labelBbar = 'B̅'
) {

    const container = document.getElementById(divID);
  const width = container.offsetWidth;
  const minHeight = 300;
const height = Math.max(width / aspect, minHeight);

  // Definition der Knoten
  const nodes = [
    { x: 0, y: 0.5, label: "", id: "start" },
    { x: 0.5, y: 0.75, label: labelA },
    { x: 0.5, y: 0.25, label: labelAbar },
    { x: 1, y: 0.875, label: labelB },
    { x: 1, y: 0.625, label: labelBbar },
    { x: 1, y: 0.375, label: labelB },
    { x: 1, y: 0.125, label: labelBbar }
  ];

  // Wahrscheinlichkeiten berechnen
  const pna = 1 - pa;
  const pAb = pa * pba;
  const pAnb = pa * (1 - pba);
  const pNAb = pna * pbna;
  const pNAnb = pna * (1 - pbna);

  // Kanten mit Labels
  const edges = [
    { from: nodes[0], to: nodes[1], label: `${pa.toFixed(4)}` },
    { from: nodes[0], to: nodes[2], label: `${pna.toFixed(4)}` },
    { from: nodes[1], to: nodes[3], label: `${pba.toFixed(4)}` },
    { from: nodes[1], to: nodes[4], label: `${(1-pba).toFixed(4)}` },
    { from: nodes[2], to: nodes[5], label: `${pbna.toFixed(4)}` },
    { from: nodes[2], to: nodes[6], label: `${(1-pbna).toFixed(4)}` }
  ];

  // Wahrscheinlichkeiten an den Enden
  const leafProbs = [
    { node: nodes[3], prob: pAb },
    { node: nodes[4], prob: pAnb },
    { node: nodes[5], prob: pNAb },
    { node: nodes[6], prob: pNAnb }
  ];

  // Linien
  const edgeShapes = edges.map(e => {
    const fromIsStart = e.from.id === "start";
    const rStart = fromIsStart ? 0 : r;
    const rEnd = r;
    const coords = shortenLine(e.from.x, e.from.y, e.to.x, e.to.y, rStart, rEnd);
    return {
      type: 'line',
      x0: coords.x0, y0: coords.y0,
      x1: coords.x1, y1: coords.y1,
      line: { width: 2 }
    };
  });

  // Kanten-Labels
  const edgeLabels = edges.map(e => {
    const xm = (e.from.x + e.to.x) / 2;
    const ym = (e.from.y + e.to.y) / 2 + 0.045;
    const dx = (e.to.x - e.from.x) * aspect;
    const dy = e.to.y - e.from.y;
    const angle = Math.atan2(dy, dx) * (-180) / Math.PI;
    return {
      x: xm,
      y: ym,
      text: e.label,
      showarrow: false,
      font: { size: 15 },
      textangle: angle
    };
  });

  // Endknoten-Labels mit Wahrscheinlichkeit
  const leafLabels = leafProbs.map(lp => ({
    x: lp.node.x + 0.25,
    y: lp.node.y,
    text: `${lp.prob.toFixed(4)}`,
    showarrow: false,
    font: { size: 15 }
  }));

  // Knoten
  const nodeTrace = {
    x: nodes.map(n => n.x),
    y: nodes.map(n => n.y),
    text: nodes.map(n => n.label),
    mode: 'markers+text',
    type: 'scatter',
    textposition: 'middle center',
    textfont: {
      size: 20
    },
    marker: {
      size: nodes.map((n, i) => i === 0 ? 0 : 40), 
      color: 'rgba(54, 162, 235, 0.4)',
      line: { width: 2, color: 'black' },
      symbol: 'circle'
    },
    hoverinfo: 'none'
  };

  const layout = {
      title: {
        text: titel,
        y: 0.85
      },
    xaxis: { visible: false, range: [0, 1.4] },
    yaxis: { visible: false, range: [0, 1] },
    shapes: edgeShapes,
    annotations: [...edgeLabels, ...leafLabels],
    margin: { l: 20, r: 20, t: 100, b: 20 },
    dragmode: false,
    width: width,
    height: height
  };

  const config = {
    scrollZoom: false,
    responsive: true
  };

  Plotly.newPlot(divID, [nodeTrace], layout, config);
  
}