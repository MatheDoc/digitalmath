const box = document.getElementById("floating-box");
const frage = document.getElementById("floating-frage");
const antwort = document.getElementById("floating-antwort");

let x = 100, y = 100;
let dx = 2, dy = 2;
let showingSolution = false;
let aktuelleAufgabe = null;
let aufgaben = [];

function ladeNeueAufgabe() {
  aktuelleAufgabe = aufgaben[Math.floor(Math.random() * aufgaben.length)];
  frage.innerHTML = aktuelleAufgabe.frage;
  antwort.innerHTML = "";
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
    antwort.innerHTML = aktuelleAufgabe.antwort;
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

if (Math.random() < 1) {
  aufgabenPfad = `/json_screen/${thema}.json`;
} else {
  aufgabenPfad = `/json_screen/jokes.json`
}

fetch(aufgabenPfad)
  .then(res => {
    if (!res.ok) throw new Error("Datei nicht gefunden");
    return res.json();
  })
  .then(data => {
    aufgaben = data;
    ladeNeueAufgabe();
    animate();

    // Timer-Logik NUR starten, wenn die Datei gefunden wurde
    timeout = setTimeout(showBox, delay);
    ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimer);
    });
  })
  .catch(err => {
    console.warn("JSON konnte nicht geladen werden:", err.message);
    // Box und Overlay bleiben unsichtbar, kein Timer, keine Bewegung
  });



  // Timer
  let timeout;
  const delay = 2000; // Zeit in Millisekunden (z. B. 5000 = 5 Sekunden)
  const overlay = document.getElementById("screensaver-overlay");
  
  function showBox() {
      // Position zurücksetzen
  x = 100;
  y = 100;

  // Bewegungsrichtung neu festlegen (optional, damit nicht immer gleich)
  dx = (Math.random() < 0.5 ? -1 : 1) * 2;
  dy = (Math.random() < 0.5 ? -1 : 1) * 2;
    box.style.display = 'block';
    overlay.style.display = 'block';
  }

  function hideBox() {
    box.style.display = 'none';
    overlay.style.display = 'none';
  }

  function resetTimer() {
    hideBox();
    clearTimeout(timeout);
    timeout = setTimeout(showBox, delay); // Timer neu starten
  }


