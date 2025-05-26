//zeichneFunktion(x => x * x -3 * x - 5, -2, 5, 'meinPlot', 'Eine lienare Funktion');

x = [0, 1, 2, 3, 4, 5];
y = [0.03, 0.33, 0.57, 0.03, 0.04, 0];
zeichneDiskretesHistogramm(x, y, "histogramm-biathlet-A", "Biathlet A");

x = [0, 1, 2, 3, 4, 5];
y = [0.37, 0.16, 0.18, 0.08, 0.09, 0.12];
zeichneDiskretesHistogramm(x, y, "histogramm-biathlet-B", "Biathlet B");

ladeIframe(
  "quiz-erwartungswert-allgemein",
  "/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungEX.json"
);

ladeIframe(
  "quiz-standardabweichung-allgemein",
  "/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungSX.json"
);

ladeIframe(
  "quiz-fehlendeWkt",
  "/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_FehlendeWkt.json"
);

ladeIframe(
  "quiz-fehlenderWert",
  "/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_FehlenderWert.json"
);

ladeIframe(
  "quiz-zweiFehlendeWkt",
  "/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_ZweiFehlendeWkt.json"
);
