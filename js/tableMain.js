// Globale Variable für DataTable
let table;

// html Inhalt laden, sobald Dokument bereit ist
$(document).ready(function() {
    loadHTML();
    /*$('#Aufgabensammlung').select2({
        placeholder: "Bitte wählen...",
        allowClear: true
    });*/
});

//dynamischer Pfad wegen Github - Liveserver
const basePath = window.location.hostname.includes("github.io")
    ? "/digitalmath"
    : ""; // Kein Pfad bei lokalem Server

// html Inhalt laden
async function loadHTML() {
    try {
        $('#content').html('<p>Lade Daten...</p>');
        const response = await fetch(`${basePath}/liste.html`);
        const html = await response.text();
        $('#content').html(html);
        initializeTable();
        //setupDropdowns();
        addButtons();
    } catch (error) {
        console.error('Fehler beim Laden der HTML-Datei:', error);
        $('#content').html('<p>Fehler beim Laden der Daten.</p>');
    }
}




