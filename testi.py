import numpy as np

# Eingabe: Matrix A und Potenz n
A = np.array([[0, 0,1], [ 0,1,0],[1,0,0]])  # Beispielmatrix
B = np.array([[ 0,0,1], [ 0.3,0.2,0],[0.7,0.8,0]])  # Beispielmatrix
P = np.array([[ 0.2,0.3,0.4], [ 0.1,0.2,0.3],[0.7,0.5,0.3]])  # Beispielmatrix

n = 5  # Potenz (z. B. A^3)

# Potenzberechnung
try:
    A_power = np.linalg.matrix_power(A, n)
    print(f"Matrix A hoch {n}:")
    print(A_power)
except ValueError as e:
    print("Fehler bei der Berechnung:", e)


