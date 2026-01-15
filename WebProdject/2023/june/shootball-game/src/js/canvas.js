import utils, { distance, randomIntFromRange } from './utils';
import gsap from 'gsap';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl');
const bigScoreEl = document.querySelector('#bigScoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

let center = {
   x: canvas.width / 2,
   y: canvas.height / 2,
};

addEventListener('resize', () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;
   center = {
      x: canvas.width / 2,
      y: canvas.height / 2,
   };
   init();
});

startGameBtn.addEventListener('click', (e) => {
   init();
   modalEl.style.display = 'none';
});

const friction = 0.99;
let score = 0;
class Player {
   constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
   }
   draw() {
      c.beginPath();
      c.arc(center.x, center.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
   }
}

class Projectile {
   constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
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
      this.x += this.velocity.x;
      this.y += this.velocity.y;
   }
}
class Enemy {
   constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
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
      this.x += this.velocity.x;
      this.y += this.velocity.y;
   }
}
class Particle {
   constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.alpha = 1;
   }
   draw() {
      c.save();
      c.globalAlpha = this.alpha;
      c.beginPath();

      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
   }
   update() {
      this.draw();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.velocity.x *= friction;
      this.velocity.y *= friction;
      this.alpha -= 0.01;
   }
}

const player = new Player(center.x, center.y, 10, 'white');
let projectiles = [];
let enemies = [];
let enemySpawner = null;
let animationId;
let particles = [];

addEventListener('click', (e) => {
   const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
   const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
   projectiles.push(new Projectile(center.x, center.y, 5, 'white', velocity));
});

function spawnEnemies() {
   enemySpawner = setInterval(() => {
      const radius = randomIntFromRange(5, 30);
      let power = 30 / (radius + 10);
      let hue = randomIntFromRange(0, 360);
      let x = randomIntFromRange(0, canvas.width);
      x = x > center.x ? x + center.x : x - center.x;
      let y = randomIntFromRange(0, canvas.height);
      y = y > center.y ? y + center.y : y - center.y;

      const color = `hsl(${hue}, 50%,50%)`;
      const angle = Math.atan2(center.y - y, center.x - x);
      const velocity = {
         x: Math.cos(angle) * power,
         y: Math.sin(angle) * power,
      };
      enemies.push(new Enemy(x, y, radius, color, velocity));
   }, 1000);
}

function generateParticles(projectile, enemy) {
   for (let i = 0; i < 8; i++) {
      const velocity = {
         x: (Math.random() - 0.5) * 8,
         y: (Math.random() - 0.5) * 8,
      };
      particles.push(
         new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, velocity),
      );
   }
}

function renderProjectile() {
   projectiles.forEach((projectile, index) => {
      projectile.update();
      if (
         projectile.x < 0 ||
         projectile.x > canvas.width ||
         projectile.y < 0 ||
         projectile.y > canvas.height
      ) {
         projectiles.splice(index, 1);
      }
   });
}
function renderParticles() {
   particles.forEach((particle, index) => {
      particle.update();
      if (particle.alpha <= 0) {
         particles.splice(index, 1);
      }
   });
}

function renderEnemies() {
   enemies.forEach((enemy, index) => {
      enemy.update();
      let distToPlayer = distance(enemy.x, enemy.y, player.x, player.y);
      if (distToPlayer - (enemy.radius + player.radius) < 1) {
         cancelAnimationFrame(animationId);
         clearInterval(enemySpawner);
         modalEl.style.display = 'flex';
         bigScoreEl.innerHTML = score;
      }
      if (enemy.radius < 5) {
         score += 20;
         scoreEl.innerHTML = score;
         enemies.splice(index, 1);
      }
      projectiles.forEach((projectile, index2) => {
         let dist = distance(enemy.x, enemy.y, projectile.x, projectile.y);
         if (dist < enemy.radius + projectile.radius) {
            //score
            score += 10;
            scoreEl.innerHTML = score;
            generateParticles(projectile, enemy);
            gsap.to(enemy, {
               radius: Math.max(0, enemy.radius - 10),
            });
            projectiles.splice(index2, 1);
         }
      });
   });
}
function animate() {
   animationId = requestAnimationFrame(animate);
   c.fillStyle = 'rgba(0,0,0,0.1)';
   c.fillRect(0, 0, canvas.width, canvas.height);
   player.draw();
   renderProjectile();
   renderEnemies();
   renderParticles();
}
function init() {
   projectiles = [];
   enemies = [];
   particles = [];
   clearInterval(enemySpawner);
   score = 0;
   scoreEl.innerHTML = score;
   bigScoreEl.innerHTML = score;
   animate();
   spawnEnemies();
}
