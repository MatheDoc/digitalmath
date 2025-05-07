import sympy as sp
import random
import json

x = sp.symbols('x')

def erzeuge_funktion(min_grad=1, max_grad=9, min_k=-9, max_k=9):
    grad = random.randint(min_grad, max_grad)

    # Erstelle eine Liste mit allen Koeffizienten auf 0
    koeffizienten = [0] * (grad + 1)

    # Wähle 1 oder 2 zufällige Indizes aus, an denen die Koeffizienten ungleich 0 sein sollen
    num_non_zero = random.randint(1, 2)  # Wähle, ob 1 oder 2 Koeffizienten ungleich 0 sein sollen
    indices = random.sample(range(grad + 1), num_non_zero)  # Zufällige Indizes auswählen

    # Setze an diesen Indizes zufällige Werte für die Koeffizienten
    for index in indices:
        koeffizienten[index] = random.randint(min_k, max_k)

    # Erzeuge das Polynom
    f = sum(c * x**e for c, e in zip(koeffizienten, range(grad, -1, -1)))

    # Berechne die Ableitung des Polynoms
    df = sp.diff(f, x)
    return f, df

def aufgabe_als_dict(f, df):
    return {
        "frage": f"Ableitung von $\\ f(x) = {sp.latex(f)}$",
        "antwort": f"$f'(x) = {sp.latex(df)}$"
    }

# Erzeuge eine Liste von Aufgaben
anzahl = 100
aufgaben = []

for _ in range(anzahl):
    f, df = erzeuge_funktion()
    aufgaben.append(aufgabe_als_dict(f, df))

# Speichere als JSON
with open("json_screen/ableitungen.json", "w", encoding="utf-8") as f:
    json.dump(aufgaben, f, ensure_ascii=False, indent=2)
