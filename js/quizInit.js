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

    if (exam === 'yes'){
        document.querySelector("h3").style.display = 'none'; // Ich kann Text ausblenden
    }

    if (sammlungen.length > 0) {
        shuffleArray(sammlungen); // Sammlungen in zufälliger Reihenfolge sortieren
        
        // Aufgaben-Div
        const aufgabenContainer = document.getElementById('aufgaben');

        sammlungen.forEach(sammlung => {
            fetch(`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${sammlung}`)
                .then(response => response.json())
                .then(data => {
             
                    // Erstelle einen neuen Div-Container für die Aufgabe
                    const aufgabeDiv = document.createElement('div');
                    aufgabeDiv.id = `aufgabe-${aufgabenZaehler}`; // Eindeutige ID
    
                    // Erstelle eine neue h4-Überschrift für jede Sammlung, falls exam=yes
                    if (exam === 'yes') {
                        const aufgabeTitel = document.createElement('h4');
                        aufgabeTitel.textContent = `${aufgabenZaehler}. Aufgabe`;
                        aufgabeDiv.appendChild(aufgabeTitel);
                    }
    
                    // Füge die Aufgabe in das neue Div ein
                    aufgabeDiv.innerHTML += zeigeZufaelligeAufgabeAusSammlung(sammlung, data);
    
                    // Hänge das fertige Aufgaben-Div an den Hauptcontainer an
                    aufgabenContainer.appendChild(aufgabeDiv);
                    
// MathJax anwenden für das neu hinzugefügte Div
MathJax.typesetPromise([aufgabeDiv]);

                    // Select2 für alle Dropdowns in der Aufgabe initialisieren
                    $(`#aufgabe-${aufgabenZaehler} select.mch`).select2({
                        placeholder: "Antwort",
                        minimumResultsForSearch: Infinity,
                        width: 'auto'   
                    });
                    
                    // MathJax anwenden
                    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(`aufgabe-${aufgabenZaehler}`)]);

                    
                    
                    
                    
                    aufgabenZaehler++; // Zähler erhöhen

                    // Check-all item ggf. ausblenden, evtl position ändern
                    addCheckIconListeners(); 
                })
                .catch(error => {
                    console.error(`Fehler beim Laden der JSON-Datei für ${sammlung}:`, error);
                    document.getElementById('aufgaben').innerHTML += `<p>Es gab ein Problem beim Laden der Aufgaben aus der Sammlung ${sammlung}.</p>`;
                });
        });

        
    } else {
        console.error('Keine Sammlung in der URL gefunden.');
        document.getElementById('aufgabe').innerText = 'Keine Sammlung gefunden.';
    }
    

}

// Aufgabe aus der Sammlung anzeigen
function zeigeZufaelligeAufgabeAusSammlung(sammlung, aufgaben) {
    if (aufgaben.length > 0) {

        const randomIndex = Math.floor(Math.random() * aufgaben.length);
        const selectedTask = aufgaben[randomIndex];

        // html Inhalt mit Einführung
        let htmlContent = `<div class="einleitung"><p>${selectedTask.einleitung}</p></div>`;  // Korrekt eingebundener Inhalt

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


        // Interaktive Ersetzungen
        htmlContent = replaceNumericalWithInteractive(htmlContent);
        htmlContent = replaceMultipleChoiceWithDropdown(htmlContent);
        htmlContent = replaceTiktokidWithUrl(htmlContent);
        htmlContent = replaceYoutubeidWithUrl(htmlContent);
        
        return htmlContent;

    } else {
        console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
        document.getElementById('aufgaben').innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
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


// Initiales Laden eines Quiz
zeigeNeuesQuiz();

window.onload = function() {
    MathJax.typesetPromise();
};


