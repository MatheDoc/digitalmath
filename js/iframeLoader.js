function resizeIframe(iframe) {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const height = iframeDoc.body.scrollHeight;
    iframe.style.height = height + 30 + "px";
    iframe.style.width = "100%";
    iframe.style.border = "none";
  } catch (e) {
    console.warn("Kein Zugriff auf iframe-Inhalt:", e);
  }
}

function ladeIframe(divId, url) {
  const container = document.getElementById(divId);
  if (!container) {
    console.error('Div mit ID "' + divId + '" nicht gefunden.');
    return;
  }

  container.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen style="width:100%;"></iframe>`;
  const iframe = container.querySelector("iframe");

  if (!iframe) {
    console.error("iframe konnte nicht erstellt werden.");
    return;
  }

  iframe.addEventListener("load", () => {
    setTimeout(() => resizeIframe(iframe), 1000);
  });
}
