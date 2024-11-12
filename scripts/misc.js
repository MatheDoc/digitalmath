// Teilen-Link generieren
$('#shareLink').on('click', function() {
    const selectedCheckboxes = []; // Array zur Speicherung der ausgewählten Checkboxen

    // Durchlaufen der ausgewählten Checkboxen
    table.$('.rowCheckbox:checked').each(function() {
        const checkboxIndex = table.row($(this).closest('tr')).index(); // Gibt den Index der Zeile zurück
        selectedCheckboxes.push(checkboxIndex);
    });

    // Die Werte der ausgewählten Checkboxen in einen JSON-String umwandeln
    const json = JSON.stringify(selectedCheckboxes);
    const encodedJson = encodeURIComponent(json); // JSON-String URL-kodieren
    const shareableLink = `${window.location.href}?config=${encodedJson}`; // Teilen-Link erstellen

    // Link in die Zwischenablage kopieren
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert('Link der Auswahl wurde in die Zwischenablage kopiert: ' + shareableLink);
    }).catch(err => {
        console.error('Fehler beim Kopieren in die Zwischenablage: ', err);
    });
});

 // Funktion zum Auswählen/Auswählen aller Checkboxen
 $('#checkAll').on('click', function() {
    var rows = table.rows({ 'search': 'applied' }).nodes(); // Holt alle sichtbaren Zeilen
    $('input.rowCheckbox', rows).prop('checked', this.checked); // Setzt den Status der Checkboxen
});

// Überprüfen, ob ein "config"-Parameter in der URL vorhanden ist
function checkConfigParameter(){
    const urlParams = new URLSearchParams(window.location.search);
    const configJson = urlParams.get('config');
    if (configJson) {
        try {
            const importedData = JSON.parse(decodeURIComponent(configJson));
                // Überprüfen, ob die Checkboxen in der Tabelle gesetzt werden müssen
                table.rows().every(function(index) { // index hier als Parameter
            const checkbox = $(this.node()).find('td:first-child .rowCheckbox'); // Die Checkbox in der ersten Spalte finden
            const isSelected = importedData.includes(index); // Überprüfen, ob der Zeilenindex in den importierten Daten vorhanden ist
            checkbox.prop('checked', isSelected); // Checkbox entsprechend setzen
        });
        } catch (e) {
            console.error('Ungültige Konfigurationsdaten');
        }
    }
}

