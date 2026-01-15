import utils from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
   x: innerWidth / 2,
   y: innerHeight / 2,
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
   mouse.x = event.clientX;
   mouse.y = event.clientY;
});

addEventListener('resize', () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;

   init();
});

// Objects
class Particle {
   constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.ttl = 1000;
   }

   draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
   }

   update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.ttl--;
      this.draw();
   }
}

// Implementation
let timer;
let particles;
function init() {
   particles = [];
   clearTimeout(timer);
   generateRing();
}

let hue = 0;
let hueRadians = 0;
function generateRing() {
   timer = setTimeout(generateRing, 300);
   let particlesCount = 100;

   for (let i = 0; i < particlesCount; i++) {
      hue = Math.sin(hueRadians);
      const radian = (Math.PI * 2) / particlesCount;

      const x = mouse.x;
      const y = mouse.y;
      particles.push(
         new Particle(x, y, 5, `hsl(${hue * 360},50%,50%)`, {
            x: Math.cos(radian * i) * 3,
            y: Math.sin(radian * i) * 3,
         }),
      );
   }
   hueRadians += 0.01;
}

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   c.fillStyle = `rgba(0,0,0,0.1)`;
   c.fillRect(0, 0, canvas.width, canvas.height);

   particles.forEach((particle, index) => {
      if (particle.ttl < 0) {
         particles.splice(index, 1);
      } else {
         particle.update();
      }
   });
}

init();
animate();
