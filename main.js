const player = document.querySelector(".player");
const video = document.querySelector(".player-video");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-filled");
const skipButtons = document.querySelectorAll("[data-skip]");
const playBtn = document.querySelector(".player-button");
const ranges = document.querySelectorAll(".player-slider");
const fullscreen = document.querySelector(".player-fullscreen");

function play() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = "❚ ❚";
  } else {
    video.pause();
    playBtn.innerHTML = "►";
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function goFull() {
  if (video.webkitSupportsFullscreen) {
    video.webkitEnterFullScreen();
  }
}

playBtn.addEventListener("click", play);
video.addEventListener("click", play);
video.addEventListener("timeupdate", handleProgress);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("click", rangeUpdate));
ranges.forEach((range) => range.addEventListener("mousemove", rangeUpdate));
progress.addEventListener("click", scrub);
fullscreen.addEventListener("click", goFull);
window.addEventListener("keyup", (e) => {
  if (e.key == " ") {
    play();
  }
});
