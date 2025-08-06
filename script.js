const songs = [
  {
    name: "rise-to-the-sky",
    file: "assets/rise-to-the-sky.mp3",
    image: "assets/rise cover.jpeg"
  },
  {
    name: "Unstoppable",
    file: "assets/Unstoppable.mp3",
    image: "assets/Unstoppable-cover.jpg"
  },
  {
    name: "Dancing in the stardust",
    file: "assets/Dancing in the stardust.mp3",
    image: "assets/stardust cover.jpg"
  },
  {
    name: "In-your-heart-i-found-my-home",
    file: "assets/In-your-heart-i-found-my-home.mp3",
    image: "assets/in your heart cover.jpeg"
  },
  {
    name: "Warriyo - Mortals [NCS Release]",
    file: "assets/Warriyo - Mortals.mp3",
    image: "assets/warriyo.jpeg"
  },

  {
    name: "happy-kids-background-music",
    file: "assets/happy-kids-background-music.mp3",
    image: "assets/happy children images.jpeg"
  },
  {
    name: "still-waiting-at-the-door",
    file: "assets/still-waiting-at-the-door.mp3",
    image: "assets/still-waiting-at-the-door.jpg"
  }
];
let currentIndex = 0;
const masterbutton = document.querySelector("#master");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const image = document.querySelector("#songImage");
const songContainer = document.querySelector(".song-container ");
const songImg = document.querySelector("#song-container-image");
const progressBar = document.querySelector(".progress-bar");
const song = document.querySelectorAll(".song-container");
let isPlaying = false;
const audio = new Audio();
audio.src = songs[currentIndex].file;

// Play/Pause functionality implementation
masterbutton.addEventListener("click", () => {
  image.src = songs[currentIndex].image;
  if (!isPlaying) {
    audio.play();
    masterbutton.classList.remove("fa-play");
    masterbutton.classList.add("fa-pause");

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

  currentIndex = (currentIndex + 1) % songs.length;
  audio.src = songs[currentIndex].file;
  image.src = songs[currentIndex].image;
  if (isPlaying) {
    audio.play();
  }
  // Move 'active' class
  song.forEach(el => el.classList.remove('active'));
  song[currentIndex].classList.add('active');
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  audio.src = songs[currentIndex].file;
  image.src = songs[currentIndex].image;
  if (isPlaying) {
    audio.play();
  }
  // Move 'active' class
  song.forEach(el => el.classList.remove('active'));
  song[currentIndex].classList.add('active');
});

//Update progress bar
audio.addEventListener('timeupdate', () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 100);
  progressBar.value = progress;
});

// Handle song selection from playlist
song.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    song.forEach(el => el.classList.remove('active'));
 song.forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    currentIndex = index;
    progressBar.value = 0;
    image.src = songs[currentIndex].image;
    audio.src = songs[currentIndex].file;
    audio.play();
    isPlaying = true;
    masterbutton.classList.remove("fa-play");
    masterbutton.classList.add("fa-pause");
  });
});

