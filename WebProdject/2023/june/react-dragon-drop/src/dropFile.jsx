import { useState } from 'react';

const DropFile = () => {
   const [drag, setDrag] = useState(false);

   function dragOverHandler(e) {
      e.preventDefault();
      setDrag(true);
   }
   function dragLeaveHandler(e) {
      setDrag(false);
   }
   function dropHandler(e) {
      e.preventDefault();
      let files = [...e.dataTransfer.files];
      //send files
      console.log(files);
      setDrag(false);
   }

   return (
      <div className="app">
         {drag ? (
            <div
               onDragStart={(e) => dragOverHandler(e)}
               onDragOver={(e) => dragOverHandler(e)}
               onDragLeave={(e) => dragLeaveHandler(e)}
               onDrop={(e) => dropHandler(e)}
               className="drop_area">
               Отпустите файлыб чтобы загрузить их
            </div>
         ) : (
            <div
               onDragStart={(e) => dragOverHandler(e)}
               onDragOver={(e) => dragOverHandler(e)}
               onDragLeave={(e) => dragLeaveHandler(e)}>
               Перетащите файлы, чтобы загрузить их
            </div>
         )}
      </div>
   );
};

export default DropFile;
