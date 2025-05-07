import sympy as sp
import random
import json

x = sp.symbols('x')

def erzeuge_funktion(min_grad=2, max_grad=4, min_k=-3, max_k=3):
    grad = random.randint(min_grad, max_grad)
    koeffizienten = [random.randint(min_k, max_k) for _ in range(grad + 1)]

    # Wenn alle Koeffizienten 0 wären, erneut generieren
    while all(c == 0 for c in koeffizienten):
        koeffizienten = [random.randint(min_k, max_k) for _ in range(grad + 1)]

    f = sum(c * x**e for c, e in zip(koeffizienten, range(grad, -1, -1)))
    df = sp.diff(f, x)
    return f, df

def aufgabe_als_dict(f, df):
    return {
        "frage": f"Ableitung von $f(x) = {sp.latex(f)}$ ?",
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
