import './../styles/canvas.scss';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Rect from '../tools/Rect';
import Line from '../tools/Line';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Canvas = observer(() => {
   const { id } = useParams();
   const canvasRef = useRef();
   const usernameRef = useRef();
   const [modal, setModal] = useState(true);

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current);
      axios.get(`http://localhost:5000/image?id=${id}`).then((res) => {
         let ctx = canvasState.canvas.getContext('2d');
         const img = new Image();
         img.src = res.data;
         console.log(res.data);
         img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
         };
      });
   }, []);
   useEffect(() => {
      if (canvasState.username) {
         const socket = new WebSocket('ws://localhost:5000/');
         canvasState.setSocket(socket);
         canvasState.setSessionId(id);
         toolState.setTool(new Brush(canvasRef.current, socket, id));

         socket.onopen = () => {
            socket.send(
               JSON.stringify({
                  method: 'connection',
                  id,
                  username: canvasState.username,
               }),
            );
         };
         socket.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method) {
               case 'connection':
                  console.log(`${msg.username} is conected`);
                  break;
               case 'draw':
                  drawHandler(msg);
                  break;
            }
         };
      }
   }, [modal]);

   const drawHandler = (msg) => {
      const figure = msg.figure;
      const ctx = canvasRef.current.getContext('2d');
      switch (figure.type) {
         case 'brush':
            Brush.draw(ctx, figure.x, figure.y);
            break;
         case 'rect':
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
            break;
         case 'finish':
            ctx.beginPath();
            break;
      }
   };

   function mouseDownHandler() {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
   }
   function mouseUpHandler() {
      axios
         .post(`http://localhost:5000/image?id=${id}`, { img: canvasRef.current.toDataURL() })
         .then((res) => {});
   }

   const connectionHandler = () => {
      canvasState.setUsername(usernameRef.current.value);
      setModal(false);
   };

   return (
      <>
         <Modal show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Введите ваше имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <input ref={usernameRef} type="text" />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={connectionHandler}>
                  Войти
               </Button>
            </Modal.Footer>
         </Modal>
         <div className="canvas">
            <canvas
               onMouseDown={() => mouseDownHandler()}
               onMouseUp={() => mouseUpHandler()}
               ref={canvasRef}
               width={600}
               height={400}
            />
         </div>
      </>
   );
});

export default Canvas;
