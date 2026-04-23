const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiColors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ffffff",
  "#ffa500",
];

const confettiPieces = [];
const TOTAL_CONFETTI = 250;

for (let i = 0; i < TOTAL_CONFETTI; i++) {
  confettiPieces.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    width: Math.random() * 12 + 4,
    height: Math.random() * 12 + 4,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    speed: Math.random() * 4 + 2,
    drift: Math.random() * 2 - 1,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 8 - 4,
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((piece) => {
    ctx.save();

    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);

    ctx.fillStyle = piece.color;
    ctx.fillRect(
      -piece.width / 2,
      -piece.height / 2,
      piece.width,
      piece.height,
    );

    ctx.restore();

    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > canvas.height + 20) {
      piece.y = -20;
      piece.x = Math.random() * canvas.width;
    }

    if (piece.x > canvas.width) {
      piece.x = 0;
    }

    if (piece.x < 0) {
      piece.x = canvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

drawConfetti();
