//DataTable intitialisieren
function initializeTable() {
    table = $('#meineTabelle').DataTable({
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Alle"]],
        "language": {
            "lengthMenu": "Zeige _MENU_ Einträge",
            "info": "Zeige Eintrag _START_ bis _END_ von _TOTAL_ Einträgen",
            "paginate": {"previous": "Zurück", "next": "Weiter"}
        },
        "ordering": false,
        "columnDefs": [
            {
                "targets": 0,
                "orderable": false,
                "className": "dt-body-center dt-head-center",
                "render": function(data, type, row) {
                    return '<input type="checkbox" class="rowCheckbox" />';
                    }
                },
            {"targets": 6, "searchable": false} // Testnamen bei Suche ignorieren
        ]
    });

    // Funktion zum Ausblenden von Zeilen ohne aktivierte Checkbox
    function hideUncheckedRows(table) {
        table.rows().every(function() {
            const row = $(this.node());
            const checkbox = row.find('input.rowCheckbox'); // Suche die Checkbox in der Zeile
            if (!checkbox.is(':checked')) {
                row.hide(); // Verstecke die Zeile
            } else {
                row.show(); // Zeige die Zeile
            }
        });
        table.draw(); // Tabelle neu rendern
    }
    


    $('#hideUnchecked').on('click', function() {
        hideUncheckedRows(table);
    });
    

    // Funktion zum Zeigen aller Zeilen
    $('#showAll').on('click', function() {
        table.rows().every(function() {
            var row = $(this.node());
            var checkbox = row.find('input.rowCheckbox');     
            row.show(); // Zeige die Zeile
        });
        table.draw(); // Zeichne die Tabelle neu
    });

    // Teilen-Link generieren
    $('#shareLink').on('click', function() {
        const selectedCheckboxes = []; // Array zur Speicherung der ausgewählten Checkboxen
        // Durchlaufen der ausgewählten Checkboxen
        table.$('.rowCheckbox:checked').each(function() {
            const checkboxIndex = table.row($(this).closest('tr')).index(); // Gibt den Index der Zeile zurück

            const rowId = row.find('td:eq(8)').text().trim(); //new

            selectedCheckboxes.push(rowId);
        });
        // Die Werte der ausgewählten Checkboxen in einen JSON-String umwandeln
        const json = JSON.stringify(selectedCheckboxes);
        const encodedJson = encodeURIComponent(json); // JSON-String URL-kodieren
        const shareableLink = `https://www.mathechecks.de/index?config=${encodedJson}`; // Teilen-Link erstellen
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
                hideUncheckedRows(table);// Auswahl anzeigen
            });
            } catch (e) {
                console.error('Ungültige Konfigurationsdaten');
            }
        }
    }
    checkConfigParameter();

    // Funktion zum Anpassen der Suchleiste
    function adjustSearchFilter() {
        // Verschiebt das Filter-Div in den gewünschten Container
        $('#meineTabelle_filter').appendTo('#suchleiste');

        // Entfernt den Text "Search:" und behält nur das Eingabefeld
        $('#meineTabelle_filter label').contents().filter(function() {
            return this.nodeType === 3; // Filtert den reinen Text (Textknoten)
        }).remove();

        // Setzt den Platzhaltertext des Suchfeldes
        $('.dataTables_filter input').attr('placeholder', 'Suchbegriff eingeben');
    }
    adjustSearchFilter() ;
}



