const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const loveSong = document.getElementById("loveSong");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let noClicks = 0;

// NO button logic
noBtn.addEventListener("click", () => {
  noClicks++;
  yesBtn.style.transform = `scale(${1 + noClicks * 0.3})`;
  if (noClicks >= 2) noBtn.remove();
});

// YES button logic
yesBtn.addEventListener("click", () => {
  startConfetti();

  loveSong.currentTime = 0;
  loveSong.volume = 0;
  loveSong.play();

  // smooth fade-in
  let v = 0;
  const fade = setInterval(() => {
    v += 0.05;
    loveSong.volume = Math.min(v, 0.9);
    if (v >= 0.9) clearInterval(fade);
  }, 100);
});

// CONFETTI
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const confetti = [];

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
  });
  requestAnimationFrame(animateConfetti);
}
