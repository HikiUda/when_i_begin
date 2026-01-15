import utils from './utils';
import gsap from 'gsap';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
   x: innerWidth / 2,
   y: innerHeight / 2,
};

const center = {
   x: canvas.width / 2,
   y: canvas.height / 2,
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

let angle = 0;

// Event Listeners
addEventListener('mousemove', (event) => {
   gsap.to(mouse, {
      x: event.clientX - canvas.width / 2,
      y: event.clientY - canvas.height / 2,
      duration: 1,
   });

   angle = Math.atan2(mouse.y, mouse.x);
});

addEventListener('resize', () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;

   init();
});

// Objects
class Particle {
   constructor(x, y, radius, color, distanceFromCenter) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.distanceFromCenter = distanceFromCenter;
   }

   draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
   }

   update() {
      this.draw();
      this.x = center.x + this.distanceFromCenter * Math.cos(angle);
      this.y = center.y + this.distanceFromCenter * Math.sin(angle);
   }
}

// Implementation
let particles;

function init() {
   particles = [];
   const particleCount = 200;
   const hueIncrement = 360 / particleCount;

   for (let i = 0; i < particleCount; i++) {
      const x = center.x + i * Math.cos(angle);
      const y = center.y + i * Math.sin(angle);

      const hue = hueIncrement * i;
      particles.push(new Particle(x, y, 5, `hsl(${hue},50%,50%)`, i));
   }
}

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   c.fillStyle = `rgba(0,0,0,0.1)`;
   c.fillRect(0, 0, canvas.width, canvas.height);

   particles.forEach((particle) => {
      particle.update();
   });
}

init();
animate();
