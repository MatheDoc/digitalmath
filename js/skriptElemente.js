function erstelleQuiz(divId, url) {
    var div = document.getElementById(divId);
    div.innerHTML = '<iframe src="' + 
        url + '&quizonly=true" ' +
        'frameborder="0" ' +
        'style="" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
        'referrerpolicy="strict-origin-when-cross-origin" ' +
        'allowfullscreen>' +
        '</iframe>';
}


function zeichneFunktion(funktion, xMin, xMax, divId, titel = '') {
    const xWerte = [];
    const yWerte = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
        xWerte.push(x);
        yWerte.push(funktion(x));
    }

    const data = [{
        x: xWerte,
        y: yWerte,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' }
    }];

   const layout = {
    title: titel,
    xaxis: {
        title: 'x'
    },
    yaxis: {
        title: 'y'
    },
    margin: { t: 40, r: 20, b: 40, l: 50 }
};


    Plotly.newPlot(divId, data, layout);
}

// histogramme
function zeichneDiskretesHistogramm(xWerte, yWerte, divId, titel = '') {
    const data = [{
        x: xWerte,
        y: yWerte,
        type: 'bar',
        name: 'P(X = x)',
        marker: {
            color: 'rgba(54, 162, 235, 0.3)',
            line: {
                color: 'rgba(162, 162, 162, 0.7)', // Farbe des Rahmens
                width: 1        // Dicke des Rahmens
            }
        }
    }];

    const layout = {
        title: titel,
        xaxis: {
            title: 'x',
            tickmode: 'array',
            tickvals: xWerte
        },
        yaxis: {
            title: 'P(X = x)',
            range: [0, Math.max(...yWerte) * 1.1],
            gridcolor: 'rgba(0, 0, 0, 0.2)' 
        },
        bargap: 0,
        showlegend: false,
        margin: { t: 40, r: 20, b: 40, l: 50 }
    };

    Plotly.newPlot(divId, data, layout);
}
