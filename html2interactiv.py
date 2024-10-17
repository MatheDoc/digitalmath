import re
import os

# Funktion zum Ersetzen der Platzhalter durch interaktive Elemente
def replace_numerical_with_interactive(html_content):
    # Zähler für die Frage-IDs
    question_id = 1

    # Muster zum Finden von {punkte:NUMERICAL:=WERT:TOLERANZ}
    pattern = r'\{\d+:NUMERICAL:=(-?[0-9.,]+):([0-9.,]+)\}'

    # Funktion, die für jeden gefundenen Platzhalter das interaktive Element einfügt
    def replacer(match):
        nonlocal question_id
        correct_answer = match.group(1).replace(',', '.')  # Extrahiere die richtige Antwort
        tolerance = match.group(2).replace(',', '.')  # Extrahiere die Toleranz
        # Ersetze durch interaktives HTML mit Eingabe- und Button-Funktion
        interactive_html = f'''
        <input type="number" id="answer{question_id}" placeholder="Antwort">
        <button onclick="checkAnswer({question_id}, {correct_answer}, {tolerance})">Überprüfen</button>
        <span id="feedback{question_id}"></span>
        '''
        question_id += 1
        return interactive_html

    # Ersetzen der Platzhalter im gesamten HTML-Content
    return re.sub(pattern, replacer, html_content)

# CSS-Styling hinzufügen für modernes Aussehen
def add_css_styling(html_content):
    css_code = '''
    <style>
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #f0f4f8;
        margin: 0;
        padding: 0;
    }

    h1 {
        background-color: #4e73df;
        color: white;
        padding: 20px 0;
        margin-bottom: 20px;
        text-align: center;
    }

    h2 {
        color: #333;
        margin-top: 30px;
        margin-bottom: 15px;
        text-align: center;
    }

    .einleitung {
        margin: 0 auto;
        max-width: 700px;
    }

    p {
        color: #555;
        font-size: 1.1em;
        text-align: left;
    }

    ol {
        margin: 0 auto;
        padding: 0;
        list-style-position: inside;
        max-width: 700px;
    }

    li {
        background-color: #ffffff;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    input[type="number"] {
        padding: 10px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 80px;
    }

    button {
        background-color: #4e73df;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px; 
    }

    button:hover {
        background-color: #2e59d9;
    }

    #feedback1, #feedback2, #feedback3, #feedback4, #feedback5,
    #feedback6, #feedback7, #feedback8, #feedback9, #feedback10 {
        margin-left: 10px;
        font-weight: bold;
    }

    /* Responsive layout */
    @media (max-width: 768px) {
        li {
            padding: 15px;
        }

        input[type="number"] {
            width: 60px;
        }
    }

    /* Feste Bildbreite */
    img {
        width: 700px;
    } 

    </style>
    '''
    # Füge das CSS vor dem schließenden </head>-Tag ein
    return re.sub(r'(</head>)', css_code + r'\1', html_content, flags=re.IGNORECASE)

# Einfügen der JavaScript-Funktion zur Überprüfung der Antworten
def add_js_function(html_content):
    js_code = '''
    <script type="text/javascript">
        // Funktion zur Überprüfung der Antworten
        function checkAnswer(questionId, correctAnswer, tolerance) {
            var userAnswer = parseFloat(document.getElementById("answer" + questionId).value);
            var feedback = document.getElementById("feedback" + questionId);
            if (isNaN(userAnswer)) {
                feedback.textContent = "Bitte eine gültige Zahl eingeben.";
                feedback.style.color = "orange";
                feedback.style.opacity = 1;
            } else if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                feedback.textContent = "Richtig!";
                feedback.style.color = "green";
                feedback.style.opacity = 1;
            } else {
                feedback.textContent = "Falsch! Die richtige Antwort ist: " + correctAnswer;
                feedback.style.color = "red";
                feedback.style.opacity = 1;
            }
            // Sanfter Übergang für die Feedback-Nachricht
            feedback.style.transition = "opacity 0.5s ease-in-out";
        }
    </script>
    '''
    # Füge das JavaScript vor dem schließenden </body>-Tag ein
    return re.sub(r'(</body>)', js_code + r'\1', html_content, flags=re.IGNORECASE)

# Hauptfunktion zum Einlesen, Bearbeiten und Speichern der HTML-Datei
def process_html_file(input_file, output_file):
    try:
        # Lese die HTML-Datei ein
        with open(input_file, 'r', encoding='latin-1') as file:
            html_content = file.read()
        
        # Ersetze die {NUMERICAL}-Platzhalter durch interaktive Elemente
        modified_html = replace_numerical_with_interactive(html_content)
        
        # Füge das CSS hinzu
        modified_html = add_css_styling(modified_html)
        
        # Füge die JavaScript-Funktion zur Überprüfung der Antworten hinzu
        modified_html = add_js_function(modified_html)
        
        # Erstelle den Zielordner, falls er nicht existiert
        output_dir = os.path.dirname(output_file)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Speichere das Ergebnis in einer neuen Datei
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(modified_html)

        print(f"Die Datei wurde erfolgreich verarbeitet und unter '{output_file}' gespeichert.")
    
    except FileNotFoundError:
        print(f"Die Datei '{input_file}' wurde nicht gefunden.")
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {str(e)}")

# Aktuelles Verzeichnis
script_dir = os.path.dirname(__file__)

# Durchlaufen aller HTML-Dateien
input_dir = os.path.join(script_dir, 'Aufgaben', 'HTML')
output_dir = os.path.join(script_dir, 'Aufgaben', 'HTML_interaktiv')

# Erstelle das Ausgabe-Verzeichnis, falls es nicht existiert
os.makedirs(output_dir, exist_ok=True)

# Alle HTML-Dateien durchlaufen
for input_html_file in os.listdir(input_dir):
    if input_html_file.endswith('.html'):
        input_file_path = os.path.join(input_dir, input_html_file)  # Vollständiger Pfad zur Eingabedatei
        output_file_path = os.path.join(output_dir, input_html_file)  # Vollständiger Pfad zur Ausgabedatei
        process_html_file(input_file_path, output_file_path)

