//DataTable intitialisieren
function initializeTable() {
  table = $("#meineTabelle").DataTable({
    pageLength: -1,
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, "Alle"],
    ],
    language: {
      lengthMenu: "Zeige _MENU_ Einträge",
      info: "Zeige Eintrag _START_ bis _END_ von _TOTAL_ Einträgen",
      paginate: { previous: "Zurück", next: "Weiter" },
    },
    ordering: false,
    columnDefs: [
      {
        targets: 0,
        orderable: false,
        className: "dt-body-center dt-head-center",
        render: function (data, type, row) {
          return '<input type="checkbox" class="rowCheckbox" />';
        },
      },
      { targets: 6, searchable: false }, // Testnamen bei Suche ignorieren
    ],
  });

  // Sammlungen hinzufügen
  SammlungenHinzufügen();

  /*  // Funktion zum Ausblenden von Zeilen ohne aktivierte Checkbox
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
    
        // Funktion zum Zeigen aller Zeilen
    $('#showAll').on('click', function() {
        table.rows().every(function() {
            var row = $(this.node());
            var checkbox = row.find('input.rowCheckbox');     
            row.show(); // Zeige die Zeile
        });
        table.draw(); // Zeichne die Tabelle neu
    });

    $('#hideUnchecked').on('click', function() {
        hideUncheckedRows(table);
    });*/

  ///////////////////////////

  // Funktion zum Umschalten der Ansicht

  let isFiltered = false; // Status für den Filter-Button speichern

  function toggleView(table) {
    const icon = $("#toggleFilter"); // Das gesamte Button-Element
    if (isFiltered) {
      // Alle Zeilen wieder anzeigen
      table.rows().every(function () {
        $(this.node()).show();
      });
      // Symbol wechseln und Button zurücksetzen
      icon
        .removeClass("fa-filexeter")
        .addClass("fa-filter")
        .attr("title", "Auswahl anzeigen");
    } else {
      // Nur Zeilen mit aktivierten Checkboxen anzeigen
      table.rows().every(function () {
        const row = $(this.node());
        const checkbox = row.find("input.rowCheckbox");
        row.toggle(checkbox.is(":checked")); // Zeige nur markierte
      });
      // Symbol wechseln und Button für aktiven Zustand
      icon
        .removeClass("fa-filter")
        .addClass("fa-eye")
        .attr("title", "Alle anzeigen");
    }

    table.draw(); // Tabelle aktualisieren
    isFiltered = !isFiltered; // Status umschalten
  }

  // Click-Handler für den Toggle-Button
  $("#toggleFilter").on("click", function () {
    toggleView(table); // Nur die Tabelle an die Funktion übergeben
  });

  // Teilen-Link generieren
  $("#shareLink").on("click", function () {
    const selectedCheckboxes = []; // Array zur Speicherung der ausgewählten Checkboxen
    // Durchlaufen der ausgewählten Checkboxen
    table.$(".rowCheckbox:checked").each(function () {
      const row = $(this).closest("tr");
      const rowId = row.find("td:eq(8)").text().trim();
      selectedCheckboxes.push(rowId);
    });
    // Die Werte der ausgewählten Checkboxen in einen JSON-String umwandeln
    const json = JSON.stringify(selectedCheckboxes);
    const encodedJson = encodeURIComponent(json); // JSON-String URL-kodieren
    const shareableLink = `https://www.mathechecks.de/kompetenzliste.html?config=${encodedJson}`; // Teilen-Link erstellen
    // Link in die Zwischenablage kopieren
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        alert(
          "Link der Auswahl wurde in die Zwischenablage kopiert: " +
            shareableLink
        );
      })
      .catch((err) => {
        console.error("Fehler beim Kopieren in die Zwischenablage: ", err);
      });
  });

  // Funktion zum Starten eines Tests mit ausgewählten Checkboxes
  $("#startExam").on("click", function () {
    var urls = [];
    // Durch alle Zeilen der DataTable iterieren
    $("#meineTabelle")
      .DataTable()
      .rows()
      .every(function () {
        var row = $(this.node());
        var checkbox = row.find("input.rowCheckbox");

        // Prüfen, ob die Checkbox aktiviert ist
        if (checkbox.is(":checked")) {
          var rowData = this.data(); // Zeilendaten abrufen
          if (rowData[6]) {
            // Prüfen, ob in der 7. Spalte eine URL vorhanden ist
            urls = urls.concat(
              rowData[6].split(",").map((url) => url.trim() + ".json")
            );
          }
        }
      });
    if (urls.length > 0) {
      var testUrl =
        "quiz.html?" + urls.map((url) => "sammlung=" + url).join("&");

      window.open(testUrl, "_self");
    } else {
      alert("Bitte wählen Sie mindestens eine Checkbox aus.");
    }
  });

  // Funktion zum Auswählen/Auswählen aller Checkboxen
  $("#checkAll").on("click", function () {
    var rows = table.rows({ search: "applied" }).nodes(); // Holt alle sichtbaren Zeilen
    $("input.rowCheckbox", rows).prop("checked", this.checked); // Setzt den Status der Checkboxen
  });

  // Überprüfen, ob ein "config"-Parameter in der URL vorhanden ist
  function checkConfigParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const configJson = urlParams.get("config");
    if (configJson) {
      try {
        const importedData = JSON.parse(decodeURIComponent(configJson));
        // Überprüfen, ob die Checkboxen in der Tabelle gesetzt werden müssen
        table.rows().every(function () {
          const checkbox = $(this.node()).find("td:first-child .rowCheckbox"); // Die Checkbox in der ersten Spalte finden
          const rowId = $(this.node()).find("td:eq(8)").text().trim(); // Zeilen-ID ermitteln
          const isSelected = importedData.includes(rowId); // Überprüfen, ob die ID in den importierten Daten enthalten ist
          checkbox.prop("checked", isSelected); // Checkbox entsprechend setzen
        });
        // Wende den Filter an, nachdem die Checkboxen gesetzt sind
        toggleView(table);
      } catch (e) {
        console.error("Ungültige Konfigurationsdaten");
      }
    }
  }
  checkConfigParameter();

  //Überprüfen, ob listonly=true
  const urlParams = new URLSearchParams(window.location.search);
  const listonly = urlParams.get("listonly");
  if (listonly) {
    document.querySelector("h1").style.display = "none";
    document.querySelector("h2").style.display = "none";
    document.querySelector("h3").style.display = "none";
    // Erste Spalte der Tabelle ausblenden
    $("#meineTabelle tr").each(function () {
      $(this).find("td:first, th:first").css("display", "none"); // Die erste Spalte ausblenden
    });
    // Symbole für Filter und Suchleiste ausblenden
  }

  // Funktion zum Anpassen der Suchleiste
  function adjustSearchFilter() {
    // Verschiebt das Filter-Div in den gewünschten Container
    $("#meineTabelle_filter").appendTo("#suchleiste");

    // Entfernt den Text "Search:" und behält nur das Eingabefeld
    $("#meineTabelle_filter label")
      .contents()
      .filter(function () {
        return this.nodeType === 3; // Filtert den reinen Text (Textknoten)
      })
      .remove();

    // Setzt den Platzhaltertext des Suchfeldes
    $(".dataTables_filter input")
      .attr("placeholder", "Schlagwortsuche")
      .css("font-size", "inherit")
      .css("max-width", "250px");
  }
  adjustSearchFilter();

  // Falls der Benutzer den Filter manuell über ein Eingabefeld ändert
  $("#meineTabelle_filter input").on("input change", function () {
    checkHiddenChecked(); // Überprüfe versteckte Checkboxen
  });
}

// Funktion zum Starten eines Tests mit ausgewählten Checkboxes
function startExam() {
  var urls = [];
  // Durch alle Zeilen der DataTable iterieren
  $("#meineTabelle")
    .DataTable()
    .rows()
    .every(function () {
      var row = $(this.node());
      var checkbox = row.find("input.rowCheckbox");

      // Prüfen, ob die Checkbox aktiviert ist
      if (checkbox.is(":checked")) {
        var rowData = this.data(); // Zeilendaten abrufen
        if (rowData[6]) {
          // Prüfen, ob in der 7. Spalte eine URL vorhanden ist
          urls = urls.concat(
            rowData[6].split(",").map((url) => url.trim() + ".json")
          );
        }
      }
    });
  if (urls.length > 0) {
    var testUrl = "quiz.html?" + urls.map((url) => "sammlung=" + url).join("&");

    window.open(testUrl, "_blank");
  } else {
    alert("Bitte wählen Sie mindestens eine Checkbox aus.");
  }
}

// Aufgaben ein und ausblenden
function toggleAufgaben() {
  var div = document.getElementById("Aufgabensammlung");
  div.style.display =
    div.style.display === "none" || div.style.display === "" ? "flex" : "none";
  /*var icon = document.getElementById("toggle-icon");
    icon.textContent = div.style.display === "flex"? "▲" : "▼";*/

  var icon = document.getElementById("sammlungAnzeigen");
  if (icon.classList.contains("fa-folder")) {
    // Geschlossenen Ordner in offenen Ordner ändern
    icon.classList.remove("fa-folder");
    icon.classList.add("fa-folder-open");
    icon.setAttribute("title", "Sammlungen ausblenden");
  } else {
    // Offenen Ordner wieder schließen
    icon.classList.remove("fa-folder-open");
    icon.classList.add("fa-folder");
    icon.setAttribute("title", "Sammlungen anzeigen");
  }
}

// Suchleiste ein und ausblenden
function zeigeSuchleiste() {
  var div = document.getElementById("suchleiste");
  div.style.display =
    div.style.display === "none" || div.style.display === "" ? "flex" : "none";

  var icon = document.getElementById("suchleisteAnzeigen");
  if (icon.classList.contains("fa-search-plus")) {
    // plus in minus
    icon.classList.remove("fa-search-plus");
    icon.classList.add("fa-search-minus");
    icon.setAttribute("title", "Suchleiste ausblenden");
  } else {
    // Offenen Ordner wieder schließen
    icon.classList.remove("fa-search-minus");
    icon.classList.add("fa-search-plus");
    icon.setAttribute("title", "Suchleiste anzeigen");
  }
}

// Prüft, ob durch Filter ausgeblendete Elemente markiert sind
function checkHiddenChecked() {
  var hiddenChecked = 0; // Zähler für unsichtbare, markierte Checkboxen

  // Iteriere durch alle Zeilen der Tabelle
  table.rows().every(function () {
    var row = $(this.node()); // Hole die Zeile
    var checkbox = row.find(".rowCheckbox"); // Die Checkbox in der Zeile

    // Überprüfe, ob die Checkbox markiert ist und die Zeile unsichtbar ist
    // jQuery :hidden prüft, ob das Element nicht sichtbar ist (also auch durch Filter ausgeblendet)
    if (checkbox.is(":checked") && row.is(":hidden")) {
      hiddenChecked++;
    }
  });

  // Warnhinweis ein-/ausblenden
  if (hiddenChecked > 0) {
    $("#warningMessage").show();
  } else {
    $("#warningMessage").hide();
  }
}

/*
$('#meineTabelle tbody').on('click', 'tr', function(event) {
    // Prüfen, ob das geklickte Element ein Button, Link oder interaktives Element ist
    if ($(event.target).closest('button, a, input, select, textarea').length) {
        return; // Falls ja, nicht die Checkbox umschalten
    }

    // Checkbox innerhalb der Zeile finden
    var checkbox = $(this).find('input.rowCheckbox'); 

    if (checkbox.length) {
        checkbox.prop('checked', !checkbox.prop('checked')); // Checkbox-Status umschalten
    }
});
*/
