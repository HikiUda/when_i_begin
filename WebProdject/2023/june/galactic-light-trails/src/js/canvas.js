import utils, { randomColor, randomIntFromRange } from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

addEventListener('resize', () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;

   init();
});
let mouseDown = false;
addEventListener('mousedown', () => {
   mouseDown = true;
});
addEventListener('mouseup', () => {
   mouseDown = false;
});

// Objects
class Particle {
   constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
   }

   draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 15;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
   }

   update() {
      this.draw();
   }
}

// Implementation
let particles;
function init() {
   particles = [];

   for (let i = 0; i < 400; i++) {
      const halfCanvasWidth = canvas.width / 2 + 200;
      const halfCanvasHeight = canvas.height / 2 + 200;
      const x = randomIntFromRange(-halfCanvasWidth, halfCanvasWidth);
      const y = randomIntFromRange(-halfCanvasHeight, halfCanvasHeight);
      const radius = randomIntFromRange(1, 1);
      const color = randomColor(colors);
      particles.push(new Particle(x, y, radius, color));
   }
}
let radians = 0;
let radiansSpeed = 0.001;
let alpha = 1;
// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   // c.clearRect(0, 0, canvas.width, canvas.height);
   c.fillStyle = `rgba(10,10,10,${alpha})`;
   c.fillRect(0, 0, canvas.width, canvas.height);

   c.save();

   c.translate(canvas.width / 2, canvas.height / 2);
   c.rotate(radians);
   particles.forEach((particle) => {
      particle.update();
   });
   c.restore();
   radians += radiansSpeed;

   if (mouseDown && radiansSpeed <= 0.01) {
      radiansSpeed += 0.00005;
   } else if (!mouseDown && radiansSpeed > 0.001) {
      radiansSpeed -= 0.00005;
   }

   if (mouseDown && alpha >= 0.1) {
      alpha -= 0.01;
   } else if (!mouseDown && alpha < 1) {
      alpha += 0.01;
   }
}

init();
animate();
