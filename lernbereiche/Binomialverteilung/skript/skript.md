### Einführung

#### Begrifflichkeiten

Ein **Bernoulli-Experiment** ist ein Zufallsexperiment mit nur zwei möglichen Ergebnissen: Treffer oder Niete. Die Wahrscheinlichkeit für einen Treffer wird in der Regel mit $p$ bezeichnet, für eine Niete mit $q=1-p$. Wird ein Bernoulli-Experiment $n$-mal hintereinander bei gleichbleibender Trefferwahrscheinlichkeit durchgeführt, so sprechen wir von einer **Bernoulli-Kette** der Länge $n$.
Eine Zufallsgröße, die bei einer Bernoulli-Kette die Anzahl der Treffer angibt, heißt **binomialverteilt**.

Mit anderen Worten: Beim zugrundeliegenden Zufallsexperiment einer binomialverteilten Zufallsgröße

- gibt es feste Anzahl an Versuchen (Stufen),
- gibt es in jedem Versuch genau zwei mögliche Ausgänge,
- bleibt die Wahrscheinlichkeit für Treffer und Niete in jedem Versuch gleich.

Aufgrund dieser klaren Struktur werden sich viele systematische Rechenverfahren ergeben.

##### Übung: Welche Vorgänge sind zugrunde liegende Zufallsexperimente binomialverteilter Zufallsgrößen?

<details class="flip-card">
<summary>
Eine Münze wird 10 Mal geworfen.
</summary>
<div>
Binomialverteilt: Es gibt eine feste Anzahl an Versuchen (10), es gibt in jedem Versuch zwei mögliche Ausgänge ("Kopf" und "Zahl") und die Wahrscheinlichkeit für "Kopf" beträgt immer 50 % (ebenso für "weiß").
</div>
</details>

<details class="flip-card">
<summary>
Ein Würfel wird 10 Mal geworfen.
</summary>
<div>
Nicht binomialverteilt: Es gibt zwar eine feste Anzahl an Versuchen (10) und gleichbleibende Wahrscheinlichkeiten (für jede Augenzahl $\frac{1}{6}$), aber in jedem Versuch gibt es sechs mögliche Ausgänge.
</div>
</details>

<details class="flip-card">
<summary>
Für eine Person wird untersucht, ob sie in einem bestimmten Jahr geheiratet hat.
</summary>
<div>
Nicht binomialverteilt: Zwar gibt es in jedem Jahr nur zwei mögliche Ausgänge (geheiratet oder nicht). Die Wahrscheinlichkeit für eine Heirat ist jedoch nicht konstant – sie ist in jungen und alten Jahren geringer als im mittleren Alter. Auch die Anzahl der Versuche ist nicht prinzipiell festgelegt.
</div>
</details>

<details class="flip-card">
<summary>
Eine Person gibt wahllos so lange 4-stellige Zifferncodes ein bis sie den richtigen gefunden hat.
</summary>
<div>
Nicht binomialverteilt: Zwar gibt es in jedem Versuch zwei mögliche Ausgänge (der Code ist "richtig" oder "falsch") und eine gleichbleibende Trefferwahrscheinlichkeit von $0{,}001$. Allerdings ist die Anzahl der Versuche nicht festgelegt, da der Vorgang nach dem ersten erfolgreichen Versuch beendet wird.
</div>
</details>

<details class="flip-card">
<summary>
Aus einer Urne mit 7 schwarzen und 3 weißen Kugeln wird 4 Mal mit Zurücklegen eine Kugel gezogen.
</summary>
<div>
Binomialverteilt: Es gibt eine feste Anzahl an Versuchen (4), in jedem Versuch gibt es zwei mögliche Ausgänge ("schwarz" und "weiß") und die Wahrscheinlichkeit für "schwarz" beträgt immer 70 % (und für "weiß" immer 30 %).
</div>
</details>

<details class="flip-card">
<summary>
Aus einer Urne mit 7 schwarzen und 3 weißen Kugeln wird 4 Mal ohne Zurücklegen eine Kugel gezogen.
</summary>
<div>
Nicht binomialverteilt: Zwar gibt es eine feste Anzahl an Versuchen (4) und in jedem Versuch zwei mögliche Ausgänge ("schwarz" und "weiß"), aber die Wahrscheinlichkeiten für "schwarz" (und "weiß") ändern sich von Stufe zu Stufe.
</div>
</details>

#### Die Bernoulli-Formel

Wir betrachten eine Bernoulli-Kette der Länge $n$ mit Trefferwahrscheinlichkeit $p$ und fragen nach der Wahrscheinnlichkeit für genau $k$ Treffer. Das zugehörige Baumdiagramm hat folgende Gestalt:

<div id="baumdiagramm-binomialverteilung"></div>

Um die Wahrscheinlichkeit für genau $k$ Treffer zu berechnen, benötigen wir die erstens Anzahl der Pfade mit genau $k$ Treffern und zweitens die Endwahrscheinlichkeit eines solchen Pfades.

- **Pfadanzahl:** Der sogenannte Binomialkoeffizient (lies: n über k)
  \begin{align*}
  \binom{n}{k}&=\frac{n!}{k!\cdot (n-k)!}\\\\
  &=\frac{1\cdot 2 \cdot \ldots n}{(1\cdot 2 \cdot \ldots k)\cdot (1\cdot 2 \cdot \ldots (n-k))}
  \end{align*}
  gibt diese Anzahl an Pfaden an. Er kann mit den meisten Taschenrechnern direkt bestimmt werden.

- **Pfadendwahrscheinlichkeit:** Jeder dieser Pfade hat nach der Pfadmultipliaktionsregel dieselbe Pfadwahrscheinlichkeit
  $$
  p^k \cdot (1−p)^{n−k},
  $$
  denn auf jedem dieser Pfade treten genau $k$ Treffer und $n−k$ Nieten auf.

Damit ergibt sich mit der Pfadadditionsregel die **Bernoulli-Formel** für genau $k$ Treffer:

$$
P(X=k)=\binom{n}{k}\cdot p^k\cdot (1-p)^{n-k}
$$

Diese Formel bildet die Grundlage für viele Wahrscheinlichkeitsberechnungen. Sie ist in einigen Taschenrechnern als Funktion integriert und in Tafelwerken dokumentiert.

##### Berechnungen

<details class="flip-card">
<summary>
Eine Basketballspielerin habe eine Trefferwahrscheinlichkeit von 70 % und wirft 4 Mal. Wie groß ist die Wahrscheinlichkeit, dass sie genau 3 Treffer erzielt?
</summary>
<div>
Es ist $n=4$, $p=0{,}7$ und $k=3$. Damit haben wir
\begin{align*}
P(X=4)&=\binom{4}{3}\cdot 0{,}7^3\cdot (1-0{,}7)^{4-3}\\
&=0{,}4116
\end{align*}
</div>
</details>

##### Interpretation der Bernoulli-Formel

Durch den häufigen Einsatz von Taschenrechnern oder Tafelwerken gerät die Bedeutung der Bernoulli-Formel manchmal in den Hintergrund. Dabei ist gerade diese Formel die Grundlage dafür, dass solche Hilfsmittel Wahrscheinlichkeiten so zuverlässig berechnen können. Es ist wichtig, die Formel auch inhaltlich interpretieren zu können.“

##### Beispiel: Porzellanmanufaktur

Eine Porzellanmanufaktur stellt Vasen her. Der Großteil der produzierten Vasen ist verkaufsfähig, ein kleiner Teil muss jedoch entsorgt werden. Bei einer Stichprobe in der Manufaktur werden verkaufsfähige und defekte Vasen festgestellt. Bei einer Stichprobe in der Manufaktur werden auch defekter Vasen gefunden. Danach wird die folgende Rechnung aufgestellt:

$$
\binom{50}{3}\cdot 0{,}04^3\cdot 0{,}96^{47}=0{,}1842
$$

Was bedeuten die folgenden Zahlen im Sachzusammenhang?

<details class="flip-card">
<summary>
$50$
</summary>
<div>
Die Anzahl der untersuchten Vasen.
</div>
</details>
<details class="flip-card">
<summary>
$3$
</summary>
<div>
Die Anzahl der defekten Vasen.
</div>
</details>
<details class="flip-card">
<summary>
$0{,}04$
</summary>
<div>
Die Wahrscheinlichkeit, dass eine Vase defekt ist.
</div>
</details>
<details class="flip-card">
<summary>
$0{,}96$
</summary>
<div>
Die Wahrscheinlichkeit, dass eine Vase verkaufsfähig ist.
</div>
</details>
<details class="flip-card">
<summary>
$47$
</summary>
<div>
Die Anzahl der verkaufsfähigen Vasen.
</div>
</details>
</details>
<details class="flip-card">
<summary>
$0{,}1842$
</summary>
<div>
Die Wahrscheinlichkeit, dass sich unter 50 Vasen genau 3 defekte befinden.
</div>
</details>

##### Beispiel: Porzellanmanufaktur

#### Intervallwahrscheinlichkeiten

#### Erwartungswert und Standardabweichung
