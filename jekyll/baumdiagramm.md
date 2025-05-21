---
layout: default
title: Baumdiagramm
subtitle: Interaktives Plotly Baumdiagramm
---

<div class="input-row">
  <label for="pa">$P(A)$:</label>
  <input type="number" id="pa" min="0" max="1" step="0.01" value="0.5">
  <label for="pba">$P_A(B)$:</label>
  <input type="number" id="pba" min="0" max="1" step="0.01" value="0.4">
  <label for="pbna">$P_{\overline{A}}(B)$:</label>
  <input type="number" id="pbna" min="0" max="1" step="0.01" value="0.1">
</div>
<div id="baum" style="max-width: 500px;"></div>

<script src="/js_tools/baumdiagramm.js"></script>
<script>
  function updateFromInputs() {
    const pa = parseFloat(document.getElementById('pa').value);
    const pba = parseFloat(document.getElementById('pba').value);
    const pbna = parseFloat(document.getElementById('pbna').value);
    zeichneBaumdiagramm(pa, pba, pbna, 'baum', 'Baumdiagramm');
  }

  document.getElementById('pa').addEventListener('input', updateFromInputs);
  document.getElementById('pba').addEventListener('input', updateFromInputs);
  document.getElementById('pbna').addEventListener('input', updateFromInputs);

  updateFromInputs();
</script>
