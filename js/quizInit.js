let aufgabenZaehler = 1;  // Initialisiere den Zähler für die Aufgaben
let questionId = 1;  // Eindeutige Frage-ID für jede Aufgabe

// neue Aufgabe anzeigen
function zeigeNeuesQuiz() {
    const params = new URLSearchParams(window.location.search);
    const sammlungen = params.getAll('sammlung');
    const titel = params.get('titel');
    const exam = params.get('exam');

    // Titel setzen, wenn vorhanden
    if (titel && exam === 'no') {
        const h3Element = document.getElementById('quiz-title');
        h3Element.textContent = titel;
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute('content', titel);
    }

    // Überschrift ausblenden, falls Prüfung
    if (exam === 'yes') {
        document.querySelector("h3").style.display = 'none';
    }

    if (sammlungen.length > 0) {
        shuffleArray(sammlungen);
        const aufgabenContainer = document.getElementById('aufgaben');

        sammlungen.forEach(sammlung => {
            fetch(`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${sammlung}`)
                .then(response => response.json())
                .then(data => {
                    const aufgabeDiv = document.createElement('div');
                    aufgabeDiv.id = `aufgabe-${aufgabenZaehler}`;
                    aufgabeDiv.classList.add('aufgabe');

                    if (exam === 'yes') {
                        const aufgabeTitel = document.createElement('h4');
                        aufgabeTitel.textContent = `${aufgabenZaehler}. Aufgabe`;
                        aufgabeDiv.appendChild(aufgabeTitel);
                    }

                    // Aufgabe einfügen
                    aufgabeDiv.innerHTML += zeigeZufaelligeAufgabeAusSammlung(sammlung, data);
                    aufgabenContainer.appendChild(aufgabeDiv);

                    // Initialisiere Select2
                    const selector = `#aufgabe-${aufgabenZaehler} select.mch`;
                    const $select = $(selector);

                    $select.select2({
                        placeholder: "Antwort",
                        minimumResultsForSearch: Infinity,
                        width: 'auto',
                        dropdownAutoWidth: true,
                        templateResult: renderWithMathJax,
                        templateSelection: renderWithMathJax
                    });

                    // Breite anpassen
                    adjustSelect2Width(selector);

                    // MathJax auf gesamte Aufgabe anwenden (inkl. statischem Inhalt)
                    MathJax.typesetPromise([document.getElementById(`aufgabe-${aufgabenZaehler}`)]);

                    // MathJax bei Dropdown-Öffnung erneut anwenden
                    $select.on('select2:open', () => {
                        setTimeout(() => {
                            const dropdown = document.querySelector('.select2-results');
                            if (dropdown) MathJax.typesetPromise([dropdown]);
                        }, 0);
                    });

                    // MathJax auf Auswahl anwenden
                    $select.on('select2:select', () => {
                        const selection = document.querySelector('.select2-selection__rendered');
                        if (selection) MathJax.typesetPromise([selection]);
                    });

                    aufgabenZaehler++;
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
    const pattern = /\{\d+:MC:([^}]*)\}/g;
    //const pattern = /\{\d+:MC:([\s\S]*?)\}/g;

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

// Funktion, um Breite der Select2 Options anzupassen
function adjustSelect2Width(selectElementSelector) { 
    const $select2 = $(selectElementSelector);
    const $select2Container = $select2.next('.select2-container');
    let maxWidth = 0;

    $select2.find('option').each(function() {
        const optionText = $(this).text();
        const tempSpan = $('<span>').text(optionText).appendTo('body');
        maxWidth = Math.max(maxWidth, tempSpan.width());
        tempSpan.remove();
    });

    $select2Container.width(maxWidth + 30);
}

// Funktion zur Darstellung mit gerendertem LaTeX
function renderWithMathJax(data) {
    if (!data.id) return data.text;
    const span = document.createElement('span');
    span.innerHTML = data.text;
    MathJax.typesetPromise([span]);
    return span;
}


// Initiales Laden eines Quiz
zeigeNeuesQuiz();

