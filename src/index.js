import songs from "./songs.json";

const LINE_NUMBER = 50;

const player = document.querySelector(".player");
const audio = player.querySelector("audio");
const cover = player.querySelector(".cover");
const info = player.querySelector(".info");
const title = player.querySelector(".title");
const artist = player.querySelector(".artist");
const prevBtn = player.querySelector(".prev");
const playBtn = player.querySelector(".play");
const nextBtn = player.querySelector(".next");
const lyrics = player.querySelector(".lyrics");
const progress = player.querySelector("progress");
const current = player.querySelector(".current-time");
const total = player.querySelector(".total-time");
const lines = player.querySelector(".lines");

let currentSongIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(songs[currentSongIndex]);
  createLines();
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
progress.addEventListener("click", updateProgress);
audio.addEventListener("timeupdate", drawCoverInfo);

// load song
function loadSong(song) {
  audio.src = song.url;
  cover.style.backgroundImage = `url(./assets/covers/${song.image})`;
  title.textContent = song.title;
  artist.textContent = song.artist;
  lyrics.innerHTML = song.lyrics;
  progress.value = 0;
  playBtn.innerHTML = "play";
}

// play and pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "pause";
  } else {
    audio.pause();
    playBtn.innerHTML = "play";
  }
}

// play next song
function next() {
  const currentSong = songs[currentSongIndex];
  const nextSong = songs[currentSongIndex + 1];
  if (nextSong) {
    audio.src = nextSong.file;
    cover.style.backgroundImage = `url(${nextSong.cover})`;
    info.innerHTML = `<h3>${nextSong.title}</h3>
    <h4>${nextSong.artist}</h4>`;
    playBtn.innerHTML = "play";
    currentSongIndex++;
  } else {
    audio.src = songs[0].file;
    cover.style.backgroundImage = `url(${songs[0].cover})`;
    info.innerHTML = `<h3>${songs[0].title}</h3>
    <h4>${songs[0].artist}</h4>`;
    playBtn.innerHTML = "play";
    currentSongIndex = 0;
  }
}

// play previous song
function prev() {
  const currentSong = songs[currentSongIndex];
  const prevSong = songs[currentSongIndex - 1];
  if (prevSong) {
    audio.src = prevSong.file;
    cover.style.backgroundImage = `url(${prevSong.cover})`;
    info.innerHTML = `<h3>${prevSong.title}</h3>
    <h4>${prevSong.artist}</h4>`;
    playBtn.innerHTML = "play";
    currentSongIndex--;
  } else {
    audio.src = songs[songs.length - 1].file;
    cover.style.backgroundImage = `url(${songs[songs.length - 1].cover})`;
    info.innerHTML = `<h3>${songs[songs.length - 1].title}</h3>
    <h4>${songs[songs.length - 1].artist}</h4>`;
    playBtn.innerHTML = "play";
    currentSongIndex = songs.length - 1;
  }
}

// update progress bar
function updateProgress(e) {
  const width = progress.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  e.target.value = (clickX / width) * 100;

  audio.currentTime = (clickX / width) * duration;
}

function drawCoverInfo() {
  if (audio.paused) {
    drawMinutes(false);
    drawLines(false);
    return;
  }
  drawMinutes();
  drawLines();
}

function drawMinutes(draw = true) {
  if (!draw) {
    return;
  }
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progressValue = (currentTime / duration) * 100;
  if (currentTime > 0) { // No establecer si progressValue es Infinity
    progress.value = progressValue;
  }
  console.log(title);
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
  const minutesTotal = String(Math.floor(duration / 60)).padStart(2, "0");
  const secondsTotal = String(Math.floor(duration % 60)).padStart(2, "0");
  const currentTimeString = `${minutes}:${seconds}`;
  const durationString = `${minutesTotal}:${secondsTotal}`;
  current.innerHTML = currentTimeString;
  total.innerHTML = durationString;
}

function createLines() {
  const width = lines.clientWidth;
  const lineWidth = width / (LINE_NUMBER * 1.5);

  for (let i = 0; i < LINE_NUMBER; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.width = `${lineWidth}px`;
    line.style.height = 0;
    lines.appendChild(line);
  }
}

function drawLines(draw = true) {
  if (!draw) {
    lines.style.display = "none";
    return;
  }

  lines.style.display = "flex";
  const allLines = lines.querySelectorAll(".line");
  const height = lines.clientHeight;

  allLines.forEach((line) => {
    line.style.height = `${Math.random() * height}px`;
  });
}
