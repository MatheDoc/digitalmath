let aufgabenZaehler = 1; // Initialisiere den Zähler für die Aufgaben
let questionId = 1; // Eindeutige Frage-ID für jede Aufgabe

// Die einzige, vereinheitlichte Funktion zum Anzeigen einer Zufallsfrage
async function zeigeZufallsfrage(sammlung, containerId = null) {
  try {
    // Prüfe, ob die Parent-Seite assistenz.html ist
    let jsonPath = `json/${sammlung}`;
    if (window.location.pathname.endsWith("assistenz.html")) {
      jsonPath = `assistenz/json/${sammlung}`;
    }
    const response = await fetch(jsonPath);
    //`https://raw.githubusercontent.com/MatheDoc/digitalmath/main/json/${sammlung}`
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    let aufgabeDiv;

    if (containerId) {
      // vorhandenes Div aktualisieren
      aufgabeDiv = document.getElementById(containerId);
      if (!aufgabeDiv) {
        console.warn(
          `Container mit ID ${containerId} nicht gefunden, erstelle neu.`
        );
        aufgabeDiv = document.createElement("div");
        aufgabeDiv.id = containerId;
        aufgabeDiv.classList.add("aufgabe");
        document.getElementById("aufgaben").appendChild(aufgabeDiv);
      }
      // Inhalt außer h3 tag löschen, um neu zu befüllen
      Array.from(aufgabeDiv.children).forEach((child) => {
        if (child.tagName !== "H3") {
          aufgabeDiv.removeChild(child);
        }
      });
    } else {
      // neues Div anlegen
      aufgabeDiv = document.createElement("div");
      aufgabeDiv.id = `aufgabe-${aufgabenZaehler}`;
      aufgabeDiv.classList.add("aufgabe");
      // Überschrift einfügen
      const aufgabenTitel = document.createElement("h3");
      aufgabenTitel.textContent = `${aufgabenZaehler}. Aufgabe`;
      aufgabeDiv.appendChild(aufgabenTitel);
      // Zähler erhöhen
      aufgabenZaehler++;
      document.getElementById("aufgaben").appendChild(aufgabeDiv);
    }

    aufgabeDiv.setAttribute("data-sammlung", sammlung);

    // WICHTIG: await hier verwenden, da zeigeZufaelligeAufgabeAusSammlung ein Promise zurückgibt
    const aufgabenInhalt = await zeigeZufaelligeAufgabeAusSammlung(
      sammlung,
      data
    );
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = aufgabenInhalt;
    aufgabeDiv.appendChild(tempContainer);

    // Select2 initialisieren
    const selector = `#${aufgabeDiv.id} select.mch`;
    const $select = $(selector);
    $select.select2({
      placeholder: "Antwort",
      minimumResultsForSearch: Infinity,
      width: "auto",
      dropdownAutoWidth: true,
      templateResult: renderWithMathJax,
      templateSelection: renderWithMathJax,
    });
    adjustSelect2Width(selector);

    // MathJax rendern
    MathJax.typesetPromise([aufgabeDiv]);

    // Listener für Icons hinzufügen
    addCheckIconListeners(aufgabeDiv);
  } catch (error) {
    console.error(`Fehler beim Laden der JSON-Datei für ${sammlung}:`, error);
    document.getElementById(
      "aufgaben"
    ).innerHTML += `<p>Fehler beim Laden der Sammlung ${sammlung}.</p>`;
  }
}

// neue Aufgabe anzeigen
async function zeigeNeuesQuiz() {
  const params = new URLSearchParams(window.location.search);
  let sammlungen = params.getAll("sammlung");
  const single = params.get("single");

  if (sammlungen.length > 0) {
    if (single) {
      const zufallsIndex = Math.floor(Math.random() * sammlungen.length);
      sammlungen = [sammlungen[zufallsIndex]];
    }
    // Vermerke ob mehrere Aufgaben für Css
    if (sammlungen.length > 1) {
      document.getElementById("aufgaben").classList.add("mehrere");
    }

    for (const sammlung of sammlungen) {
      await zeigeZufallsfrage(sammlung);
    }
  } else {
    console.error("Keine Sammlung in der URL gefunden.");
    document.getElementById("aufgaben").innerText = "Keine Sammlung gefunden.";
  }
}

// Aufgabe aus der Sammlung anzeigen
async function zeigeZufaelligeAufgabeAusSammlung(sammlung, aufgaben) {
  if (aufgaben.length > 0) {
    const randomIndex = Math.floor(Math.random() * aufgaben.length);
    const selectedTask = aufgaben[randomIndex];
    // War vorher: const ichKannText = getTitelAusSammlung(sammlung);
    const ichKannText = await getTitelAusSammlung(sammlung); // <--- await!

    // html Inhalt mit Einführung
    let htmlContent = `<div class="einleitung"> <h4> Ich kann ${ichKannText} </h4> <div class="symbolleiste">
          <i
            class="fas fa-paper-plane icon check-all-icon"
            title="Alle Fragen abschicken"
            onclick="checkAllQuestions(this)"
          ></i>
          <i
            class="fas fa-eye icon eye-icon"
            title="Lösungen anzeigen"
            onclick="toggleAllAnswers(this)"
          ></i>
          <i
            class="fas fa-file-pdf icon pdf-icon"
            title="PDF erstellen"
            onclick="printSingleTask(this)"
          ></i>
          <i
            class="fas fa-redo icon reload-icon"
            title="Neue Aufgabe anzeigen"
            onclick="reloadSingleTask(this)"
          ></i>
          <i
            class="fab fa-whatsapp icon whatapp-icon"
            title="Auf WhatsApp teilen"
            onclick="shareWhatsApp(this)"
          ></i>
          <i
          <i
            class="fas fa-user-graduate icon assistenz-icon"
            title="Assistenz anzeigen"
            onclick="zeigeAssistenz(this)"
          ></i>

        </div><p>${selectedTask.einleitung}</p></div>`; // Korrekt eingebundener Inhalt

    // Fragen und Antworten einfügen
    if (selectedTask.fragen.length === 1) {
      htmlContent += `<ol style="list-style-type: none;" aria-label>`;
    } else {
      htmlContent += `<ol aria-label>`;
    }

    selectedTask.fragen.forEach((frage, index) => {
      htmlContent += `<li><span class="frage">${frage}</span><br><span class="antwort">${selectedTask.antworten[index]}</span></li>`;
    });

    htmlContent += `</ol>`;

    // Interaktive Ersetzungen
    htmlContent = replaceNumericalWithInteractive(htmlContent);
    htmlContent = replaceMultipleChoiceWithDropdown(htmlContent);
    htmlContent = replaceTiktokidWithUrl(htmlContent);
    htmlContent = replaceYoutubeidWithUrl(htmlContent);

    return htmlContent;
  } else {
    console.error(`Keine Aufgaben in der Sammlung ${sammlung} gefunden.`);
    document.getElementById(
      "aufgaben"
    ).innerHTML += `<p>Keine Aufgaben in der Sammlung ${sammlung} gefunden.</p>`;
  }
}

// Ersetze Tiktok-Platzhalter durch URLs
function replaceTiktokidWithUrl(htmlContent) {
  // RegExp für das TikTok-ID-Muster
  const pattern = /\{TIKTOK:id=([A-Za-z0-9_-]+)}/g;

  // Replacer-Funktion mit den richtigen Parametern
  function replacer(match, id) {
    const url = `<i class="fab fa-tiktok clip-icon" title="Clip" onclick="window.open('https://www.tiktok.com/@mathechecks/video/${id}', '_blank')"></i>`;
    return url;
  }
  // Ersetze das Muster im Text
  return htmlContent.replace(pattern, replacer);
}

// Ersetze Youtube-Platzhalter durch URLs
function replaceYoutubeidWithUrl(htmlContent) {
  // RegExp für das TikTok-ID-Muster
  const pattern = /\{YOUTUBE:id=([A-Za-z0-9_-]+)}/g;

  // Replacer-Funktion mit den richtigen Parametern
  function replacer(match, id) {
    const url = `<i class="fab fa-youtube clip-icon" title="Clip" onclick="window.open('https://youtube.com/shorts/${id}', '_blank')"></i>`;
    return url;
  }
  // Ersetze das Muster im Text
  return htmlContent.replace(pattern, replacer);
}

// Ersetze numerische Aufgaben mit interaktiven Eingabefeldern
function replaceNumericalWithInteractive(htmlContent) {
  const pattern = /\{\d+:NUMERICAL:=(-?[0-9.,]+):([0-9.,]+)\}/g;
  function replacer(match, correctAnswer, tolerance) {
    const interactiveHtml = `
            <input type="text" id="answer${questionId}" placeholder="Antwort" autocomplete="off" aria-label="Frage ${questionId}" data-correct-answer="${correctAnswer.replace(
      ",",
      "."
    )}" data-tolerance="${tolerance.replace(",", ".")}">
            <i class="fas fa-paper-plane check-icon " title="Frage abschicken" onclick="checkNumericalAnswer(${questionId}, ${correctAnswer.replace(
      ",",
      "."
    )}, ${tolerance.replace(",", ".")})"></i>
            <span id="feedback${questionId}"></span>
        `;
    questionId++; // Eindeutige ID für jede Frage
    return interactiveHtml;
  }
  return htmlContent.replace(pattern, replacer);
}

// Ersetze Multiple-Choice-Fragen mit Dropdowns
function replaceMultipleChoiceWithDropdown(htmlContent) {
  const result = [];
  let index = 0;

  while (index < htmlContent.length) {
    const start = htmlContent.indexOf("{", index);

    // Kein weiterer Platzhalter
    if (start === -1) {
      result.push(htmlContent.slice(index));
      break;
    }

    // Prüfe, ob es ein MC-Platzhalter ist
    const pre = htmlContent.slice(index, start);
    const maybeMC = htmlContent.slice(start);

    const mcMatch = maybeMC.match(/^\{(\d+):MC:/);
    if (!mcMatch) {
      result.push(pre + "{");
      index = start + 1;
      continue;
    }

    // Suche balanciertes Ende
    let braceLevel = 1;
    let end = start + 1;
    while (end < htmlContent.length && braceLevel > 0) {
      if (htmlContent[end] === "{") braceLevel++;
      if (htmlContent[end] === "}") braceLevel--;
      end++;
    }

    const fullMatch = htmlContent.slice(start, end);
    const innerContent = fullMatch.replace(/^\{\d+:MC:/, "").slice(0, -1); // Nur das Innere

    // Verarbeite Optionen
    const options = innerContent.split(/(?<!\\)~/); // `~` als Trenner, kein Escaping davor
    const correctOption = options.find((opt) => opt.startsWith("="));
    const correctAnswer = correctOption
      ? correctOption.substring(1).trim()
      : null;

    const optionsHtml = options
      .map((option) => {
        const isCorrect = option.startsWith("=");
        const trimmed = isCorrect ? option.substring(1).trim() : option.trim();
        return `<option value="${trimmed}" data-html="${trimmed}">${trimmed}</option>`;
      })
      .join("");

    const selectHtml = `
            <div style="margin-top: 10px;">
            <select id="answer${questionId}" class="mch" aria-label="Multiple Choice Frage ${questionId}" data-correct-answer="${correctAnswer}">
                ${optionsHtml}
            </select>
            <i class="fas fa-paper-plane check-icon" onclick="checkMultipleChoiceAnswer(${questionId})"></i>
            <span id="feedback${questionId}"></span>
            </div>
        `;

    result.push(pre + selectHtml);
    index = end;
    questionId++;
  }

  return result.join("");
}

// Funktion zum Zufällig-Mischen eines Arrays (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Tauschen der Elemente
  }
}

// Funktion, um Breite der Select2 Options anzupassen
function adjustSelect2Width(selectElementSelector) {
  const $select2 = $(selectElementSelector);
  const $select2Container = $select2.next(".select2-container");
  let maxWidth = 0;

  $select2.find("option").each(function () {
    const optionText = $(this).text();
    const tempSpan = $("<span>").text(optionText).appendTo("body");
    maxWidth = Math.max(maxWidth, tempSpan.width());
    tempSpan.remove();
  });

  $select2Container.width(maxWidth + 30);
}

// Funktion zur Darstellung mit gerendertem LaTeX
function renderWithMathJax(data) {
  if (!data.element) return data.text;

  const latexHtml = data.element.getAttribute("data-html") || data.text;
  const span = document.createElement("span");
  span.innerHTML = latexHtml;

  MathJax.typesetPromise([span]).catch((err) => {
    console.error("MathJax Error:", err);
  });

  return span;
}

function getTitelAusSammlung(sammlung) {
  // Entferne .json am Ende, falls vorhanden
  const sammlungOhneJson = sammlung.replace(/\.json$/, "");
  return fetch("liste.json")
    .then((response) => response.json())
    .then((data) => {
      const eintrag = data.find((e) => e.Übung === sammlungOhneJson);
      return eintrag ? eintrag["Ich kann…"] : null;
    });
}

zeigeNeuesQuiz();
