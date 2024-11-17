 // alle richtigen Antworten anzeigen
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


 // alle Antworten ausblenden
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


function checkNumericalAnswer(questionId, correctAnswer, tolerance) {
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

//alle Fragen überprüfen
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
        if (checkNumericalAnswer(questionId, parseFloat(correctAnswer), parseFloat(tolerance))) {
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


// check all icon ausblenden, falls Lösung angezeigt wurde
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