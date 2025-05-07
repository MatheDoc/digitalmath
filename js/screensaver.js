const box = document.getElementById("floating-box");

let x = 100, y = 100;
let dx = 2, dy = 2;
let showingSolution = false;
let aktuelleAufgabe = null;
let aufgaben = [];

function ladeNeueAufgabe() {
  aktuelleAufgabe = aufgaben[Math.floor(Math.random() * aufgaben.length)];
  box.innerHTML = aktuelleAufgabe.frage;
  box.style.backgroundColor = "#ca8dc9";
  showingSolution = false;
  if (window.MathJax) MathJax.typeset();
}

function animate() {
  const w = window.innerWidth - box.clientWidth;
  const h = window.innerHeight - box.clientHeight;

  x += dx;
  y += dy;

  if (!showingSolution && (x <= 0 || x >= w || y <= 0 || y >= h)) {
    box.innerHTML = aktuelleAufgabe.antwort;
    box.style.backgroundColor = "#a6ca8d";
    showingSolution = true;
    if (window.MathJax) MathJax.typeset();
  } else if (showingSolution && (x <= 0 || x >= w || y <= 0 || y >= h)) {
    ladeNeueAufgabe(); // Nächste Aufgabe nach Lösung anzeigen
  }

  if (x <= 0 || x >= w) dx *= -1;
  if (y <= 0 || y >= h) dy *= -1;

  box.style.left = x + "px";
  box.style.top = y + "px";

  requestAnimationFrame(animate);
}

// Lade JSON-Aufgaben
fetch('/json_screen/ableitungen.json')
  .then(res => res.json())
  .then(data => {
    aufgaben = data;
    ladeNeueAufgabe(); // Start mit erster Aufgabe
    animate();
  })
  .catch(err => {
    box.innerText = "Fehler beim Laden der Aufgaben.";
    console.error(err);
  });
