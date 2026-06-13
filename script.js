const canvas = document.getElementById("particleField");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];
let rafId = 0;

const pointer = {
  x: -9999,
  y: -9999
};

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.min(92, Math.max(44, Math.floor((width * height) / 18000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    size: Math.random() * 1.7 + 0.55,
    hue: Math.random() > 0.55 ? 187 : 254
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    const dxPointer = particle.x - pointer.x;
    const dyPointer = particle.y - pointer.y;
    const pointerDistance = Math.hypot(dxPointer, dyPointer);

    if (pointerDistance < 120) {
      particle.x += dxPointer * 0.003;
      particle.y += dyPointer * 0.003;
    }
  }

  for (let i = 0; i < particles.length; i += 1) {
    const a = particles[i];

    for (let j = i + 1; j < particles.length; j += 1) {
      const b = particles[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 132) {
        const alpha = (1 - distance / 132) * 0.28;
        ctx.strokeStyle = `rgba(85, 242, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    const gradient = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.size * 6);
    gradient.addColorStop(0, `hsla(${a.hue}, 100%, 72%, 0.95)`);
    gradient.addColorStop(1, `hsla(${a.hue}, 100%, 72%, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.size * 6, 0, Math.PI * 2);
    ctx.fill();
  }

  rafId = requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
window.addEventListener("pointerleave", () => {
  pointer.x = -9999;
  pointer.y = -9999;
});

resize();
draw();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(rafId);
    return;
  }
  draw();
});
