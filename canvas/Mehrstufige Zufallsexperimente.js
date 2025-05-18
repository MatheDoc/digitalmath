erstelleQuiz('quiz-bm-folgern', 
    "quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammFolgern_OhneBedingt.json");
    
erstelleQuiz('quiz-bm-aufstellen1', 
"/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var1KeineInfoUnabh.json");

erstelleQuiz('quiz-bm-aufstellen2', 
"/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var2KeineInfoUnabh.json");

erstelleQuiz('quiz-bm-aufstellen3', 
"/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var3KeineInfoUnabh.json");


// Script dynamisch laden und Callback setzen
const script = document.createElement('script');
script.src = "js/baumdiagramm.js";
script.onload = function() {
  zeichneBaumdiagramm(0.5, 0.4, 0.1, 'baumdiagramm-mit-2-ereignissen', 'Baumdiagramm mit 2 Ereignissen');
  zeichneBaumdiagramm(0.5, 0.5, 0.5, 'kopfzahl', 'Zweimaliger Münzwurf', 'K', 'Z', 'K', 'Z');
};
document.body.appendChild(script);