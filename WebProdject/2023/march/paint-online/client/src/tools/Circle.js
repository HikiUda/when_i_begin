import Tool from './Tool';

export default class Circle extends Tool {
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.centerX = e.pageX - e.target.offsetLeft;
      this.centerY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL();
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         let currentX = Math.abs(e.pageX - e.target.offsetLeft - this.centerX);
         let currentY = Math.abs(e.pageY - e.target.offsetTop - this.centerY);
         let radius = currentX > currentY ? currentX : currentY;
         this.draw(this.centerX, this.centerY, radius);
      }
   }

   draw(x, y, r) {
      const img = new Image();
      img.src = this.saved;
      img.onload = () => {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
         this.ctx.beginPath();
         this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
         this.ctx.fill();
         this.ctx.stroke();
      };
   }
}
