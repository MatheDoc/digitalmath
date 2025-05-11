### Einführung

Ergebnisse von Zufallsexperimenten sind im Allgemeinen keine Zahlen, sondern beliebige Elemente (beim Münzwurfe sind die Ergebnisse z.B. "Kopf" und "Zahl"). Von solchen Ergebnissen können Wahrscheinlichkeiten bestimmt werden, aber keine Kennzahlen wie einen Mittelwert (beim Münzwurf ist die Frage "Welches Ergebnis werfe ich im Durchschnitt?" sinnlos). Dazu ist es nötig, dass wir Ergebnissen Zahlen zuordnen.

Eine **Zufallsgröße** $X$ ordnet jedem Ergebnis eines Zufallsexperiment eine reelle Zahl zu. Wir sprechen in der Regel direkt von Werten einer Zufallsgröße $x_1, x_2, \ldots $ und ihren Wahrscheinlichkeiten $P(X=x_1)$, $P(X=x_2)$, $\ldots$. Die Wahrscheinlichkeitsverteilung einer Zufallsgröße stellen wir häufig tabellarisch oder mit Histogrammen dar.

##### Beispiel: Biathlet A

Ein Biathlet A absolviert eine Schießeinheit mit fünf Schüssen auf Zielscheiben. Die Zufallsgröße $X$ beschreibt die Anzahl der Fehlschüsse. Aus langfristigen Beobachtungen ergeben sich die folgenden Wahrscheinlichkeiten für die möglichen Werte von $X$:

| Fehlschüsse $x_i$  | $0$    | $1$    | $2$    | $3$    | $4$    | $5$    |
|-----------------------|------|------|------|------|------|------|
| $P(X = x_i)$      | $0{,}21$ | $0{,}32$ | $0{,}19$ | $0{,}15$ | $0{,}09$ | $0{,}04$ |

<div id="histogramm" class="diagramm"></div>


<!--
##### Beispiel: Wurf zweier Würfel
Die Ergebnismenge ist $S=\\{(1;1),(1;2),\ldots,(6;6)\\}$. Die Zufallsgröße bestehe nun darin, jedem Ergebnis die Summe der Augenzahlen zuzuordnen: $(1;1) \mapsto 2$, $(1;2) \mapsto 3$, $\ldots$, $(6;6) \mapsto 12$.

| $x_i$            | $2$            | $3$            | $4$            | $5$            | $6$            | $7$            | $8$            | $9$            | $10$           | $11$           | $12$           |
|------------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|
| $P(X = x_i)$     | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |
-->

### Histogramme

### Der Erwartungswert

### Die Standardabweichung

Wir suchen eine Kennzahl, mit der wir messen können, wie stark eine Zufallsgröße von ihrem Erwartungswert abweicht.
Die grundlegende Idee ist es, die Summe der qudadierten mit Wahrscheinlichkeiten gewichtet abweichungen vom Erwartungswert zu betrachten und anschließend die Wurzel zu ziehen.
Standardabweichung

$$
\sigma(X) = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2}
$$

<!--#### Exkurs: Bedeutung der Standardabweichung

Dazu wechseln wir einmal die Perspektive: Statistik und ohne Gewichtung mit Wahrscheinlichkeiten. Dann haben wir folgendes Setting:

Beobachtungswerte $x_1, x_2, \ldots x_n$: Dem Erwartungswert entpsriht hier das airthnetische Mittel. (An dieser Stelle könnte man im übrigen grundsätzlich fragen, ob das arithmetische Mittel ok ist)
Frage: Wie messen wir die Abweichung vom airthmwtschen Mittel. Wir betrachten 3 Möglchkeiten

1. absolute Abweichung
2. quadraitsche Abweichung
3. Abweochugnen höheren ORdnung

...
1. wird durch den MEdian minimeirt
2. Nur die quarstische Abweichung wurd durch das arithmwitsche Mittel minimiert.
3. andere KEnnahlen

WEnn wir also wollen, das unser abweichungsmaß beim arithmetischen mittel den kleinsten wert annimmt, so landen wir bei der standaabweichung. Historisch gibt es einen spektakulären Efolgt: Gauss hat mit Hilfe der quadratischen Abweichugnen einen Planten entdeckt.


Absolute Abweichung

Wir betrachten die Standardabweichng zunächst ohne den Erwartungswert als eine Funktion in Abhängigkeit von $x$
$$
f(x)=\sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_i - x)^2}
$$
Durch eine REchnung lässt sich zeigen, dass $f$ für 
-->