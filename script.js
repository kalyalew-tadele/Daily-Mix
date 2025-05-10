const songs = [
  { title: "Up!", artist: "Forrest Frank" },
  { title: "A New Thing", artist: "Maddison Ryann Ward" },
  { title: "Altar", artist: "Hulvey,Forrest Frank" },
  { title: "Deep End", artist: "Lecrae" },
  { title: "Abba", artist: "Marizu" },
  { title: "Right Over Wrong", artist: "Alex Jean" },
  { title: "Closer", artist: "Hulvey" },
  { title: "Priorities", artist: "Andy Mineo" },
  { title: "You Lead", artist: "Jamie Grace" },
  { title: "Known", artist: "Tauren Wells" },
  { title: "Hills And Valley", artist: "Tauren Wells" },
  { title: "Good God", artist: "Limoblaze" },
  { title: "New Day", artist: "Blanca" },
  { title: "Are You Ready", artist: "Blanca" },
  { title: "Miracles", artist: "KB" },
  { title: "King Jesus", artist: "KB" },
  { title: "Glory", artist: "Gawvi" },
  { title: "Fight For Me", artist: "Gawvi" },
  { title: "Moments", artist: "Gawvi" },
  { title: "Desire", artist: "Limoblaze" },
  { title: "Jireh", artist: "Limoblaze" },
  { title: "Oceans", artist: "Hillsong United" },
];

const today = new Date().toDateString();
const savedData = JSON.parse(localStorage.getItem("dailySong"));

let index;

if (savedData && savedData.date === today) {
  index = savedData.index;
} else {
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash += today.charCodeAt(i);
  }
  index = hash % songs.length;
  localStorage.setItem("dailySong", JSON.stringify({ date: today, index }));
}

const song = songs[index];

const titleElement = document.getElementById("song-title");
const artistElement = document.getElementById("artist-name");
const songListElement = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");
const refreshButton = document.getElementById("refresh-button");
const playPauseButton = document.getElementById("play-pause-button");
const playIcon = playPauseButton.querySelector("i");

function playSong(songObj) {
  titleElement.textContent = songObj.title;
  artistElement.textContent = songObj.artist;

  const fileName = songObj.title.trim(); 
  
 
  audioPlayer.src = `songs/${fileName}.mp3`;
  audioPlayer.play().catch((err) => console.log("Playback error:", err));
}

function highlightCurrentSong(index) {
  const listItems = document.querySelectorAll("#song-list li");
  listItems.forEach((item) => item.classList.remove("highlight"));

  const songToHighlight = document.querySelector(`#song-list li[data-index="${index}"]`);
  if (songToHighlight) {
    songToHighlight.classList.add("highlight");
  }
}

refreshButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];

  localStorage.setItem("dailySong", JSON.stringify({ date: today, index: randomIndex }));

  titleElement.classList.remove("fade-in");
  artistElement.classList.remove("fade-in");
  void titleElement.offsetWidth;
  void artistElement.offsetWidth;

  highlightCurrentSong(randomIndex);
  playSong(randomSong);

  titleElement.classList.add("fade-in");
  artistElement.classList.add("fade-in");
});

highlightCurrentSong(index);
playSong(song);

let isPlaying = false;
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  } else {
    audioPlayer.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
  }
  isPlaying = !isPlaying;
});

