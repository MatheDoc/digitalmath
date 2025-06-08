// flipcard.js
export function createFlipCard(frontText, backText) {
  const container = document.createElement("div");
  container.className = "flipcard-container";

  const card = document.createElement("div");
  card.className = "flipcard";

  const front = document.createElement("div");
  front.className = "flipcard-face flipcard-front";
  front.innerHTML = frontText;

  const back = document.createElement("div");
  back.className = "flipcard-face flipcard-back";
  back.innerHTML = backText;

  card.appendChild(front);
  card.appendChild(back);
  container.appendChild(card);

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  return container;
}
