import utils from './utils';
import { noise } from '@chriscourses/perlin-noise';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Objects
class Circle {
   constructor(x, y, radius, color, offset) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.offset = offset;
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
   }
}

const arrCircles = [];

for (let j = 0; j < 3; j++) {
   const circles = [];
   let radius = 10 * j + 5;
   for (let i = 0; i < 100; i++) {
      circles.push(
         new Circle(
            canvas.width / 2,
            canvas.height / 2,
            radius,
            `hsl(${Math.random() * 255},100%,50%)`,
            i * 0.01,
         ),
      );
   }
   arrCircles.push(circles);
}

let time = 0;

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   c.fillStyle = 'rgba(0,0,0,0.01)';
   c.fillRect(0, 0, canvas.width, canvas.height);
   arrCircles.forEach((circles) => {
      circles.forEach((circle) => {
         circle.y = noise(time + circle.offset + circle.radius + 20) * canvas.height;
         circle.x = noise(time + circle.offset + circle.radius) * canvas.width;
         circle.draw();
      });
   });

   time += 0.005;
}

animate();
