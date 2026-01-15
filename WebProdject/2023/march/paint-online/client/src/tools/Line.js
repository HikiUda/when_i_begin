import Tool from './Tool';

export default class Line extends Tool {
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL();
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         let currentX = e.pageX - e.target.offsetLeft;
         let currentY = e.pageY - e.target.offsetTop;
         this.draw(this.startX, this.startY, currentX, currentY);
      }
   }

   draw(x, y, cx, cy) {
      const img = new Image();
      img.src = this.saved;
      img.onload = () => {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
         this.ctx.beginPath();
         this.ctx.moveTo(x, y);
         this.ctx.lineTo(cx, cy);
         this.ctx.closePath();
         this.ctx.stroke();
      };
   }
}
