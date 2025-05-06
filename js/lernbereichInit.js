document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const thema = params.get('thema');

  if (!thema) return;

  // h2 Tag setzen
    const h2 = document.querySelector('h2');
    h2.innerText = thema;
  
  // "Ich kann"-Link setzen
  const ichKannPfad = `lernbereiche/${thema}/ich-kann-liste.txt`;
  fetch(ichKannPfad)
    .then(res => res.text())
    .then(url => {
      const button = document.getElementById('ich-kann-liste');
      button.addEventListener('click', () => {
        window.open(url, '_blank');
      });
    })
    .catch(err => {
      console.error("Fehler beim Laden:", err);
    });

  // "dashboard"-Link setzen
  const dashboardPfad = `lernbereiche/${thema}/aufgaben-dashboard.txt`;
  fetch(dashboardPfad)
    .then(res => res.text())
    .then(url => {
      const button = document.getElementById('aufgaben-dashboard');
      button.addEventListener('click', () => {
        window.open(url, '_blank');
      });
    })
    .catch(err => {
      console.error("Fehler beim Laden:", err);
    });    
  

  // Skript
  const skriptPfad = `skript.html?thema=${thema}`;
  fetch(skriptPfad)
    .then(() => {
      const button = document.getElementById('skript');
      button.addEventListener('click', () => {
        window.open(skriptPfad, '_blank');
      });
    })
    .catch(err => {
      console.error("Fehler beim Laden:", err);
    });

});


function toggleInhalt(linkElement, dateiname) {
  const thema = new URLSearchParams(window.location.search).get('thema');
  if (!thema) return;

  const contentDiv = linkElement.nextElementSibling;
  const symbol = linkElement.querySelector('i');

  // Falls bereits geöffnet → schließen
  if (contentDiv.style.display === 'block') {
    contentDiv.style.display = 'none';
    //contentDiv.innerHTML = '';
    if (symbol) {
      symbol.classList.remove('fa-chevron-up');
      symbol.classList.add('fa-chevron-down');
    }
    return;
  }
  // Icon nur beim Öffnen anpassen
  if (symbol) {
    symbol.classList.remove('fa-chevron-down');
    symbol.classList.add('fa-chevron-up');
  }

  const pfad = `lernbereiche/${thema}/${dateiname}.html`;

  fetch(pfad)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Datei nicht gefunden: ${pfad} (Status: ${res.status})`);
      }
      return res.text();
    })
    .then(text => {
      contentDiv.innerHTML = text;
      contentDiv.style.display = 'block';

      // h5p reziser
      const script = document.createElement("script");
      script.src = "https://app.Lumi.education/api/v1/h5p/core/js/h5p-resizer.js";
      script.charset = "UTF-8";
      document.body.appendChild(script);
    })
    .catch(err => {
      contentDiv.innerHTML = "<p>Keine Daten vorhanden.</p>";
      contentDiv.style.display = 'block';
      console.error(err);
    });
}


/*document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const thema = params.get('thema');
  if (!thema) return;

  // Link zur Kompetenzliste aus Datei laden
  const configPfad = `lernbereiche/${thema}/ich-kann-liste.txt`;

  fetch(configPfad)
    .then(res => {
      if (!res.ok) throw new Error("Datei nicht gefunden");
      return res.text();
    })
    .then(url => {
      const iframe = document.getElementById("kompetenzliste-frame");
      iframe.src = url.trim() +  (url.includes('?') ? '&' : '?') + `listonly=true`; // Leerzeichen/Zeilenumbrüche entfernen
    })
    .catch(err => {
      console.error("Fehler beim Laden der Kompetenz-URL:", err);
    });
});

*/