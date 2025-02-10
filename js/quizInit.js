let aufgabenZaehler = 1;  // Initialisiere den Zähler für die Aufgaben
let questionId = 1;  // Eindeutige Frage-ID für jede Aufgabe

// neue Aufgaben anzeigen (für alle Sammlungen)
function zeigeNeueAufgabe() {
    const params = new URLSearchParams(window.location.search);
    const sammlungen = params.getAll('sammlung');
    const titel = params.get('titel');
    const exam = params.get('exam');

    // Titel setzen, wenn kein "exam"
    if (titel && exam === 'no') {
        document.getElementById('quiz-title').textContent = titel;
        document.querySelector('meta[name="description"]').setAttribute('content', titel);
        document.querySelector("h4").style.display = 'none'; // "i-te Aufgabe" ausblenden
    }

    if (exam === "yes") {
        document.getElementById('AufgabenNummer').textContent = questionId + '. Aufgabe';
        document.querySelector("h3").style.display = 'none';
    }

    // Alle Sammlungen laden und Aufgaben daraus anzeigen
    if (sammlungen.length > 0) {
        let aufgabenListe = [];
        let geladen = 0;

        sammlungen.forEach(sammlung => {
            fetch(`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${sammlung}`)
                .then(response => response.json())
                .then(data => {
                    aufgabenListe.push({ sammlung, aufgaben: data });
                    geladen++;

                    // Wenn alle Sammlungen geladen sind, zeige alle Aufgaben
                    if (geladen === sammlungen.length) {
                        zeigeAlleAufgaben(aufgabenListe);
                    }
                })
                .catch(error => {
                    console.error(`Fehler beim Laden der JSON-Datei für ${sammlung}:`, error);
                    geladen++;

                    // Auch bei Fehlern sicherstellen, dass alle geladenen Sammlungen verarbeitet werden
                    if (geladen === sammlungen.length) {
                        zeigeAlleAufgaben(aufgabenListe);
                    }
                });
        });
    } else {
        console.error('Keine Sammlung in der URL gefunden.');
        document.getElementById('aufgabe').innerText = 'Keine Sammlung gefunden.';
    }
}

// Funktion zum Anzeigen aller geladenen Aufgaben
function zeigeAlleAufgaben(aufgabenListe) {
    const aufgabeContainer = document.getElementById('aufgabe');
    aufgabeContainer.innerHTML = ''; // Container leeren

    aufgabenListe.forEach(({ sammlung, aufgaben }) => {
        if (aufgaben.length > 0) {
            const randomIndex = Math.floor(Math.random() * aufgaben.length);
            const selectedTask = aufgaben[randomIndex];

            let htmlContent =
                `<div class="einleitung">
                    <p>${selectedTask.einleitung}</p>
                </div>
                <div class="nachfolgend">`;

            // Fragen und Antworten einfügen
            htmlContent += selectedTask.fragen.length === 1
                ? `<ol style="list-style-type: none;" aria-label>`
                : `<ol aria-label>`;

            selectedTask.fragen.forEach((frage, index) => {
                htmlContent += `<li><span class="frage">${frage}</span><br><span class="antwort">${selectedTask.antworten[index]}</span></li>`;
            });

            htmlContent += `</ol>`;

            // Erstelle ein div für die Aufgabe und ersetze Platzhalter
            const aufgabenElement = document.createElement('div');
            aufgabenElement.id = `aufgabe-${aufgabenZaehler}`;
            let interactiveHtml = replaceNumericalWithInteractive(htmlContent);
            interactiveHtml = replaceMultipleChoiceWithDropdown(interactiveHtml);
            interactiveHtml = replaceTiktokidWithUrl(interactiveHtml);
            interactiveHtml = replaceYoutubeidWithUrl(interactiveHtml);
            aufgabenElement.innerHTML = interactiveHtml;
            aufgabeContainer.appendChild(aufgabenElement);

            // Select2 Initialisierung für Dropdowns
            $(`#aufgabe-${aufgabenZaehler} select.mch`).select2({
                placeholder: "Antwort",
                minimumResultsForSearch: Infinity,
                width: 'auto'
            });

            // MathJax für mathematische Formeln
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, aufgabeContainer]);
            aufgabenZaehler++; // Aufgaben-Zähler erhöhen
        } else {
            console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
            document.getElementById('aufgabe').innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
        }
    });

    // Füge Listener für die Check-Icons hinzu
    addCheckIconListeners();
}

// Starte das Laden der Aufgaben
zeigeNeueAufgabe();
