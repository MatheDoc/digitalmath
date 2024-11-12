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
}

// Funktion zum Ausblenden von Zeilen ohne aktivierte Checkbox
  $('#hideUnchecked').on('click', function() {
    table.rows().every(function() {
        var row = $(this.node());
        var checkbox = row.find('input.rowCheckbox');
        if (!checkbox.is(':checked')) {
            row.hide(); // Verstecke die Zeile
        } else {
            row.show(); // Zeige die Zeile
        }
    });
    table.draw(); // Zeichne die Tabelle neu
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

// data-tables Search button
$('#meineTabelle_filter').appendTo('#suchleiste');

// Entfernt den Text "Search:" von der neu platzierten Suchleiste und behält nur das Eingabefeld
$('#meineTabelle_filter label').contents().filter(function() {
    return this.nodeType === 3; // Filtert den reinen Text (Textknoten)
}).remove();
$('.dataTables_filter input').attr('placeholder', 'Suchbegriff eingeben');