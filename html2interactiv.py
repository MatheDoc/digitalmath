# Da der vorherige Code nicht ausgeführt werden konnte, wiederhole ich die Berechnung mit einem korrekten Ansatz.
from scipy.stats import binom
# Definierte Parameter
n = 136  # Anzahl der Beamerlampen
k = 64  # maximale Anzahl der Lampen mit einer Lebensdauer unter 4000 Stunden
ziel_wahrscheinlichkeit = 0.24  # Zielwahrscheinlichkeit

# Suche nach dem maximalen p, sodass P(X <= 64) >= 0.24
p_max = 0  # Maximaler Anteil, der noch die Bedingung erfüllt
p_schritt = 0.01  # Schrittgröße für die Suche

# Schleife: Teste p-Werte und prüfe die kumulierte Binomialwahrscheinlichkeit
p_aktuell = 0
while p_aktuell <= 1:
    if binom.cdf(k, n, p_aktuell) >= ziel_wahrscheinlichkeit:
        p_max = p_aktuell  # Aktualisiere p_max, wenn Bedingung erfüllt ist
    p_aktuell += p_schritt

print(p_max)  # Der maximale Anteil der Lampen mit Lebensdauer unter 4000 Stunden, der die Bedingung erfüllt


