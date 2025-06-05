import pandas as pd

# Pfad zur Excel-Datei
excel_datei = 'liste.xlsx'

# Excel-Datei laden (erste Tabelle)
df = pd.read_excel(excel_datei)


# In HTML umwandeln
html_tabelle = df.to_html(index=False)

# HTML in eine Datei schreiben mit UTF-8-Codierung
with open('liste.html', 'w', encoding='utf-8') as file:
    file.write(html_tabelle)


### modifizieren

# Text1, der ersetzt werden soll
alter_text = '<table border="1" class="dataframe">'
neuer_text = '<table id="meineTabelle" class="display">'
# Text2, der ersetzt werden soll
alter_text2 = '<th>' + df.columns[0] + '</th>'  # Alte Überschrift der ersten Spalte
neuer_text2 = '<th><input type="checkbox" id="checkAll" style="cursor: pointer;"/></th>'  # Neue Überschrift mit Checkbox
# Text3, der ersetzt werden soll
alter_text3 = 'NaN'
neuer_text3 = ''

html_datei='liste.html'

# HTML-Datei einlesen
with open(html_datei, 'r', encoding='utf-8') as file:
    html_inhalt = file.read()

# Text ersetzen
html_inhalt = html_inhalt.replace(alter_text, neuer_text)
html_inhalt = html_inhalt.replace(alter_text2, neuer_text2)
html_inhalt = html_inhalt.replace(alter_text3, neuer_text3)

# Änderungen speichern
with open(html_datei, 'w', encoding='utf-8') as file:
    file.write(html_inhalt)

print("Die Excel-Tabelle wurde erfolgreich in HTML umgewandelt!")


import pandas as pd
import json

# Pfad zur Excel-Datei
excel_datei = 'liste.xlsx'

# Excel-Datei laden (erste Tabelle)
df = pd.read_excel(excel_datei)

# Optional: NaN-Werte durch leere Strings ersetzen
df = df.fillna('')

# In JSON umwandeln
json_struktur = df.to_dict(orient='records')  # Liste von Dictionaries

# JSON-Datei schreiben mit UTF-8-Codierung
with open('liste.json', 'w', encoding='utf-8') as file:
    json.dump(json_struktur, file, ensure_ascii=False, indent=2)

print("Die Excel-Tabelle wurde erfolgreich in JSON umgewandelt!")
