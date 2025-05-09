const params = new URLSearchParams(window.location.search);
const thema = params.get('thema');

// h2-Überschrift setzen
const h2 = document.querySelector('h2');
h2.innerText = thema;

// Pfad zur Markdown-Datei festlegen
const mdUrl = `lernbereiche/${thema}/skript/skript.md`;

// DOM- und MathJax-Bereitschaft abwarten
const domReady = new Promise(res => document.addEventListener('DOMContentLoaded', res));
const mathjaxReady = new Promise(res => document.addEventListener('mathjax-ready', res));

// Funktion für robustes Scrollen zum Ankerziel
function scrollToAnchor(id, maxAttempts = 5, delay = 300) {
  const target = document.getElementById(id);
  if (!target) return;

  let attempts = 0;

  const tryScroll = () => {
    attempts++;
    target.scrollIntoView({ behavior: 'smooth' });

    // Nach kurzer Zeit prüfen, ob das Ziel korrekt sichtbar ist
    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const headerHeight = 120; // ggf. anpassen

      if ((rect.top < headerHeight || rect.top > window.innerHeight) && attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      }
    }, delay);
  };

  requestAnimationFrame(() => requestAnimationFrame(tryScroll));
}

// Inhalte laden und verarbeiten
Promise.all([domReady, mathjaxReady])
  .then(() => fetch(mdUrl))
  .then(response => {
    if (!response.ok) throw new Error('Fehler beim Laden der MD-Datei');
    return response.text();
  })
  .then(markdownText => {
    const container = document.getElementById('content');

    // Markdown in HTML umwandeln
    container.innerHTML = marked(markdownText);

    // Lokale Bildpfade korrigieren
    const bilder = container.querySelectorAll('img');
    bilder.forEach(img => {
      const originalSrc = img.getAttribute('src');
      if (originalSrc && !originalSrc.startsWith('http')) {
        img.src = `lernbereiche/${encodeURIComponent(thema)}/skript/${originalSrc}`;
      }
    });

    // MathJax rendern und danach ggf. zum Anker springen
    return MathJax.typesetPromise([container]).then(() => {
      if (window.location.hash) {
        const targetId = decodeURIComponent(window.location.hash.substring(1));
        scrollToAnchor(targetId);
      }
    });
  })
  .catch(err => {
    document.getElementById('content').textContent = 'Fehler: ' + err.message;
  });
