const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

function drawGrid() {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    // Vertikale Linien
    for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Horizontale Linien
    for (let y = 0; y <= height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Achsen
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    
    // y-Achse
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // x-Achse
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
}

function drawGraph(m, b) {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    ctx.strokeStyle = "#ff5733";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, height / 2 - b * 40);
    ctx.lineTo(width, height / 2 - (m * (width / 40) + b) * 40);
    ctx.stroke();
}

document.getElementById("updateGraph").addEventListener("click", function () {
    const m = parseFloat(document.getElementById("slope").value);
    const b = parseFloat(document.getElementById("intercept").value);
    
    drawGraph(m, b);
});

// Initialer Graph
drawGraph(1, 0);
