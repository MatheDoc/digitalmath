// Fügt Buttons hinzu
function addButtons() {
  table.rows().every(function (rowIdx) {
    var data = this.data();
    var ichKannText = data[5];
    var aufgaben = data[6];
    var infoButton =
      '<i class="fas fa-info-circle icon info-icon" id="infoIcon" title="Info anzeigen"></i>';
    // var copyButton =  '<i class="fas fa-copy copy-icon" id="copyIcon" title="Prompt kopieren"></i>';
    var xmlButton =
      '<i class="fas fa-file-code icon xml-icon" id="xmlIcon" title="als Moodle-XML exportieren"></i>';
    var testButton =
      '<i class="fas fa-edit icon test-icon" id="testIcon" title="Einzeltest starten"></i>';
    // Testbutoon ausblenden, falls kein Test vorhanden
    if (aufgaben === "") {
      testButton = " ";
      xmlButton = " ";
    }
    // Infobutoon ausblenden, falls keine Info vorhanden
    if (data[7] === "") {
      infoButton = " ";
    }
    // xml-button ausblenden wenn listonly
    const urlParams = new URLSearchParams(window.location.search);
    const listonly = urlParams.get("listonly");
    if (listonly) {
      xmlButton = " ";
    }
    // xmlButton ausblenden für: Venn
    if (data[8] === "187" || data[8] === "188") {
      xmlButton = " ";
    }

    table
      .cell(rowIdx, 5)
      .data(
        ichKannText + " " + infoButton + " " + xmlButton + " " + testButton
      );
  });

  // Event-Listener für die Info-Buttons
  $("#meineTabelle").on("click", ".info-icon", function (event) {
    event.stopPropagation(); // Verhindert, dass das Overlay direkt den Klick abfängt
    var row = $(this).closest("tr"); // Zeile ermitteln
    var rowData = $("#meineTabelle").DataTable().row(row).data(); // Zeilendaten ermitteln
    var info = rowData[7]; // Infos in der 8. Spalte
    // Infotext aktualisieren
    $("#infoText").html(info);
    // Überprüfe die Fensterbreite, um die Position zu bestimmen
    if ($(window).width() > 768) {
      // Für Desktop
      // Positioniere den Infotext relativ zum Icon
      var iconOffset = $(this).offset(); // Position des Icons
      $("#infoText")
        .css({
          top: iconOffset.top + $(this).height() + 5, // 5px Abstand unter dem Icon
          left: iconOffset.left,
        })
        .fadeIn(); // Zeige den Infotext an
    } else {
      // Für mobile Geräte
      // Info-Box zentrieren
      $("#infoText")
        .css({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Zentrierung
          position: "fixed", // Sicherstellen, dass sie fest bleibt
        })
        .fadeIn(); // Zeige den Infotext an
    }
    $("#overlay").fadeIn(); // Zeige das Overlay an
  });
  // Ausblenden des Infotextes beim Klicken irgendwo anders auf die Seite
  $(document).on("click", function () {
    $("#infoText").fadeOut(); // Verstecke den Infotext
    $("#overlay").fadeOut(); // Verstecke das Overlay
  });
  // Verhindern, dass der Infotext ausgeblendet wird, wenn man darauf klickt
  $("#infoText").on("click", function (event) {
    event.stopPropagation(); // Verhindert das Ausblenden beim Klick auf den Infotext
  });

  // Event-Listener für die Test-Buttons
  $("#meineTabelle").on("click", ".test-icon", function () {
    var row = $(this).closest("tr"); // Zeile ermitteln
    var rowData = $("#meineTabelle").DataTable().row(row).data(); // Zeilendaten ermitteln
    var urls = rowData[6]; // URLs in der 7. Spalte
    var ichKannText = "Ich kann " + rowData[5].split("<i")[0].trim(); //Ich kann text als Titel
    if (urls) {
      // Teile die URLs und erstelle Links
      var links = urls.split(",").map(function (url) {
        var sammlungsname = url.trim() + ".json";
        return "sammlung=" + sammlungsname;
      });
      // Url mit Params: sammlung, titel, exam = no
      var testUrl = "quiz.html?" + links.join("&");
      window.open(testUrl, "_self"); // Öffne URL in einem neuen Tab/Fenster
    }
  });

  // Event-Listener für die xml-Buttons
  $("#meineTabelle").on("click", ".xml-icon", function () {
    var row = $(this).closest("tr"); // Zeile ermitteln
    var rowData = $("#meineTabelle").DataTable().row(row).data(); // Zeilendaten ermitteln
    if (!rowData || !rowData[6]) {
      alert("XML-Datei konnte nicht gefunden werden.");
      return;
    }
    var xmlName = rowData[6]; // XMLs in der 7. Spalte
    var url = "xml/" + xmlName + ".xml";

    // XMLHttpRequest nutzen, um den Inhalt herunterzuladen
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob"; // Datei als Blob laden
    xhr.onload = function () {
      if (xhr.status === 200) {
        var blob = new Blob([xhr.response], { type: "application/xml" });
        var downloadUrl = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.href = downloadUrl;
        a.download = xmlName + ".xml"; // Dateiname setzen
        document.body.appendChild(a); // Temporär hinzufügen
        a.click(); // Download auslösen
        document.body.removeChild(a); // Entfernen
        window.URL.revokeObjectURL(downloadUrl); // Speicher freigeben
      } else {
        alert("Fehler beim Herunterladen der Datei.");
      }
    };
    xhr.onerror = function () {
      alert("Netzwerkfehler.");
    };
    xhr.send();
  });

  //Zzzzz
  // Event-Listener für die Copy-Buttons
  $("#meineTabelle").on("click", ".copy-icon", function () {
    var row = $(this).closest("tr");
    var text1 = table.cell(row, 5).data().split("<i")[0].trim();
    var text2 = table.cell(row, 7).data();
    var textToCopy = "Ich kann " + text1;
    if (text2) {
      textToCopy += " (" + text2 + ")";
    }
    // Kopieren in die Zwischenablage
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Meldung
    });
  });
}
