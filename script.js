const songs = [
  {
    name: "Rise to the sky",
    file: "assets/rise-to-the-sky.mp3",
    artist: "Habibur Rahman",
    image: "assets/rise cover.jpeg"
  },
  {
    name: "Unstoppable",
    file: "assets/Unstoppable.mp3",
    artist: "Sia",
    image: "assets/Unstoppable-cover.jpg"
  },
  {
    name: "Dancing in the stardust",
    file: "assets/Dancing in the stardust.mp3",
    artist: "Ciderlei Castro",
    image: "assets/stardust cover.jpg"
  },
  {
    name: "In your heart i found my home",
    file: "assets/In-your-heart-i-found-my-home.mp3",
    artist: "Muhammad Usama",
    image: "assets/in your heart cover.jpeg"
  },
  {
    name: "Warriyo - Mortals",
    file: "assets/Warriyo - Mortals.mp3",
    artist: "Warriyo (ft. Laura Brehm) ",
    image: "assets/warriyo.jpeg"
  },
  {
    name: "happy kids background music",
    file: "assets/happy-kids-background-music.mp3",
    artist: "Mikhail Smusev",
    image: "assets/happy children images.jpeg"
  },
  {
    name: "still waiting at the door",
    file: "assets/still-waiting-at-the-door.mp3",
    artist: "Anil Bukharia",
    image: "assets/still-waiting-at-the-door.jpg"
  },
  {
    name: "Cielo",
    file: "assets/Cielo.mp3",
    artist: "Huma-Huma",
    image: "assets/cielo.jpg"
  },
  {
    name: "Invincible",
    file: "assets/Invincible.mp3",
    artist: "DEAF KEV",
    image: "assets/invincible.jpg"
  },
  {
    name: "My Heart",
    file: "assets/My Heart.mp3",
    artist: "Different Heaven & EH!DE",
    image: "assets/my heart.jpg"
  },
  {
    name: "Heroes-Tonight",
    file: "assets/Heroes-Tonight.mp3",
    artist: "Janji ft. Johnning",
    image: "assets/heroes tonight.jpg"
  },
];

// Variables Declaration
const masterbutton = document.querySelector("#master");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const image = document.querySelector("#songImage");
const songContainer = document.querySelector(".song-container");
const songImg = document.querySelector("#song-container-image");
const progressBar = document.querySelector(".progress-bar");
const song = document.querySelectorAll(".song-container");
const currentSong = document.querySelector("#songName");
const artistName = document.querySelector("#artist");
const totalDuration = document.querySelector("#total-time");
const currentDuration = document.querySelector("#current-time");
const volumeControl = document.querySelector("#volumeSlider");
const volumeIcon = document.querySelector("#volumeIcon");
let isPlaying = false;
let currentIndex = 0;

//Default display
const audio = new Audio();
currentSong.innerHTML = `Song Name:&nbsp;&nbsp;&nbsp;${songs[currentIndex].name}`;
artistName.innerHTML = `Artist:&nbsp;&nbsp;&nbsp;${songs[currentIndex].artist}`;

//function for formatting the time
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}

// Update song details and reset playback status
function songInformation(currentIndex) {
  currentSong.innerHTML = `Song Name:&nbsp;&nbsp;&nbsp;${songs[currentIndex].name}`;
  artistName.innerHTML = `Artist:&nbsp;&nbsp;&nbsp;${songs[currentIndex].artist}`;
  audio.src = songs[currentIndex].file;
  image.src = songs[currentIndex].image;
  progressBar.value = 0;
  audio.addEventListener("loadedmetadata", () => {
    let duration = formatTime(audio.duration); console.log(duration)
    totalDuration.innerText = duration;
  });
  audio.addEventListener('timeupdate', () => {
    currentDuration.innerText = formatTime(audio.currentTime);
  });
}

// Next song function 
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  songInformation(currentIndex);
  if (isPlaying) {
    audio.play();
  }
  song.forEach(el => el.classList.remove('active'));
  song[currentIndex].classList.add('active');
}

// Play/Pause functionality implementation
masterbutton.addEventListener("click", () => {
  image.src = songs[currentIndex].image;
  songInformation(currentIndex);
  if (!isPlaying) {
    audio.play();
    masterbutton.classList.remove("fa-play");
    masterbutton.classList.add("fa-pause");
    song[currentIndex].classList.add('active');
    isPlaying = true;
  }
  else {
    audio.pause();
    masterbutton.classList.remove("fa-pause");
    masterbutton.classList.add("fa-play");
    isPlaying = false;
  }
});

// Next/Previous functionality implementation
next.addEventListener("click", () => {
  nextSong();
});
prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  songInformation(currentIndex);
  if (isPlaying) {
    audio.play();
  }
  song.forEach(el => el.classList.remove('active'));
  song[currentIndex].classList.add('active');
});

//Update progress bar
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Handle song selection from playlist
song.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    song.forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    currentIndex = index;
    progressBar.value = 0;
    songInformation(currentIndex);
    audio.play();
    isPlaying = true;
    masterbutton.classList.remove("fa-play");
    masterbutton.classList.add("fa-pause");
  });
});

// Volume handling
audio.volume = volumeControl.value;
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

let lastVolume = audio.volume; //  stores last value 

//Mute/unmute toggle on icon click
volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume; // store Current volume 
    audio.volume = 0;
    volumeControl.value = 0;
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-mute");
  } else {
    audio.volume = lastVolume;
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.add("fa-volume-up");
  }
});
// Autoplay logic
audio.addEventListener("ended", () => {
  nextSong();
  isPlaying = true;
});





