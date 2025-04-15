document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const thema = params.get('thema');

  if (!thema) return;

  // h2 Tag setzen
    const h2 = document.querySelector('h2');
    h2.innerText = thema;
  
  // "Ich kann"-Link setzen
  const ichKannPfad = `inhalte/${thema}/ich-kann-liste.txt`;
  fetch(ichKannPfad)
    .then(res => res.text())
    .then(url => {
      document.getElementById('ich-kann-liste').setAttribute('href', url.trim());
      document.getElementById('ich-kann-liste').setAttribute('target', '_blank');
    })
    .catch(err => {
      console.error("Fehler beim Laden der Ich-kann-Liste:", err);
    });

  // Overlay-Funktion definieren
  window.zeigeOverlay = (topic) => {
    const pfad = `inhalte/${thema}/${topic}.html`;

    fetch(pfad)
      .then(res => {
        if (!res.ok) throw new Error("Datei nicht gefunden.");
        return res.text();
      })
      .then(text => {
        document.getElementById('overlay-text').innerHTML = text;
        document.getElementById('overlay').style.display = 'flex';
      })
      .catch(err => {
        document.getElementById('overlay-text').innerText = "Inhalt konnte nicht geladen werden.";
        document.getElementById('overlay').style.display = 'flex';
        console.error(err);
      });
  };

  // Overlay schließen
  window.versteckeOverlay = () => {
    document.getElementById('overlay').style.display = 'none';
  };
});

