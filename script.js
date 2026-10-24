
/* ===== 1. SELECT ELEMENTS ===== */
const welcome = document.getElementById("welcome");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");

const typingText = document.getElementById("typingText");
const heartsContainer = document.getElementById("hearts");

const letterBtn = document.getElementById("letterBtn");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

const musicBtn = document.getElementById("musicBtn");
const loveSong = document.getElementById("loveSong");
const musicDisc = document.getElementById("musicDisc");
const musicStatus = document.getElementById("musicStatus");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");


/* ===== 2. OPEN THE GIFT + START MUSIC ===== */
openBtn.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  mainContent.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  typeWriter();
  startHearts();

  // Play music immediately after the user's click
  try {
    await loveSong.play();

    musicBtn.textContent = "❚❚ Pause Our Song";
    musicDisc.classList.add("playing");
    musicStatus.textContent = "Playing a little song for you ♡";
  } catch (error) {
    musicStatus.textContent =
      "Tap Play Our Song to start the music ♡";
  }
});


/* ===== 3. TYPING ANIMATION ===== */
const heroMessage =
  "Every little moment with you is a memory I want to keep forever. Today, this little world is all yours. ❤️";

let charIndex = 0;
let typingStarted = false;

function typeWriter() {
  if (typingStarted) return;

  typingStarted = true;
  typingText.textContent = "";
  charIndex = 0;

  function typeNext() {
    if (charIndex < heroMessage.length) {
      typingText.textContent += heroMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeNext, 40);
    }
  }

  typeNext();
}


/* ===== 4. FLOATING HEARTS ===== */
let heartInterval = null;

function createHeart() {
  const heart = document.createElement("span");

  const symbols = ["♡", "♥", "💕", "❤"];

  heart.className = "heart-particle";
  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 5) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}

function startHearts() {
  if (heartInterval) return;

  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 250);
  }

  heartInterval = setInterval(createHeart, 650);
}


/* ===== 5. LOVE LETTER POPUP ===== */
function openLetter() {
  letterModal.classList.remove("hidden");
}

function closeLetterPopup() {
  letterModal.classList.add("hidden");
}

letterBtn.addEventListener("click", openLetter);
closeLetter.addEventListener("click", closeLetterPopup);

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetterPopup();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLetterPopup();
  }
});


/* ===== 6. MUSIC PLAY / PAUSE ===== */
async function playMusic() {
  try {
    await loveSong.play();

    musicBtn.textContent = "❚❚ Pause Our Song";
    musicDisc.classList.add("playing");
    musicStatus.textContent = "Playing a little song for you ♡";
  } catch (error) {
    musicStatus.textContent =
      "Couldn't play music. Check the audio file and try again.";
  }
}

function pauseMusic() {
  loveSong.pause();

  musicBtn.textContent = "▶ Play Our Song";
  musicDisc.classList.remove("playing");
  musicStatus.textContent = "Paused for a little moment ♡";
}

musicBtn.addEventListener("click", async () => {
  if (loveSong.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
});

loveSong.addEventListener("ended", () => {
  musicBtn.textContent = "▶ Play Our Song";
  musicDisc.classList.remove("playing");
});

loveSong.addEventListener("error", () => {
  musicStatus.textContent =
    "Audio not found. Check images/our-song.mp3";
});


/* ===== 7. FINAL SURPRISE ===== */
surpriseBtn.addEventListener("click", () => {
  surpriseMessage.classList.remove("hidden");
  surpriseBtn.classList.add("hidden");

  // Heart burst animation
  for (let i = 0; i < 24; i++) {
    setTimeout(createHeart, i * 90);
  }

  surpriseMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
