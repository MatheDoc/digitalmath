// Generiert eine Zufallsaufgabe zu Potenzfunktionen
function generiereAufgabe() {
    const n = Math.floor(Math.random() * 5) + 2;
    const frage = `Was ist die Ableitung von \\( x^${n} \\)?`;
    const antwort = `\\( ${n}x^{${n - 1}} \\)`;
    return { frage, antwort };
  }
  