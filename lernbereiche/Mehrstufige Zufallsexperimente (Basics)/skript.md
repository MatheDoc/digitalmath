## Einführung
Wenn mehrere Zufallsexperimente nacheinander durchgeführt werden, sprechen wir von einem mehrstufigen Zufallsexperiment. Zu übersichtlichen Darstellung nutzen wir häufig Baumdiagramme. Für jede Stufe des Zufallsexperiments werden die Ergebnisse des einzelnen Zufallsexperiments als Knotenpunkte notiert. Die Stufen werden dann durch Pfade miteinander verbunden. Ein Ergebnis des mehrstufigen Zufallsexperiment entspricht dann einem vollständigen Pfad im Baumdiagramm. An den einzelnen Pfaden stehen die entsprechenden Wahrscheinlichkeiten. Es gibt zwei wichtige Regeln:

* **Pfadmultiplikationsregel:** Die Wahrscheinlichkeit eines Ergebnisses ist das Produkt der Wahrscheinlichkeiten entlang des entsprechenden Pfades.
* **Pfadadditionsregel:** Die Wahrscheinlichkeit eines Ereignisses ist die Summe der Wahrscheinlichkeiten der Ergebnisse, die zu diesem Ereignis führen.

Da generell die Summe aller Wahrscheinlichkeiten eines Zufallsexperiments immer gleich 1 ist, ist auch Summe der Wahrscheinlichkeiten aller Pfade, die von einem Knotenpunkt starten, gleich 1. Ebenso ist auch die Summe der Endwahrscheinlichkeiten gleich 1.



### Beispiele

#### Zweimaliger Münzwurf mit Beachtung der Reihenfolge
Da Kopf ($K$) und Zahl ($Z$) treten bei einem einmaligen Wurf beide mit einer Wahrscheinlichkeit von 50% auf. Daraus ergibt sich
<figure>
  <img src="münze2x.png" style="width: 500px;">
</figure>
Nach der Pfadmultiplikationsregel haben wir jede Endwahrscheinlichkeit mit $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$ berechnet.

Betrachten wir z.B. das Ereignis $E:$ "Es wird zweimal das Gleiche geworfen.", so ist $E=\\{KK;ZZ\\}$, und nach der Pfadadditionsregel folgt nun
\begin{align*}
P(E)&=P(\\{KK\\})+P(\\{ZZ\\})\\\\
&=0{,}25+0{,}25\\\\
&=0{,}5.
\end{align*}

#### Jugendliche auf dem Weg zu Schule
Baumdiagramme eignen sich vor allem dazu, kompliziertere Zufallsexperimente zu veranschaulichen:

Es ist bekannt, dass 4,7% aller Jugendlichen aus unterschiedlichen Gründen nicht zur Schule kommen und zu Hause bleiben ($H$). Vier Fünftel werden kommen selbstständig ($S$) zur Schule, die übrigen werden von ihren Eltern ($E$) gebracht. Von denjenigen, die selbstständig zur Schule kommen, nutzen 30% das Fahrrad ($F$), 23% das Auto ($A$), 12% gehen zu Fuß ($G$) und die restlichen Schülerinnen und Schüler benutzen den öffentlichen Personennahverkehr (Ö). 
Alle Jugendlichen, die den Großteil ihres Schulwegs an der frischen Luft verbringen, sind in der ersten Unterrichtsstunde wach ($W$). Bei den mit dem Auto gebrachten Jugendlichen ist es lediglich ein Viertel, bei den Nutzern des öffentlichen Personennahverkehrs immerhin noch die Hälfte.
Von den Jugendlichen, die von ihren Eltern zur Schule gebracht werden, ist nur jeder 10. wach.

Das entsprechende Baumdiagramm lautet:
 <figure>
  <img src="fahrradwach.png" style="width: 500px;">
</figure>
Hier haben wir für jede Endwahrscheinlichkeit die Pfadmultiplikationsregel angewendet.

Betrachten wir z.B. das Ereignis $E:$ "Ein Jugendlicher ist in der ersten Stunde müde.", so ist $E=\\{E\overline{W};SA\overline{W};SÖ\overline{W}\\}$, und nach der Pfadadditionsregel folgt nun
\begin{align*}
P(E)&=P(\\{E\overline{W}\\})+P(\\{SA\overline{W}\\})+P(\\{SÖ\overline{W}\\})\\\\
&=0{,}1377+0{,}138+0{,}14\\\\
&=0{,}4157.
\end{align*}


<!--#### Achtung bei Prozentzahlen
Verwenden wir für die Pfadwahrscheinlichkeiten die Prozentschreibweise, so müssen wir darauf achten, die Prozentzahlen korrekt zu multiplizieren. Im Fall eines zweimaligen Münzwurfs ohne Beachtung der Reihenfolge gilt ja bekanntlich auf jedem Pfad $0,5\cdot 0,5=0,25$. Wir erinnern daran, dass aber $50\\%\cdot 50\\% \neq 2500\\%$ ist.-->

### Mehrstufige Zufallsexperimente mit zwei Ereignissen
Häufig liegt eine Situation vor, in der zwei Ereignisse $A$ und $B$ und deren Gegenereignisse auftreten. Das Baumdiagramm hat dann die Gestalt

 <figure>
  <img src="BaumAB.png" style="width: 500px;">
</figure>

Wir beobachten:

* Es gilt $A=\\{AB;A\overline{B}\\}$ und $B=\\{AB;\overline{A}B\\}$.
* Auf der ersten Stufe stehen die Wahrscheinlichkeiten von $A$ und $\overline{A}$: $P(A)=0{,}5$ und $P(\overline{A})=0{,}5$.
* Auf der zweiten Stufe stehen die Wahrscheinlichkeiten von $B$ und $\overline{B}$ **in Abhängigkeit** davon, ob $A$ eingetreten ist oder nicht (diese Wahrscheinlichkeiten sind im Allgemeinen nicht $P(B)$ und $P(\overline{B})$).
* Es gilt $B=\\{AB;\overline{A}B\\}$. Also haben wir $P(B)=0{,}2+0{,}05=0{,}25$.
* Es ist $A\cap B=\\{AB\\}$ etc. Jeder Pfad entspricht also dem entsprechenden "$\cap$-Ereignis". Dann folgt $P(A\cap B)=0{,}2$.
* Es ist $\overline{A}\cup B=\\{AB;\overline{A}B;\overline{A}\overline{B}\\}$ etc. Zu einem "$\cup$-Ereignis" gehören also immer drei Pfade. Dann folgt
\begin{align*}
P(\overline{A}\cup B)&=P(\\{AB\\}) +P(\\{\overline{A}B\\})  +P(\\{\overline{A}\overline{B}\\})\\\\
&=0{,}2+0,05+0{,}45\\\\
&=0{,}7.
\end{align*}

### Baumdiagramme vervollständigen
#### Beispiel 1
Gegeben ist das folgende Baumdiagramm:
 <figure>
  <img src="Baum1.png" style="width: 500px;">
</figure>
Die Wahrscheinlichkeit 4 wird mit $x$ bezeichnet und kann wie folgt berechnet werden $0{,}2\cdot x = 0{,}06$ $\Rightarrow$ $x=0{,}3$.

#### Beispiel 2
Gegeben ist das folgende Baumdiagramm:
 <figure>
  <img src="Baum2.png" style="width: 500px;">
</figure>
Die Wahrscheinlichkeit 2 wird mit $x$ bezeichnet und kann wie folgt berechnet werden $ x = 0{,}28+0{,}12=0{,}4$.

<!--### Urnenmodelle-->