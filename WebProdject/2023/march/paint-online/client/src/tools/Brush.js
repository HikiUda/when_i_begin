import Tool from './Tool';

export default class Brush extends Tool {
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         let x = e.pageX - e.target.offsetLeft;
         let y = e.pageY - e.target.offsetTop;
         //this.draw(x, y);
         this.socket.send(
            JSON.stringify({
               method: 'draw',
               id: this.id,
               figure: {
                  type: 'brush',
                  x,
                  y,
               },
            }),
         );
      }
   }

   static draw(ctx, x, y) {
      ctx.lineTo(x, y);
      ctx.stroke();
   }
}
