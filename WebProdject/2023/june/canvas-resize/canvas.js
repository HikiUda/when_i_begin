const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0,0,0.5';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255,0,0.5';
// c.fillRect(400, 50, 170, 200);
// c.fillStyle = 'rgba(0, 0,255,0.5';
// c.fillRect(10, 350, 50, 70);
// console.log(canvas);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34e3';
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.stroke();

//Animation
let radius = 30;
let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;
let dx = 5;
let dy = 4;

function animate() {
   requestAnimationFrame(animate);
   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
   c.beginPath();
   c.arc(x, y, radius, 0, Math.PI * 2, false);
   c.strokeStyle = 'blue';
   c.stroke();
   if (x + radius > window.innerWidth || x - radius < 0) {
      dx = -dx;
   }
   if (y + radius > window.innerHeight || y - radius < 0) {
      dy = -dy;
   }

   x += dx;
   y += dy;
}
animate();
