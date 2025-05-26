erstelleQuiz(
  "quiz-interpretationen-bedingt",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_Interpretationen_mitBedingt.json"
);

erstelleQuiz(
  "quiz-venn-bedingt",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_Venn_MitBedingt.json"
);

erstelleQuiz(
  "quiz-gemischt-bedingt",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BayesUndSylvester_ohneGegUnabh.json&/sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BayesUndSylvester_mitGegUnabh.json"
);

erstelleQuiz(
  "quiz-vft-aufstellen",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var1keineInfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var2keineInfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var3keineInfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var4keineInfoUnabh.json"
);

erstelleQuiz(
  "quiz-vft-folgern",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelFolgern_OhneBedingt.json"
);

erstelleQuiz(
  "quiz-bm-aufstellen-su",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var1InfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var2InfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammErstellen_Var3InfoUnabh.json"
);

erstelleQuiz(
  "quiz-bm-folgern-su",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_BaumdiagrammFolgern_MitBedingt.json"
);

erstelleQuiz(
  "quiz-vft-aufstellen-su",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var1InfoUnabh.json&sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelErstellen_Var2InfoUnabh.json"
);

erstelleQuiz(
  "quiz-vft-folgern-su",
  "/quiz.html?sammlung=Stochastik_Allgemein_Methoden%20der%20Wahrscheinlichkeitsrechnung_VierFelderTafelFolgern_MitBedingt.json"
);

// Script dynamisch laden und Callback setzen
const script = document.createElement("script");
script.src = "js_tools/baumdiagramm.js";
script.onload = function () {
  zeichneBaumdiagramm(
    0.7,
    0.9,
    0.2,
    "baumdiagramm-einleitung",
    "Lernen (A) und Bestehen (B)"
  );
  zeichneBaumdiagramm(
    0.5,
    0.1,
    0.3,
    "notationen",
    "Bezeichnungen",
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );
  zeichneBaumdiagramm(0.5, 0.1, 0.3, "invers1", "1. Stufe A, 2. Stufe B");
  zeichneBaumdiagramm(
    0.2,
    0.25,
    0.5625,
    "invers2",
    "1. Stufe B, 2. Stufe A",
    "B",
    "B\u0305",
    "A",
    "A\u0305"
  );
  zeichneBaumdiagramm(0.7, 0.9, 0.2, "sa", "Stochastische Abhängigkeit");
  zeichneBaumdiagramm(0.7, 0.9, 0.9, "su", "Stochastische Unabhängigkeit");
};
document.body.appendChild(script);
