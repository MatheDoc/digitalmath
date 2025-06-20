// alle richtigen Antworten anzeigen
function showAllAnswers(iconElement) {
  // Finde das umgebende Aufgaben-DIV
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  // Finde alle relevanten Inputs innerhalb dieses DIVs
  aufgabenDiv
    .querySelectorAll('input[type="text"], select.mch')
    .forEach((input) => {
      const questionId = input.id.replace("answer", "");
      const correctAnswer = input.getAttribute("data-correct-answer");
      const feedbackElement = document.getElementById(`feedback${questionId}`);
      if (feedbackElement) {
        feedbackElement.innerHTML = correctAnswer;
        feedbackElement.style.color = "blue";
        feedbackElement.style.opacity = 1;
      }
      input.style.display = "none";
    });

  document.querySelectorAll("select.mch").forEach((select) => {
    const questionId = select.id.replace("answer", "");
    const correctAnswer = select.getAttribute("data-correct-answer");
    const feedbackElement = document.getElementById(`feedback${questionId}`);
    feedbackElement.innerHTML = correctAnswer;
    feedbackElement.style.color = "blue";
    feedbackElement.style.opacity = 1;
    MathJax.typesetPromise([feedbackElement]);

    // Select2-Container ausblenden
    const select2Container = select.nextElementSibling; // Nächstes Geschwisterelement nach select
    if (select2Container && select2Container.classList.contains("select2")) {
      select2Container.style.display = "none";
    }
  });

  document.querySelectorAll(".check-icon").forEach((icon) => {
    icon.style.display = "none";
  });
}

// alle Antworten ausblenden
function hideAllAnswers(iconElement) {
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  aufgabenDiv.querySelectorAll('input[type="text"]').forEach((input) => {
    const questionId = input.id.replace("answer", "");
    const feedbackElement = document.getElementById(`feedback${questionId}`);
    feedbackElement.innerHTML = "";
    input.style.display = "inline";
  });

  aufgabenDiv.querySelectorAll("select.mch").forEach((select) => {
    const questionId = select.id.replace("answer", "");
    const feedbackElement = document.getElementById(`feedback${questionId}`);
    feedbackElement.innerHTML = "";
    $(select).select2("destroy");
    select.style.display = "inline";

    $(select).select2({
      placeholder: "Antwort",
      minimumResultsForSearch: Infinity,
      width: "auto",
      dropdownAutoWidth: true,
      templateResult: renderWithMathJax,
      templateSelection: renderWithMathJax,
    });

    adjustSelect2Width(select);
  });

  aufgabenDiv.querySelectorAll(".check-icon").forEach((icon) => {
    icon.style.display = "inline";
  });
}

// pdf Export
function printSingleTask(iconElement) {
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  const originalContent = document.body.innerHTML;
  const aufgabeContent = aufgabenDiv.outerHTML;

  document.body.innerHTML = aufgabeContent;
  window.print();
  document.body.innerHTML = originalContent;

  // Optionale Nachbearbeitung wie MathJax neu setzen
  MathJax.typesetPromise();
}

// neu laden: Wenn der "single" Parameter vorhanden ist, wird die Seite neu geladen, damit wieder alle Aufgaben zur Verfügung stehen.
function reloadSingleTask(iconElement) {
  const params = new URLSearchParams(window.location.search);
  const single = params.get("single");
  if (single) {
    window.location.reload();
  } else {
    // Wenn kein "single" Parameter vorhanden ist, aktive Sammlung neuladen
    const aufgabeDiv = iconElement.closest(".aufgabe");
    if (aufgabeDiv) {
      aufgabeDiv.style.backgroundColor = "#fff";
      const id = aufgabeDiv.id; // z.B. "aufgabe-2"
      const sammlung = aufgabeDiv.getAttribute("data-sammlung");
      zeigeZufallsfrage(sammlung, id);
    }
  }
}

// Assistenzmodus starten
async function zeigeAssistenz(iconElement) {
  const aufgabeDiv = iconElement.closest(".aufgabe");
  if (aufgabeDiv) {
    const sammlung = aufgabeDiv.getAttribute("data-sammlung");
    const mp4Url = `assistenz/mp4/${sammlung.replace(".json", ".mp4")}`;
    const jsonUrl = `assistenz/json/${sammlung}`;

    // Prüfe, ob beide Dateien existieren
    const [mp4Ok, jsonOk] = await Promise.all([
      fetch(mp4Url, { method: "HEAD" }).then((r) => r.ok).catch(() => false),
      fetch(jsonUrl, { method: "HEAD" }).then((r) => r.ok).catch(() => false),
    ]);

    if (mp4Ok && jsonOk) {
      window.open(`assistenz.html?sammlung=${sammlung}`, "_blank");
    } else {
      alert("Assistenz noch nicht verfügbar");
    }
  }
}

// Auf WhatsApp teilen
function shareWhatsApp(iconElement) {
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  const sammlung = aufgabenDiv.getAttribute("data-sammlung");
  const url =
    `https://www.mathechecks.de/quiz.html?sammlung=${encodeURIComponent(
      sammlung
    )}` + `&exam=yes`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;

  window.open(whatsappUrl, "_blank");
}

function checkNumericalAnswer(questionId, correctAnswer, tolerance) {
  let userAnswerString = document.getElementById(`answer${questionId}`).value;
  let sanitizedUserAnswerString = userAnswerString
    .replace(/^=/, "")
    .replace(",", ".")
    .trim();
  const userAnswer = parseFloat(sanitizedUserAnswerString);
  const feedbackElement = document.getElementById(`feedback${questionId}`);

  if (!isNaN(userAnswer)) {
    if (Math.abs(userAnswer - correctAnswer) <= parseFloat(tolerance)) {
      feedbackElement.innerHTML = userAnswer + " ist richtig!";
      if (userAnswer !== correctAnswer) {
        feedbackElement.innerHTML +=
          " (Die genauere Antwort ist " + correctAnswer + ".)";
      }
      feedbackElement.style.color = "green";
      return true;
    } else {
      feedbackElement.innerHTML =
        userAnswer +
        " ist falsch. Die richtige Antwort ist " +
        correctAnswer +
        ".";
      feedbackElement.style.color = "red";
      //document.body.style.backgroundColor = "#fdbdbd";
    }
    feedbackElement.style.transition = "opacity 0.5s ease-in-out";
    feedbackElement.style.opacity = 1;
  } else {
    feedbackElement.textContent = "Ungültige Eingabe";
    feedbackElement.style.color = "orange";
  }
}
function checkMultipleChoiceAnswer(questionId) {
  const select = document.getElementById(`answer${questionId}`);
  const userAnswer = select.value;
  const correctAnswer = select.dataset.correctAnswer;

  const feedback = document.getElementById(`feedback${questionId}`);
  if (userAnswer === correctAnswer) {
    feedback.textContent = "Richtig!";
    feedback.style.color = "green";
    return true;
  } else {
    feedback.textContent = "Falsch. Die richtige Antwort ist: " + correctAnswer;
    feedback.style.color = "red";
    //document.body.style.backgroundColor = "#fdbdbd";
    MathJax.typesetPromise([feedback]);
  }
}

//alle Fragen überprüfen
function checkAllQuestions(iconElement) {
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  let correctCount = 0;
  let totalCount = 0;

  aufgabenDiv.querySelectorAll('input[type="text"]').forEach((input) => {
    totalCount++;
    const questionId = input.id.replace("answer", "");
    const correctAnswer = input.getAttribute("data-correct-answer");
    const tolerance = input.getAttribute("data-tolerance");

    if (
      checkNumericalAnswer(
        questionId,
        parseFloat(correctAnswer),
        parseFloat(tolerance)
      )
    ) {
      correctCount++;
    }
  });

  aufgabenDiv.querySelectorAll("select.mch").forEach((select) => {
    totalCount++;
    const questionId = select.id.replace("answer", "");
    if (checkMultipleChoiceAnswer(questionId)) {
      correctCount++;
    }
  });

  if (totalCount > 0) {
    if (correctCount === totalCount) {
      aufgabenDiv.style.backgroundColor = "#c4fcbf";
    } else {
      aufgabenDiv.style.backgroundColor = "#fdbdbd";
    }
  } else {
    alert("Es wurden keine Fragen gefunden.");
  }
}

// check all icon ausblenden, falls Lösung angezeigt wurde
function addCheckIconListeners(container) {
  container
    .querySelectorAll(".check-icon, .check-all-icon, .eye-icon")
    .forEach((icon) => {
      icon.addEventListener("click", function () {
        const checkAllIcon = container.querySelector(".check-all-icon");
        if (checkAllIcon) {
          checkAllIcon.style.color = "#7e7e7e";
          checkAllIcon.onclick = null;
          checkAllIcon.title = " ";
          checkAllIcon.style.cursor = "auto";
        }
      });
    });
}

function toggleAllAnswers(iconElement) {
  const aufgabenDiv = iconElement.closest(".aufgabe");
  if (!aufgabenDiv) return;

  const isShown = iconElement.classList.contains("fa-eye-slash");

  if (isShown) {
    // Lösungen ausblenden
    hideAllAnswers(iconElement);
    iconElement.classList.remove("fa-eye-slash");
    iconElement.classList.add("fa-eye");
    iconElement.title = "Lösungen anzeigen";
  } else {
    // Lösungen anzeigen
    showAllAnswers(iconElement);
    iconElement.classList.remove("fa-eye");
    iconElement.classList.add("fa-eye-slash");
    iconElement.title = "Lösungen ausblenden";
  }
}
