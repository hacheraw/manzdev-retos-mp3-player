import songs from "./songs.json";

const LINE_NUMBER = 50;

const player = document.querySelector(".player");
const audio = player.querySelector("audio");
const cover = player.querySelector(".cover");
// const info = player.querySelector(".info");
const title = player.querySelector(".title");
const artist = player.querySelector(".artist");
const prevBtn = player.querySelector(".prev");
const playBtn = player.querySelector(".play");
const pauseBtn = player.querySelector(".pause");
const nextBtn = player.querySelector(".next");
const lyrics = player.querySelector(".lyrics");
const progress = player.querySelector(".progress");
const bar = progress.querySelector(".bar");
const current = player.querySelector(".current-time");
const total = player.querySelector(".total-time");
const lines = player.querySelector(".lines");
const listDiv = document.querySelector(".playlist");
const loopBtns = document.querySelectorAll(".loop");
const listBtns = document.querySelectorAll(".list");

const HIDE_ON_PAUSE = [lines/*, current, total */]; // Elementos que se ocultarán al pausar
let LOOP = false; // por defecto no se hace loop

// TODO: deshabilitar botón si no hay más canciones

let currentSongIndex = 0;

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  generatePlaylist();
  loadSong(songs[currentSongIndex]);
  createLines();
});

playBtn.addEventListener("click", () => { audio.play(); });
pauseBtn.addEventListener("click", () => { audio.pause(); });
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
progress.addEventListener("click", updateProgress);
audio.addEventListener("timeupdate", drawCoverInfo);
audio.addEventListener("play", () => { updateVisibility(true); });
audio.addEventListener("pause", () => { updateVisibility(false); });
audio.addEventListener("ended", () => { updateVisibility(false); next(); });
loopBtns.forEach(btn =>
  btn.addEventListener("click", () => {
    LOOP = !LOOP;
    loopBtns.forEach(btn => btn.classList.toggle("hide"));
    updateVisibility();
  })
);
listBtns.forEach(btn =>
  btn.addEventListener("click", () => {
    listDiv.classList.toggle("show");
    listBtns.forEach(btn => btn.classList.toggle("hide"));
  })
);

// Genera la playlist
function generatePlaylist() {
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = `${song.artist} - ${song.title}`;
    div.addEventListener("click", () => {
      currentSongIndex = index;
      changeSong(song);
    });
    listDiv.appendChild(div);
  });
}

// Carga una canción
function loadSong(song) {
  const listItems = listDiv.querySelectorAll("div");
  listItems.forEach((item) => { item.classList.remove("active"); });
  listItems[currentSongIndex].classList.add("active");
  audio.src = song.url;
  cover.style.backgroundImage = `url(./assets/covers/${song.image})`;
  title.textContent = song.title;
  artist.textContent = song.artist;
  lyrics.textContent = song.lyrics;
  progress.value = 0;
}

// Siguiente canción
function next() {
  if (!LOOP && currentSongIndex === songs.length - 1) {
    return; // Es la última
  }
  if (++currentSongIndex >= songs.length) currentSongIndex = 0; // Si no existe, la primera
  const nextSong = songs[currentSongIndex];
  audio.src = nextSong.url;
  changeSong(nextSong);
}

// Canción anterior
function prev() {
  if (!LOOP && currentSongIndex === 0) {
    return; // Es la primera
  }
  if (--currentSongIndex < 0) currentSongIndex = songs.length - 1; // Si no existe, la última
  const prevSong = songs[currentSongIndex];
  audio.src = prevSong.url;
  changeSong(prevSong);
}

// Cambia la canción
function changeSong(newSong) {
  updateVisibility(false);
  loadSong(newSong);
  audio.play();
}

// Permite cambiar la barra de progreso
function updateProgress(e) {
  const width = progress.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  bar.style.width = `${(clickX / width) * 100}%`;
  audio.currentTime = (clickX / width) * duration;
}

// Pinta las barritas y las marcas de tiempo
function drawCoverInfo() {
  if (!audio.paused) {
    drawMinutes();
    drawLines();
  }
}

// Pinta las marcas de tiempo
function drawMinutes() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  if (currentTime > 0) { // No establecer si progressValue es Infinity
    bar.style.width = `${(currentTime / duration) * 100}%`;
  }
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
  const minutesTotal = String(Math.floor(duration / 60)).padStart(2, "0");
  const secondsTotal = String(Math.floor(duration % 60)).padStart(2, "0");
  const currentTimeString = `${minutes}:${seconds}`;
  const durationString = `${minutesTotal}:${secondsTotal}`;
  current.innerHTML = currentTimeString;
  total.innerHTML = isNaN(duration) ? "" : durationString;
}

// Crea los div de las líneas (una vez)
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

// Anima las líneas
function drawLines() {
  lines.style.display = "flex";
  const allLines = lines.querySelectorAll(".line");
  const height = lines.clientHeight;

  allLines.forEach((line) => {
    line.style.height = `${Math.random() * height}px`;
  });
}

// Muestra u oculta elementos
function updateVisibility() {
  playBtn.style.display = audio.paused ? "inherit" : "none";
  pauseBtn.style.display = !audio.paused ? "inherit" : "none";

  HIDE_ON_PAUSE.forEach((element) => {
    element.style.opacity = audio.paused ? 0 : 1;
  });

  nextBtn.style.color = !LOOP && (currentSongIndex === songs.length - 1) ? "grey" : "currentColor";
  prevBtn.style.color = !LOOP && (currentSongIndex === 0) ? "grey" : "currentColor";
}
