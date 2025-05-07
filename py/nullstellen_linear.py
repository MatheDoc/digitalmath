import sympy as sp
import random
import json

x = sp.symbols('x')

def erzeuge_funktion():
    # Erzeuge zufällige Werte für die Nullstelle und die Steigung
    nullstelle = random.randint(-9, 9)
    steigung = random.randint(-9, 9)
    y_achsenabschnitt = -nullstelle * steigung
    # Erzeuge das Polynom
    f = steigung * x + y_achsenabschnitt
    return f, nullstelle

def aufgabe_als_dict(f, nullstelle):
    return {
        "frage": f"Nullstelle von $\\ f(x) = {sp.latex(f)}$",
        "antwort": f"$x = {sp.latex(nullstelle)}$"
    }

# Erzeuge eine Liste von Aufgaben
anzahl = 100
aufgaben = []

for _ in range(anzahl):
    f, nullstelle = erzeuge_funktion()
    aufgaben.append(aufgabe_als_dict(f, nullstelle))

# Speichere als JSON
with open("json_screen/nullstellen_linear.json", "w", encoding="utf-8") as f:
    json.dump(aufgaben, f, ensure_ascii=False, indent=2)