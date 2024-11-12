 // Dropdowns erstellen
 const gebietDropdown = $('<select id="gebietFilter" multiple="multiple" style="width: 100%;"></select>');
 const teilgebietDropdown = $('<select id="teilgebietFilter" multiple="multiple" style="width: 100%;"></select>');
 const schwerpunktDropdown= $('<select id="schwerpunktFilter" multiple="multiple" style="width: 100%;"></select>');
 const situationDropdown = $('<select id="situationFilter" multiple="multiple" style="width: 100%;"></select>');
 
 // Anhängen der Dropdowns an die Kopfzeile
 $('#dropdowns tbody tr:nth-child(1) td:nth-child(2)').append(gebietDropdown); 
 $('#dropdowns tbody tr:nth-child(2) td:nth-child(2)').append(teilgebietDropdown); 
 $('#dropdowns tbody tr:nth-child(3) td:nth-child(2)').append(schwerpunktDropdown); 
 $('#dropdowns tbody tr:nth-child(4) td:nth-child(2)').append(situationDropdown); 

 // Initialisiere Select2 auf den Dropdown-Menüs
 $('#gebietFilter, #teilgebietFilter, #schwerpunktFilter, #situationFilter').select2({
     placeholder: "Wähle aus...",
     allowClear: true
 });

 // Fülle Dropdowns nach dem Laden des Inhalts
 fillDropdown(1, '#gebietFilter', table);
 fillDropdown(2, '#teilgebietFilter', table);
 fillDropdown(3, '#schwerpunktFilter', table);
 fillDropdown(4, '#situationFilter', table);

 // Event-Listener für Dropdowns
 $('#gebietFilter, #teilgebietFilter, #schwerpunktFilter, #situationFilter').on('change', function() {
     filterTable(table);
 });

// Funktion, um Dropdowns basierend auf den Tabellendaten zu füllen
function fillDropdown(columnIndex, dropdownSelector, table) {
    const uniqueValues = [];
    table.column(columnIndex).data().each(function(value) {
        if (uniqueValues.indexOf(value) === -1) {
            uniqueValues.push(value);
        }
    });
    uniqueValues.forEach(function(value) {
        $(dropdownSelector).append($('<option>', {
            value: value,
            text: value
        }));
    });
}

// Funktion zum Filtern der Tabelle basierend auf den Dropdown-Auswahlen
function filterTable(table) {
    const gebietValue = $('#gebietFilter').val();
    const teilgebietValue = $('#teilgebietFilter').val();
    const schwerpunktValue = $('#schwerpunktFilter').val();
    const situationValue = $('#situationFilter').val();
    table.column(1).search(gebietValue ? gebietValue.join('|') : '', true, false);
    table.column(2).search(teilgebietValue ? teilgebietValue.join('|') : '', true, false);
    table.column(3).search(schwerpunktValue ? schwerpunktValue.join('|') : '', true, false);
    table.column(4).search(situationValue ? situationValue.join('|') : '', true, false);
    table.draw();
}