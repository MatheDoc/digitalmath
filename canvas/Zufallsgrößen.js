//zeichneFunktion(x => x * x -3 * x - 5, -2, 5, 'meinPlot', 'Eine lienare Funktion');

x = [0, 1, 2, 3, 4, 5];
y = [0.03,0.33,0.57,0.03,0.04,0];
zeichneDiskretesHistogramm(x, y, 'histogramm-biathlet-A', 'Biathlet A');

x = [0, 1, 2, 3, 4, 5];
y = [0.37, 0.16, 0.18, 0.08, 0.09, 0.12];
zeichneDiskretesHistogramm(x, y, 'histogramm-biathlet-B', 'Biathlet B');

erstelleQuiz('quiz-erwartungswert-allgemein', "Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungEX");

erstelleQuiz('quiz-standardabweichung-allgemein', "Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungSX");

erstelleQuiz('quiz-fehlendeWkt', "Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_FehlendeWkt");

erstelleQuiz('quiz-fehlenderWert', "Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_FehlenderWert");

erstelleQuiz('quiz-zweiFehlendeWkt', "Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_ZweiFehlendeWkt");