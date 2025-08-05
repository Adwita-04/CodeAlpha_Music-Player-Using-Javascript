const songs = [
  {
    name: "rise-to-the-sky",
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
    name: "In-your-heart-i-found-my-home",
    file: "assets/In-your-heart-i-found-my-home.mp3",
    artist: "Muhammad Usama",
    image: "assets/in your heart cover.jpeg"
  },
  {
    name: "happy-kids-background-music",
    file: "assets/happy-kids-background-music.mp3",
    artist: "Mikhail Smusev",
    image: "assets/happy children images.jpeg"
  },
  {
    name: "still-waiting-at-the-door",
    file: "assets/still-waiting-at-the-door.mp3",
    artist: "Anil Bukharia",
    image: "assets/waiting-at-the-door.jpg"
  }
];
let currentIndex=0;
const masterbutton= document.querySelector("#master");
const audio= new Audio(songs[currentIndex].file);
let isPlaying = false;

masterbutton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    masterbutton.classList.remove("fa-play");
    masterbutton.classList.add("fa-pause");
    isPlaying = true;
  } else {
    audio.pause();
    masterbutton.classList.remove("fa-pause");
    masterbutton.classList.add("fa-play");
    isPlaying = false;
  }
});

