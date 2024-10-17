import os
import pdfkit

# Pfad zu wkhtmltopdf. Passen Sie diesen Pfad an Ihre Installation an.
path_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

def convert_html_to_pdf(input_folder, output_folder):
    # Sicherstellen, dass der Ausgabeordner existiert
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Durchsuchen des Eingabeordners nach HTML-Dateien
    for filename in os.listdir(input_folder):
        if filename.endswith(".html"):
            html_file = os.path.join(input_folder, filename)
            pdf_file = os.path.join(output_folder, filename.replace(".html", ".pdf"))
            try:
                pdfkit.from_file(html_file, pdf_file,configuration=config)
                print(f"{html_file} wurde erfolgreich nach {pdf_file} konvertiert.")
            except Exception as e:
                print(f"Fehler bei der Konvertierung von {html_file}: {e}")

# Beispielverwendung
input_folder = os.getcwd()
output_folder = os.getcwd()

convert_html_to_pdf(input_folder, output_folder)
