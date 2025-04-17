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
      document.getElementById('ich-kann-liste').setAttribute('href', url.trim());
      document.getElementById('ich-kann-liste').setAttribute('target', '_blank');
    })
    .catch(err => {
      console.error("Fehler beim Laden der Ich-kann-Liste:", err);
    });

  // "dahboard"-Link setzen
  const dashboardPfad = `lernbereiche/${thema}/aufgaben-dashboard.txt`;
  fetch(dashboardPfad)
    .then(res => res.text())
    .then(url => {
      document.getElementById('aufgaben-dashboard').setAttribute('href', url.trim());
      document.getElementById('aufgaben-dashboard').setAttribute('target', '_blank');
    })
    .catch(err => {
      console.error("Fehler beim Laden der Ich-kann-Liste:", err);
    });    
  

  // Skript
  const skriptPfad = `lernbereiche/${thema}/${thema}.pdf`;
  fetch(skriptPfad)
    .then(() => {
      document.getElementById('skript').setAttribute('href', skriptPfad);
      document.getElementById('skript').setAttribute('target', '_blank');
    })
    .catch(err => {
      console.error("Fehler beim Laden des Skripts:", err);
    });

});

function toggleInhalt(linkElement, dateiname) {
  const thema = new URLSearchParams(window.location.search).get('thema');
  if (!thema) return;

  const contentDiv = linkElement.nextElementSibling;

  // Falls bereits geöffnet → schließen
  if (contentDiv.style.display === 'block') {
    contentDiv.style.display = 'none';
    contentDiv.innerHTML = '';
    return;
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

      const script = document.createElement("script");
      script.src = "https://app.Lumi.education/api/v1/h5p/core/js/h5p-resizer.js";
      script.charset = "UTF-8";
      document.body.appendChild(script);
    })
    .catch(err => {
      contentDiv.innerHTML = "<p>Inhalt konnte nicht geladen werden.</p>";
      contentDiv.style.display = 'block';
      console.error(err);
    });
}

