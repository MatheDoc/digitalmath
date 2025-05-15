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

    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const headerHeight = 120;

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
    container.innerHTML = marked(markdownText);

    const canvasPfad = `canvas/${thema}.js`;
    const script = document.createElement('script');
    script.src = canvasPfad;
    script.async = true;

    script.onerror = () => {
      console.error(`Fehler: Das Skript für das Thema '${thema}' konnte nicht geladen werden.`);
    };

    document.body.appendChild(script);
script.onload = () => {
  console.log(`${thema}.js wurde erfolgreich geladen.`);

  setTimeout(() => {
    const iframes = container.querySelectorAll('iframe');
    console.log("iframe-Check nach canvas-Load:", iframes);
    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          resizeIframe(iframe);
        }, 500);
      });
    });
  }, 1000); // Genug warten, bis auch die iframes aus dem Canvas-Skript da sind
};



    // Bildpfade korrigieren
    const bilder = container.querySelectorAll('img');
    bilder.forEach(img => {
      const originalSrc = img.getAttribute('src');
      if (originalSrc && !originalSrc.startsWith('http')) {
        img.src = `lernbereiche/${encodeURIComponent(thema)}/skript/${originalSrc}`;
      }
    });

    // MathJax rendern und ggf. scrollen
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

// Hilfsfunktion zur Größenanpassung
/*function resizeIframe(iframe) {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const contentHeight = iframeDoc.body.scrollHeight;
    console.log("Berechnete Höhe:", contentHeight);
    iframe.style.height = (contentHeight + 20) + 'px';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
  } catch (e) {
    console.warn('Zugriff auf iframe-Inhalt nicht möglich:', e);
  }
}


function setupIframe(iframe) {
  if (iframe.dataset.resizeAttached) return; // Nur einmal behandeln

  iframe.dataset.resizeAttached = "true";

  iframe.addEventListener('load', () => {
    setTimeout(() => {
      resizeIframe(iframe);
    }, 300); // leichte Verzögerung zur Sicherheit
  });
}
*/