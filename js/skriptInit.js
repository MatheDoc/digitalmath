const params = new URLSearchParams(window.location.search);
const thema = params.get('thema');

// h2 Tag setzen
const h2 = document.querySelector('h2');
h2.innerText = thema;

// Pfad zur Markdown-Datei
const mdUrl = `lernbereiche/${thema}/skript/skript.md`;

// Promises für DOM- und MathJax‑Bereitschaft
const domReady = new Promise(res => document.addEventListener('DOMContentLoaded', res));
const mathjaxReady = new Promise(res => document.addEventListener('mathjax-ready', res));

Promise.all([domReady, mathjaxReady])
  .then(() => fetch(mdUrl))
  .then(response => {
    if (!response.ok) throw new Error('Fehler beim Laden der MD-Datei');
    return response.text();
  })
  .then(markdownText => {
    const container = document.getElementById('content');
    
    // Markdown in HTML umwandeln und einfügen
    container.innerHTML = marked(markdownText);

    // Lokale Bildpfade anpassen
    const bilder = container.querySelectorAll('img');
    bilder.forEach(img => {
      const originalSrc = img.getAttribute('src');
      if (originalSrc && !originalSrc.startsWith('http')) {
        img.src = `lernbereiche/${encodeURIComponent(thema)}/skript/${originalSrc}`;
      }
    });

    // MathJax rendern und anschließend ggf. zum Anker springen
    return MathJax.typesetPromise([container]).then(() => {
      if (window.location.hash) {
        const targetId = decodeURIComponent(window.location.hash.substring(1));
        const targetElement = document.getElementById(targetId);
    
        if (targetElement) {
          // Scrollen erst im nächsten Frame ausführen
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            });
          });
        }
      }
    });
    
  })
  .catch(err => {
    document.getElementById('content').textContent = 'Fehler: ' + err.message;
  });
