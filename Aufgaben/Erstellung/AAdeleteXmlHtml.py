import os
import glob

def delete_files(directory):
    # Erstellen Sie die Muster für XML-, HTML- und PDF-Dateien
    xml_pattern = os.path.join(directory, "*.xml")
    html_pattern = os.path.join(directory, "*.html")
    pdf_pattern = os.path.join(directory, "*.pdf")

    # Finden Sie alle XML-Dateien
    xml_files = glob.glob(xml_pattern)
    # Finden Sie alle HTML-Dateien
    html_files = glob.glob(html_pattern)
    # Finden Sie alle PDF-Dateien
    pdf_files = glob.glob(pdf_pattern)
    
    # Kombinieren Sie die Listen von Dateien
    all_files = xml_files + html_files + pdf_files

    # Löschen Sie jede Datei
    for file in all_files:
        try:
            os.remove(file)
            print(f"Gelöscht: {file}")
        except Exception as e:
            print(f"Fehler beim Löschen von {file}: {e}")

# Beispiel: Löschen Sie alle XML-, HTML- und PDF-Dateien im aktuellen Ordner
current_directory = os.getcwd()
delete_files(current_directory)
