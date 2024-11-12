// Globale Variable für DataTable
let table;

// html Inhalt laden, sobald Dokument bereit ist
$(document).ready(function() {
    loadHTML();
});

// html Inhalt laden
async function loadHTML() {
    try {
        $('#content').html('<p>Lade Daten...</p>');
        const response = await fetch('../liste.html');
        const html = await response.text();
        $('#content').html(html);
        initializeTable();
        adjustSearchFilter();
        // setupDropdowns();
        addButtons();
        checkConfigParameter();
    } catch (error) {
        console.error('Fehler beim Laden der HTML-Datei:', error);
        $('#content').html('<p>Fehler beim Laden der Daten.</p>');
    }
}




