const params = new URLSearchParams(window.location.search);
const sammlung = params.get("sammlung");

// Videoquelle dynamisch setzen
const videoSource = document.getElementById("videoSource");
if (videoSource && sammlung) {
  videoSource.src = `assistenz/mp4/${sammlung.replace(".json", ".mp4")}`;
  // Damit das Video neu geladen wird:
  const video = document.getElementById("myVideo");
  video.load();
}

ladeIframe(
  "assistierte-aufgabe",
  `/quiz.html?sammlung=${encodeURIComponent(sammlung)}`
);

const video = document.getElementById("myVideo");
const muteToggle = document.getElementById("muteToggle");

muteToggle.addEventListener("click", () => {
  video.muted = !video.muted;
  muteToggle.textContent = video.muted ? "🔇" : "🔈";
});

const playPauseBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");

playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

video.addEventListener("timeupdate", () => {
  progress.value = (video.currentTime / video.duration) * 100;
});

progress.addEventListener("input", () => {
  video.currentTime = (progress.value / 100) * video.duration;
});

const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
  video.muted = video.volume === 0;
  muteToggle.textContent = video.muted ? "🔇" : "🔈";
});
