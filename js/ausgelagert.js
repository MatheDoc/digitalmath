
// Neue Funktion, um alle richtigen Antworten anzuzeigen
function showAllAnswers() {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        const questionId = input.id.replace('answer', '');
        const correctAnswer = input.getAttribute('data-correct-answer');
        const feedbackElement = document.getElementById(`feedback${questionId}`);
        feedbackElement.innerHTML = correctAnswer;
        feedbackElement.style.color = "blue";
        feedbackElement.style.opacity = 1;
        input.style.display = "none";
    });

    document.querySelectorAll('select.mch').forEach(select => {
        const questionId = select.id.replace('answer', '');
        const correctAnswer = select.getAttribute('data-correct-answer');
        const feedbackElement = document.getElementById(`feedback${questionId}`);
        feedbackElement.innerHTML = correctAnswer;
        feedbackElement.style.color = "blue";
        feedbackElement.style.opacity = 1;
        // Select2-Container ausblenden
        const select2Container = select.nextElementSibling; // Nächstes Geschwisterelement nach select
        if (select2Container && select2Container.classList.contains('select2')) {
            select2Container.style.display = "none";
        }
    });

    document.querySelectorAll('.check-icon').forEach(icon => {
        icon.style.display = "none";
    });
}


function hideAllAnswers() {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        const questionId = input.id.replace('answer', '');
        const feedbackElement = document.getElementById(`feedback${questionId}`);
        feedbackElement.innerHTML = ''
        input.style.display = "inline";
    });

    // Select2 Dropdowns zurücksetzen und erneut initialisieren
    document.querySelectorAll('select.mch').forEach(select => {
        const questionId = select.id.replace('answer', '');
        const feedbackElement = document.getElementById(`feedback${questionId}`);
        feedbackElement.innerHTML = ''; // Feedback zurücksetzen


        // Entferne Select2 und setze Dropdown auf den Originalzustand
        $(select).select2('destroy'); // Select2-Widget entfernen
        select.style.display = "inline"; // Dropdown sichtbar machen

        // Select2 erneut initialisieren
        $(select).select2({
            placeholder: "Antwort",
            minimumResultsForSearch: Infinity,
            width: 'auto'
        });
    });

    document.querySelectorAll('.check-icon').forEach(icon => {
        icon.style.display = "inline";
    });
}


// pdf Export
function printToPDF() {
    window.print(); // Öffnet das Druckdialogfenster des Browsers
}

let aufgabenZaehler = 1; // Initialisiere den Zähler
let questionId = 1; // Eindeutige Frage-ID innerhalb einer Aufgabe


function checkAnswer(questionId, correctAnswer, tolerance) {
    let userAnswerString = document.getElementById(`answer${questionId}`).value;
    let sanitizedUserAnswerString = userAnswerString.replace(/^=/, '').replace(',', '.').trim();
    const userAnswer = parseFloat(sanitizedUserAnswerString);
    const feedbackElement = document.getElementById(`feedback${questionId}`);

    if (!isNaN(userAnswer)) {
        if (Math.abs(userAnswer - correctAnswer) <= parseFloat(tolerance)) {
            feedbackElement.innerHTML = 'Richtig!';
            if (userAnswer !== correctAnswer) { 
                feedbackElement.innerHTML += ' (Die genauere Antwort ist: ' + correctAnswer +')';
            }
            feedbackElement.style.color = "green";
            return true
        } else {
            feedbackElement.innerHTML = 'Falsch! Die richtige Antwort ist: ' + correctAnswer;
            feedbackElement.style.color = "red";
            document.body.style.backgroundColor = "#fdbdbd";
        }
        feedbackElement.style.transition = "opacity 0.5s ease-in-out";
        feedbackElement.style.opacity = 1;
    } else {
        feedbackElement.textContent = "Ungültige Eingabe";
        feedbackElement.style.color = "orange";
    }
}

function checkMultipleChoiceAnswer(questionId, correctAnswer) {
    const userAnswer = document.getElementById(`answer${questionId}`).value;
    const feedbackElement = document.getElementById(`feedback${questionId}`);

    if (userAnswer) {
        if (userAnswer === correctAnswer) {
            feedbackElement.innerHTML = 'Richtig!';
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = 'Falsch! Die richtige Antwort ist: ' + correctAnswer;
            feedbackElement.style.color = "red";
        }
        feedbackElement.style.transition = "opacity 0.5s ease-in-out";
        feedbackElement.style.opacity = 1;
    } else {
        feedbackElement.textContent = "Bitte eine Auswahl treffen";
        feedbackElement.style.color = "orange";
    }
}

function checkAllQuestions() {
    let correctCount = 0; // Zähler für korrekte Antworten
    let totalCount = 0; // Gesamtzahl der Fragen

    // Alle numerischen Antworten überprüfen
    document.querySelectorAll('input[type="text"]').forEach(input => {
        totalCount++; // Erhöhe die Gesamtzahl der Fragen
        const questionId = input.id.replace('answer', '');
        const correctAnswer = input.getAttribute('data-correct-answer');
        const tolerance = input.getAttribute('data-tolerance');
        
        // Überprüfe die Antwort und zähle korrekt
        if (checkAnswer(questionId, parseFloat(correctAnswer), parseFloat(tolerance))) {
            correctCount++; // Erhöhe den Zähler für korrekte Antworten
        }
    });

    // Alle Multiple-Choice-Antworten überprüfen
    document.querySelectorAll('select.mch').forEach(select => {
        totalCount++;
        const questionId = select.id.replace('answer', '');
        const correctAnswer = select.getAttribute('data-correct-answer');
        
        // Überprüfe die Antwort und zähle korrekt
        if (checkMultipleChoiceAnswer(questionId, correctAnswer)) {
            correctCount++;
        }
    });

    // Zeige die Gesamtbewertung an
    if (totalCount > 0) { // Sicherstellen, dass Fragen vorhanden sind
        // Hintergrundfarbe basierend auf der Anzahl der richtigen Antworten ändern
        if (correctCount === totalCount) {
            document.body.classList.add('strobe-background');
            document.body.style.backgroundColor = "#c4fcbf";
        } else {
            document.body.style.backgroundColor = "#fdbdbd"; // Nicht alle richtig
        }
    } else {
        alert("Es wurden keine Fragen gefunden."); // Nachricht, wenn keine Fragen vorhanden sind
    }
}





function replaceNumericalWithInteractive(htmlContent) {
    const pattern = /\{\d+:NUMERICAL:=(-?[0-9.,]+):([0-9.,]+)\}/g;
    function replacer(match, correctAnswer, tolerance) {
        const interactiveHtml = `
            <input type="text" id="answer${questionId}" placeholder="Antwort" data-correct-answer="${correctAnswer.replace(',', '.')}" data-tolerance="${tolerance.replace(',', '.')}">
            <i class="fas fa-paper-plane check-icon "title="Frage abschicken" onclick="checkAnswer(${questionId}, ${correctAnswer.replace(',', '.')}, ${tolerance.replace(',', '.')})"></i>
            <span id="feedback${questionId}"></span>
        `;
        questionId++; // Eindeutige ID für jede Frage
        return interactiveHtml;
    }
    return htmlContent.replace(pattern, replacer);
}

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
        questionId++; 
        return interactiveHtml;
    }

    return htmlContent.replace(pattern, replacer);
}

// Event-Listener für alle Check-Icons dynamisch hinzufügen
function addCheckIconListeners() {
    document.querySelectorAll('.check-icon, .check-all-icon, .eye-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const checkAllIcon = document.querySelector('.check-all-icon'); 
            if (checkAllIcon) {
                checkAllIcon.style.color = '#7e7e7e'
                checkAllIcon.onclick = null
                checkAllIcon.title = " "
                checkAllIcon.style.cursor = "auto"
            }
        });
    });
}





function zeigeNeueAufgabe() {
    const params = new URLSearchParams(window.location.search);
    const sammlungen = params.getAll('sammlung');
    const titel = params.get('titel');
    // Prüfen, ob der Parameter vorhanden ist
    if (titel) {
        const h3Element = document.getElementById('quiz-title');
        h3Element.textContent += ' ' + titel; // Titel anhängen
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute('content', titel);
    }
    if (sammlungen.length > 0) {
        // Eine zufällige Sammlung auswählen
        const zufaelligeSammlung = sammlungen[Math.floor(Math.random() * sammlungen.length)];

        // Aufgabe aus der zufällig ausgewählten Sammlung laden
        fetch(`json/${zufaelligeSammlung}`)
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
}

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
                if (selectedTask.fragen.length === 1) {
                    htmlContent += `<ol style="list-style-type: none;" aria-label>`;
                }
                else {
                    htmlContent += `<ol aria-label>`;
                }
                selectedTask.fragen.forEach((frage, index) => {
                        htmlContent += `<li><span class="frage">${frage}</span><br><span class="antwort">${selectedTask.antworten[index]}</span></li>`;
                    });
                htmlContent += `</ol>`;

        const aufgabenElement = document.createElement('div');
        aufgabenElement.id = `aufgabe-${aufgabenZaehler}`;
        var interactiveHtml = replaceNumericalWithInteractive(htmlContent);
        interactiveHtml = replaceMultipleChoiceWithDropdown(interactiveHtml);
        aufgabenElement.innerHTML = interactiveHtml;
        aufgabeContainer.appendChild(aufgabenElement);

        // Select2 Initialisierung
        $(`#aufgabe-${aufgabenZaehler} select.mch`).select2({
            placeholder: "Antwort",
            minimumResultsForSearch: Infinity,
            width: 'auto'
        });

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, aufgabeContainer]);

        aufgabenZaehler++;
                // Füge die Listener für die Check-Icons hinzu

addCheckIconListeners();
    } else {
        console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
        document.getElementById('aufgabe').innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
    }
}

// Initiales Laden einer zufälligen Aufgabe
zeigeNeueAufgabe();

// Wenn es nur ein <li> gibt, entferne die Nummerierung
document.querySelectorAll('ol').forEach(olElement => {
    const listItems = olElement.getElementsByTagName('li');
    if (listItems.length === 1) {
    olElement.style.listStyleType = "none";  // Entfernt die Nummerierung
    olElement.style.paddingLeft = "0";       // Entfernt den linken Abstand
    }
    });