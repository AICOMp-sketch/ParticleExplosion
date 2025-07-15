const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let particlesArray = [];
let hue = 0;

// Resize canvas when window size changes
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.color = `hsl(${hue}, 100%, 60%)`;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Create particles burst
function createExplosion() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const particleCount = 150;

  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle(centerX, centerY));
  }
}

// Animate function
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  hue += 0.5;

  for (let i = particlesArray.length - 1; i >= 0; i--) {
    const p = particlesArray[i];
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particlesArray.splice(i, 1);
    }
  }
}

// Wait for overlay animation to finish, then trigger explosion
document.querySelector('.title').addEventListener('animationend', () => {
  // Remove overlay
  document.querySelector('.overlay').style.display = 'none';
  // Create explosion particles
  createExplosion();
  // Start animation loop
  animate();

  // Optional: continuously create new explosions
  setInterval(createExplosion, 3000);
});