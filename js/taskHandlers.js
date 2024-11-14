let aufgabenZaehler = 1;  // Initialisiere den Zähler für die Aufgaben
let questionId = 1;  // Eindeutige Frage-ID für jede Aufgabe

// neue Aufgabe anzeigen
function zeigeNeueAufgabe() {
    const params = new URLSearchParams(window.location.search);
    const sammlungen = params.getAll('sammlung');
    const titel = params.get('titel');

    // Prüfen, ob der Parameter 'Titel' vorhanden ist
    if (titel) {
        const h3Element = document.getElementById('quiz-title');
        h3Element.textContent += ' ' + titel;  // Titel anhängen
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute('content', titel);  // Meta-Beschreibung setzen
    }

    // Prüfen, ob Sammlungen vorhanden sind
    if (sammlungen.length > 0) {
        // Eine zufällige Sammlung auswählen
        const zufaelligeSammlung = sammlungen[Math.floor(Math.random() * sammlungen.length)];

        // Aufgabe aus der zufällig ausgewählten Sammlung laden
        fetch(`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${zufaelligeSammlung}`)
            .then(response => response.json())
            .then(data => zeigeZufaelligeAufgabeAusSammlung(zufaelligeSammlung, data))
            .catch(error => {
                console.error(`Fehler beim Laden der JSON-Datei für ${zufaelligeSammlung}:`, error);
                document.getElementById('aufgabe').innerHTML = `<p>Es gab ein Problem beim Laden der Aufgaben aus der Sammlung ${zufaelligeSammlung}.</p>`;
            });
    } else {
        console.error('Keine Sammlung in der URL gefunden.');
        document.getElementById('aufgabe').innerText = 'Keine Sammlung gefunden.';
    }

    // Wenn es nur ein <li> gibt, entferne die Nummerierung
    document.querySelectorAll('ol').forEach(olElement => {
        const listItems = olElement.getElementsByTagName('li');
        if (listItems.length === 1) {
            olElement.style.listStyleType = "none";  // Entfernt die Nummerierung
            olElement.style.paddingLeft = "0";       // Entfernt den linken Abstand
        }
    });
}

// Aufgabe aus der Sammlung anzeigen
function zeigeZufaelligeAufgabeAusSammlung(sammlung, aufgaben) {
    if (aufgaben.length > 0) {
        const randomIndex = Math.floor(Math.random() * aufgaben.length);
        const selectedTask = aufgaben[randomIndex];
        const aufgabeContainer = document.getElementById('aufgabe');
        
        let htmlContent =
            `<div class="einleitung">
                <p>${selectedTask.einleitung}</p>
            </div>
            <div class="nachfolgend">`;

        // Fragen und Antworten einfügen
        if (selectedTask.fragen.length === 1) {
            htmlContent += `<ol style="list-style-type: none;" aria-label>`;
        } else {
            htmlContent += `<ol aria-label>`;
        }

        selectedTask.fragen.forEach((frage, index) => {
            htmlContent += `<li><span class="frage">${frage}</span><br><span class="antwort">${selectedTask.antworten[index]}</span></li>`;
        });

        htmlContent += `</ol>`;

        const aufgabenElement = document.createElement('div');
        aufgabenElement.id = `aufgabe-${aufgabenZaehler}`;
        let interactiveHtml = replaceNumericalWithInteractive(htmlContent);
        interactiveHtml = replaceMultipleChoiceWithDropdown(interactiveHtml);
        aufgabenElement.innerHTML = interactiveHtml;
        aufgabeContainer.appendChild(aufgabenElement);

        // Select2 Initialisierung
        $(`#aufgabe-${aufgabenZaehler} select.mch`).select2({
            placeholder: "Antwort",
            minimumResultsForSearch: Infinity,
            width: 'auto'
        });

        // MathJax für mathematische Formeln
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, aufgabeContainer]);
        aufgabenZaehler++;  // Aufgaben-Zähler erhöhen

        // Füge Listener für die Check-Icons hinzu
        addCheckIconListeners();
    } else {
        console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
        document.getElementById('aufgabe').innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
    }
}

// Ersetze numerische Aufgaben mit interaktiven Eingabefeldern
function replaceNumericalWithInteractive(htmlContent) {
    const pattern = /\{\d+:NUMERICAL:=(-?[0-9.,]+):([0-9.,]+)\}/g;
    function replacer(match, correctAnswer, tolerance) {
        const interactiveHtml = `
            <input type="text" id="answer${questionId}" placeholder="Antwort" data-correct-answer="${correctAnswer.replace(',', '.')}" data-tolerance="${tolerance.replace(',', '.')}">
            <i class="fas fa-paper-plane check-icon " title="Frage abschicken" onclick="checkNumericalAnswer(${questionId}, ${correctAnswer.replace(',', '.')}, ${tolerance.replace(',', '.')})"></i>
            <span id="feedback${questionId}"></span>
        `;
        questionId++;  // Eindeutige ID für jede Frage
        return interactiveHtml;
    }
    return htmlContent.replace(pattern, replacer);
}

// Ersetze Multiple-Choice-Fragen mit Dropdowns
function replaceMultipleChoiceWithDropdown(htmlContent) {
    const pattern = /\{\d+:MCH:([^}]*)\}/g;  
    function replacer(match, optionsString) {
        const options = optionsString.split('~');
        const correctAnswer = options.find(option => option.startsWith('='))?.substring(1).trim();

        const optionsHtml = options.map(option => {
            const isCorrect = option.startsWith('=');
            const trimmedOption = isCorrect ? option.substring(1).trim() : option.trim();  // Entfernen von `=`
            return `<option value="${trimmedOption}">${trimmedOption}</option>`;
        }).join('');

        const interactiveHtml = `
            <select id="answer${questionId}" class="mch" data-correct-answer="${correctAnswer}">
                ${optionsHtml}
            </select>
            <i class="fas fa-paper-plane check-icon" onclick="checkMultipleChoiceAnswer(${questionId}, '${correctAnswer}')"></i>
            <span id="feedback${questionId}"></span>
        `;
        questionId++;  // Eindeutige ID für jede Frage
        return interactiveHtml;
    }
    return htmlContent.replace(pattern, replacer);
}

// Check-Icon Listener hinzufügen
function addCheckIconListeners() {
    document.querySelectorAll('.check-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // Implementiere hier die Logik zur Überprüfung der Antwort
            console.log("Antwort überprüft!");
        });
    });
}

// Initiales Laden einer zufälligen Aufgabe
zeigeNeueAufgabe();
