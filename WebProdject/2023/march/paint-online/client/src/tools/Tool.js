export default class Tool {
   constructor(canvas, socket, id) {
      this.canvas = canvas;
      this.socket = socket;
      this.id = id;
      this.ctx = canvas.getContext('2d');
      this.destroyEvents();

      this.listen();

      this.ctx.strokeStyle = this.ctx.fillStyle;
   }

   listen() {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmouseleave = this.mouseUpHandler.bind(this);
   }

   mouseUpHandler(e) {
      this.mouseDown = false;
      this.socket.send(
         JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
               type: 'finish',
            },
         }),
      );
   }
   mouseDownHandler(e) {}
   mouseMoveHandler(e) {}

   set fillColor(color) {
      this.ctx.fillStyle = color;
   }
   set strokeColor(color) {
      this.ctx.strokeStyle = color;
   }
   set lineWidth(width) {
      this.ctx.lineWidth = width;
   }

   destroyEvents() {
      this.canvas.onmousemove = null;
      this.canvas.onmousedown = null;
      this.canvas.onmouseup = null;
   }
}
