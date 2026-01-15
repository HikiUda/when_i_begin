import utils, { randomIntFromRange } from './utils';

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

// Objects
class Star {
   constructor(x, y, radius, color = '#e3eaef') {
      this.x = x;
      this.y = y;
      this.gravity = 1;
      this.friction = 0.8;
      this.radius = radius;
      this.color = color;
      this.velocity = {
         x: utils.randomIntFromRange(-5, 5),
         y: 3,
      };
      this.mass = 1;
   }

   draw() {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.shadowColor = '#e3eaef';
      c.shadowBlur = 20;
      c.fill();
      c.closePath();
      c.restore();
   }

   update() {
      // When ball hits bottom of screen
      if (this.y + this.radius + this.velocity.y + groundHeight > canvas.height) {
         this.velocity.y = -(this.velocity.y * this.friction);
         this.shatter();
      } else {
         this.velocity.y += this.gravity;
      }

      this.y += this.velocity.y;
      this.x += this.velocity.x;
      this.draw();
   }

   shatter() {
      this.radius = Math.max(0, this.radius - 3);
      for (let i = 0; i < 8; i++) {
         miniStars.push(new MiniStar(this.x, this.y, 2, 'e3eaef'));
      }
   }
}

class MiniStar extends Star {
   constructor(x, y, radius, color) {
      super(x, y, radius, color);

      this.velocity = {
         x: utils.randomIntFromRange(-5, 5),
         y: utils.randomIntFromRange(-15, 15),
      };
      this.gravity = 0.3;
      this.friction = 0.8;
      this.ttl = 100;
      this.opacity = 1;
   }
   update() {
      if (this.y + this.radius + this.velocity.y + groundHeight > canvas.height) {
         this.velocity.y = -(this.velocity.y * this.friction);
      } else {
         this.velocity.y += this.gravity;
      }
      if (
         this.x + this.radius + this.velocity.x > canvas.width ||
         this.x - this.radius - this.velocity.x < 0
      ) {
         this.velocity.x = -this.velocity.x;
      }
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      this.ttl -= 1;
      this.opacity -= 1 / this.ttl;
      this.draw();
   }
   draw() {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = `rgba(227,234,239,${this.opacity})`;
      c.shadowColor = '#e3eaef';
      c.shadowBlur = 20;
      c.fill();
      c.closePath();
      c.restore();
   }
}

function createMountainRange(mountainAmount, height, color) {
   for (let i = 0; i < mountainAmount; i++) {
      const mountainWidth = canvas.width / mountainAmount;
      c.beginPath();
      c.moveTo(mountainWidth * i, canvas.height);
      c.lineTo(mountainWidth * i + mountainWidth + 325, canvas.height);
      c.lineTo(mountainWidth * i + mountainWidth / 2, canvas.height - height);
      c.lineTo(mountainWidth * i - 325, canvas.height);
      c.fillStyle = color;
      c.fill();
      c.closePath();
   }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b');
let stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawnRate = 75;
let groundHeight = 100;
function init() {
   stars = [];
   miniStars = [];
   backgroundStars = [];

   // for (let i = 0; i < 1; i++) {
   //    stars.push(new Star(canvas.width / 2, 30, 15));
   // }
   for (let i = 0; i < 150; i++) {
      const x = randomIntFromRange(0, canvas.width);
      const y = randomIntFromRange(0, canvas.height);
      const radius = randomIntFromRange(1, 5);
      backgroundStars.push(new Star(x, y, radius));
   }
}

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   c.fillStyle = backgroundGradient;
   c.fillRect(0, 0, canvas.width, canvas.height);
   backgroundStars.forEach((backgroundStar) => {
      backgroundStar.draw();
   });
   createMountainRange(1, canvas.height - 50, '#384551');
   createMountainRange(2, canvas.height - 100, '#2b3843');
   createMountainRange(3, canvas.height - 300, '#26333e');
   c.fillStyle = '#182028';
   c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

   stars.forEach((star, index) => {
      star.update();
      if (star.radius === 0) {
         stars.splice(index, 1);
      }
   });
   miniStars.forEach((miniStar, index) => {
      miniStar.update();
      if (miniStar.ttl === 0) {
         miniStars.splice(index, 1);
      }
   });

   ticker++;
   if (ticker % randomSpawnRate === 0) {
      const x = randomIntFromRange(0, canvas.width);
      const radius = randomIntFromRange(3, 24);
      stars.push(new Star(x, -100, radius));
      randomSpawnRate = randomIntFromRange(75, 150);
   }
}

init();
animate();
