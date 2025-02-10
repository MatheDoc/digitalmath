let aufgabenZaehler = 1;  // Initialisiere den Zähler für die Aufgaben
let questionId = 1;  // Eindeutige Frage-ID für jede Aufgabe

// neue Aufgabe anzeigen
function zeigeNeuesQuiz() {
    const params = new URLSearchParams(window.location.search);
    const sammlungen = params.getAll('sammlung');
    const titel = params.get('titel');
    const exam = params.get('exam');

    // Prüfen, ob der Parameter 'Titel' vorhanden ist und ob kein exam
    if (titel && exam === 'no') {
        const h3Element = document.getElementById('quiz-title');
        h3Element.textContent = titel;  // Titel anhängen
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute('content', titel);  // Meta-Beschreibung setzen
    }

    if (exam === "yes"){
        document.querySelector("h3").style.display = 'none'; // Ich kann Text ausblenden
    }


    // Alternativ-Test, wenn ohne Effekt: löschen
    document.addEventListener('DOMContentLoaded', () => {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', titel);
        }
    });


    if (sammlungen.length > 0) {
        shuffleArray(sammlungen); // Sammlungen in zufälliger Reihenfolge sortieren
        sammlungen.forEach(sammlung => {
            fetch(`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${sammlung}`)
                .then(response => response.json())
                .then(data => {
                    // Erstelle eine neue h4-Überschrift für jede Sammlung
                    const aufgabeContainer = document.getElementById('aufgabe');
                    const aufgabeTitel = document.createElement('h4');
                    aufgabeTitel.textContent = `${aufgabenZaehler}. Aufgabe`;  // Nummer hinzufügen
                    aufgabeContainer.appendChild(aufgabeTitel);
    
                    // Zeige die Aufgabe aus der Sammlung
                    zeigeZufaelligeAufgabeAusSammlung(sammlung, data);
                    aufgabenZaehler++; // Zähler erhöhen
                })
                .catch(error => {
                    console.error(`Fehler beim Laden der JSON-Datei für ${sammlung}:`, error);
                    document.getElementById('aufgabe').innerHTML += `<p>Es gab ein Problem beim Laden der Aufgaben aus der Sammlung ${sammlung}.</p>`;
                });
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
        interactiveHtml = replaceTiktokidWithUrl(interactiveHtml);
        interactiveHtml = replaceYoutubeidWithUrl(interactiveHtml);
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

        // Füge Listener für die Check-Icons hinzu
        addCheckIconListeners();
    } else {
        console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
        document.getElementById('aufgabe').innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
    }
}


// Ersetze Tiktok-Platzhalter durch URLs
function replaceTiktokidWithUrl(htmlContent) {
    // RegExp für das TikTok-ID-Muster
    const pattern = /\{TIKTOK:id=([A-Za-z0-9_-]+)}/g;

    // Replacer-Funktion mit den richtigen Parametern
    function replacer(match, id) {
        const url = `<i class="fab fa-tiktok clip-icon" title="Clip" onclick="window.open('https://www.tiktok.com/@mathechecks/video/${id}', '_blank')"></i>`;
        return url
    }
    // Ersetze das Muster im Text
    return htmlContent.replace(pattern, replacer);
}

    // Ersetze Youtube-Platzhalter durch URLs
    function replaceYoutubeidWithUrl(htmlContent) {
        // RegExp für das TikTok-ID-Muster
        const pattern = /\{YOUTUBE:id=([A-Za-z0-9_-]+)}/g;

        // Replacer-Funktion mit den richtigen Parametern
        function replacer(match, id) {
            const url = `<i class="fab fa-youtube clip-icon" title="Clip" onclick="window.open('https://youtube.com/shorts/${id}', '_blank')"></i>`;
            return url
        }
        // Ersetze das Muster im Text
        return htmlContent.replace(pattern, replacer);
    }



// Ersetze numerische Aufgaben mit interaktiven Eingabefeldern
function replaceNumericalWithInteractive(htmlContent) {
    const pattern = /\{\d+:NUMERICAL:=(-?[0-9.,]+):([0-9.,]+)\}/g;
    function replacer(match, correctAnswer, tolerance) {
        const interactiveHtml = `
            <input type="text" id="answer${questionId}" placeholder="Antwort" autocomplete="off" aria-label="Frage ${questionId}" data-correct-answer="${correctAnswer.replace(',', '.')}" data-tolerance="${tolerance.replace(',', '.')}">
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
            <select id="answer${questionId}" class="mch" aria-label="Multiple Choice Frage ${questionId}" data-correct-answer="${correctAnswer}">
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


// Funktion zum Zufällig-Mischen eines Arrays (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tauschen der Elemente
    }
}

// Check-Icon Listener hinzufügen
/*function addCheckIconListeners() {
    document.querySelectorAll('.check-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // Implementiere hier die Logik zur Überprüfung der Antwort
            console.log("Antwort überprüft!");
        });
    });
}*/

// Initiales Laden einer zufälligen Aufgabe
zeigeNeuesQuiz();
