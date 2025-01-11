import numpy as np

def generate_stochastic_matrix_with_simple_decimals(fix_vector):
    """
    Generiert eine stochastische 3x3-Matrix mit einem gegebenen Fixvektor und Einträgen mit einer Nachkommastelle.
    :param fix_vector: Wahrscheinlichkeitsvektor (1D-Array), der Fixvektor der Matrix sein soll
    :return: Stochastische Matrix (3x3), die den Fixvektor erfüllt, mit Einträgen, die eine Nachkommastelle haben
    """
    # Fixvektor in Spaltenform und auf eine Nachkommastelle runden
    v = np.round(np.array(fix_vector).reshape(-1, 1), 1)

    # Initialisiere eine leere Matrix
    A = np.zeros((3, 3))

    for j in range(3):  # Für jede Spalte
        # Generiere zufällige Gewichte und runde auf eine Nachkommastelle
        random_weights = np.random.rand(3)
        random_weights /= random_weights.sum()  # Normiere, damit Summe 1 ergibt
        random_weights = np.round(random_weights, 1)

        # Eventuelle Korrektur der Rundungsfehler
        diff = 1 - random_weights.sum()
        if abs(diff) > 0.05:  # Vermeide größere Abweichungen
            random_weights[np.argmax(random_weights)] += diff

        # Skaliere die Gewichte mit dem Fixvektor und runde erneut
        A[:, j] = np.round(random_weights * v[:, 0] / v.sum(), 1)

    # Stelle sicher, dass jede Spalte sich exakt zu 1 summiert
    for j in range(3):
        diff = 1 - A[:, j].sum()
        if abs(diff) > 0.05:
            A[np.argmax(A[:, j]), j] += diff

    # Rückgabe der gerundeten Matrix
    return A

# Beispiel für einen Fixvektor mit einer Nachkommastelle
fix_vector = [0.4, 0.4, 0.2]

# Generiere die Matrix
stochastic_matrix = generate_stochastic_matrix_with_simple_decimals(fix_vector)

# Ausgabe
print("Fixvektor (gerundet):")
print(np.round(fix_vector, 1))
print("\nStochastische Matrix (gerundet):")
print(stochastic_matrix)

# Prüfen, ob A * v = v
v = np.array(fix_vector)
result = np.dot(stochastic_matrix, v)
print("\nÜberprüfung (A * v):")
print(np.round(result, 1))
