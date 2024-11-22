// Fügt Buttons hinzu
function addButtons(){
    table.rows().every(function(rowIdx) {
        var data = this.data();
        var ichKannText = data[5];
        var aufgaben = data[6];
        var infoButton ='<i class="fas fa-info-circle info-icon" id="infoIcon" title="Info anzeigen"></i>';
        var copyButton =  '<i class="fas fa-copy copy-icon" id="copyIcon" title="Prompt kopieren"></i>';
        var testButton =  '<i class="fas fa-edit test-icon" id="testIcon" title="Test starten"></i>';
        // Testbutoon ausblenden, falls kein Test vorhanden
        if (aufgaben === '') {
            testButton = ' '
        }
        // Infobutoon ausblenden, falls keine Info vorhanden
        if (data[7] === ''){
            infoButton = ' '
        }
        table.cell(rowIdx, 5).data(ichKannText + ' ' + infoButton + ' ' + copyButton + ' ' + testButton);
    });

    // Event-Listener für die Info-Buttons
    $('#meineTabelle').on('click', '.info-icon', function(event) {
    event.stopPropagation(); // Verhindert, dass das Overlay direkt den Klick abfängt
    var row = $(this).closest('tr'); // Zeile ermitteln
    var rowData = $('#meineTabelle').DataTable().row(row).data(); // Zeilendaten ermitteln
    var info = rowData[7]; // Infos in der 8. Spalte
    // Infotext aktualisieren
    $('#infoText').html(info);
    // Überprüfe die Fensterbreite, um die Position zu bestimmen
    if ($(window).width() > 768) { // Für Desktop
        // Positioniere den Infotext relativ zum Icon
        var iconOffset = $(this).offset(); // Position des Icons
        $('#infoText').css({
            top: iconOffset.top + $(this).height() + 5, // 5px Abstand unter dem Icon
            left: iconOffset.left
        }).fadeIn(); // Zeige den Infotext an
    } else { // Für mobile Geräte
        // Info-Box zentrieren
        $('#infoText').css({
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)', // Zentrierung
            position: 'fixed' // Sicherstellen, dass sie fest bleibt
        }).fadeIn(); // Zeige den Infotext an
    }
    $('#overlay').fadeIn();   // Zeige das Overlay an
    });
    // Ausblenden des Infotextes beim Klicken irgendwo anders auf die Seite
    $(document).on('click', function() {
        $('#infoText').fadeOut(); // Verstecke den Infotext
        $('#overlay').fadeOut();  // Verstecke das Overlay
    });
    // Verhindern, dass der Infotext ausgeblendet wird, wenn man darauf klickt
    $('#infoText').on('click', function(event) {
        event.stopPropagation(); // Verhindert das Ausblenden beim Klick auf den Infotext
    });    
   
   // Event-Listener für die Test-Buttons
    $('#meineTabelle').on('click', '.test-icon', function() {
        var row = $(this).closest('tr'); // Zeile ermitteln
        var rowData = $('#meineTabelle').DataTable().row(row).data(); // Zeilendaten ermitteln
        var urls = rowData[6]; // URLs in der 7. Spalte
        var ichKannText = 'Ich kann ' + rowData[5].split('<i')[0].trim(); //Ich kann text alt Titel    
        if (urls) {
            // Teile die URLs und erstelle Links
            var links = urls.split(',').map(function(url) {
                var sammlungsname = url.trim() + '.json';
                return 'sammlung=' + sammlungsname;
            });
            var testUrl = 'https://mathedoc.github.io/digitalmath/quiz.html?' + links.join('&') + '&titel=' + encodeURIComponent(ichKannText);
            window.open(testUrl, '_blank',`width=440px,height=960px}`); // Öffne URL in einem neuen Tab/Fenster
        }
    });   
    
    // Event-Listener für die Copy-Buttons
    $('#meineTabelle').on('click', '.copy-icon', function() {
        var row = $(this).closest('tr');
        var text1 =  table.cell(row, 5).data().split('<i')[0].trim();
        var text2 = table.cell(row, 7).data();
        var textToCopy = 'Ich kann ' + text1;
        if(text2){
            textToCopy += ' (' + text2 + ')'
        }
        // Kopieren in die Zwischenablage
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Meldung
        });
    });
}

