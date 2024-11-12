# Untersuchen der Rangkriterien für die verschiedenen Matrizen aus dem Bild
import numpy as np

# Definition der verschiedenen Matrizen (Koeffizientenmatrix A und erweiterte Matrix A|b)
matrizen = {
    "Matrix 1": ([[2, 3, -1], [0, 2, 0], [0, 0, 3]], [7, 4, 0]),
    "Matrix 2": ([[2, 3], [0, 0]], [5, 0]),
    "Matrix 3": ([[2, 4, 3, 9], [0, 5, 6, 8], [0, 0, 4, 7], [0, 0, 0, 0]], [3, 4, 1, 2]),
    "Matrix 4": ([[1, 4, 3], [0, 4, 2]], [5, 2]),
    "Matrix 5": ([[3, 4, 1], [0, 2, 6], [0, 0, 0]], [2, 6, 0]),
    "Matrix 6": ([[4, 7, 3, 6], [0, 1, 4, 5], [0, 0, 2, 3]], [2, 6, 5]),
    "Matrix 7": ([[1, 8, 3], [0, 2, 6], [0, 0, 2], [0, 0, 0]], [2, 3, -5, 3]),
    "Matrix 8": ([[5, 6], [0, 0]], [-3, -4]),
    "Matrix 9": ([[1, 10, 1], [0, 5, 2], [0, 0, 0]], [9, 11, 0]),
    "Matrix 10": ([[4, 1, 3, 4], [0, 1, 6, 2], [0, 0, 2, 3], [0, 0, 0, 1]], [2, 6, 4, 2])
}

# Ergebnisliste
results = []

# Analyse der Matrizen
for name, (A_list, b_list) in matrizen.items():
    A = np.array(A_list)
    b = np.array(b_list)
    rang_A = np.linalg.matrix_rank(A)
    rang_A_erweitert = np.linalg.matrix_rank(np.column_stack((A, b)))
    anzahl_unbekannte = A.shape[1]

    # Lösbarkeit
    if rang_A == rang_A_erweitert:
        if rang_A == anzahl_unbekannte:
            solution_type = "Eindeutige Lösung"
        else:
            solution_type = "Unendlich viele Lösungen"
    else:
        solution_type = "Keine Lösung"
    
    # Ergebnisse speichern
    results.append((name, rang_A, rang_A_erweitert, solution_type))

print(results)
