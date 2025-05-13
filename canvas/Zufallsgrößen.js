//zeichneFunktion(x => x * x -3 * x - 5, -2, 5, 'meinPlot', 'Eine lienare Funktion');

x = [0, 1, 2, 3, 4, 5];
y = [0.03,0.33,0.57,0.03,0.04,0];
zeichneDiskretesHistogramm(x, y, 'histogramm-biathlet-A', 'Biathlet A');

x = [0, 1, 2, 3, 4, 5];
y = [0.37, 0.16, 0.18, 0.08, 0.09, 0.12];
zeichneDiskretesHistogramm(x, y, 'histogramm-biathlet-B', 'Biathlet B');

erstelleQuiz('quiz-erwartungswert',"/quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungEX.json&titel=Ich kann den Erwartungswert einer allgemeinen Zufallsgröße berechnen");

erstelleQuiz('quiz-standardabweichung',"quiz.html?sammlung=Stochastik_Allgemein_Zufallsgrößen_Kennzahlen_BestimmungSX.json&titel=Ich kann die Standardabweichung einer allgemeinen Zufallsgröße berechnen.");