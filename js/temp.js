

const box = document.getElementById("floating-box");

let x = 100, y = 100;
let dx = 2, dy = 2;
let showingSolution = false;
let aktuelleAufgabe = null;
let aufgaben = [];

function ladeNeueAufgabe() {
  aktuelleAufgabe = aufgaben[Math.floor(Math.random() * aufgaben.length)];
  box.innerHTML = aktuelleAufgabe.frage;
  box.style.backgroundColor = "#ffdede";
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
    box.style.backgroundColor = "#e0ffde";
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

const params = new URLSearchParams(window.location.search);
const thema = params.get('thema');


// h2-Überschrift setzen
const h2 = document.querySelector('h2');
h2.innerText = thema;

fetch(`/json_screen/${thema}.json`)
  .then(res => res.json())
  .then(data => {
    aufgaben = data;
    ladeNeueAufgabe();
    animate();
  })
  .catch(err => {
    box.innerText = "Kein Bildschirmschoner vorhanden.";
    console.error(err);
  });


  // Timer
  let timeout;
  const delay = 5000; // Zeit in Millisekunden (z. B. 5000 = 5 Sekunden)
  const overlay = document.getElementById("screensaver-overlay");
  
  function showBox() {
    box.style.display = 'flex';
    overlay.style.display = 'block';
  }

  function hideBox() {
    box.style.display = 'none';
    overlay.style.display = 'none';
  }

  function resetTimer() {
    hideBox(); // Box sofort ausblenden
    clearTimeout(timeout);
    timeout = setTimeout(showBox, delay); // Timer neu starten
  }

  // Auf alle relevanten Aktivitäten reagieren:
  ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  // Initialen Timer starten
  timeout = setTimeout(showBox, delay);