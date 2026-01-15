import { useState } from 'react';

const TableOfTasck = () => {
   const [boards, setBoards] = useState([
      {
         id: 1,
         title: 'Сделать',
         items: [
            { id: 1, title: 'Пойти в магазин' },
            { id: 2, title: 'Выкинуть мусор' },
            { id: 3, title: 'Покушать' },
         ],
      },
      {
         id: 2,
         title: 'Проверить',
         items: [
            { id: 4, title: 'Код ревью' },
            { id: 5, title: 'Задача на факториал' },
            { id: 6, title: 'Задачи на фибоначи' },
         ],
      },
      {
         id: 3,
         title: 'Сделано',
         items: [
            { id: 7, title: 'Снять видео' },
            { id: 8, title: 'Смонтировать' },
            { id: 9, title: 'Отрендерить' },
         ],
      },
   ]);

   const [currentBoard, setCurrentBoard] = useState(null);
   const [currentItem, setCurrentItem] = useState(null);

   function dragStartHandler(e, board, item) {
      setCurrentBoard(board);
      setCurrentItem(item);
   }
   function dragOverHandler(e) {
      e.preventDefault();
      if (e.target.className == 'item') {
         e.target.style.boxShadow = '0 2px 3px gray';
      }
   }
   function dragLeaveHandler(e) {
      e.target.style.boxShadow = 'none';
   }
   function dragEndHandler(e) {
      e.target.style.boxShadow = 'none';
   }
   function droptHandler(e, board, item) {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      const dropIndex = board.items.indexOf(item);
      board.items.splice(dropIndex + 1, 0, currentItem);
      setBoards(
         boards.map((b) => {
            if (b.id === board.id) {
               return board;
            }
            if (b.id === currentBoard.id) {
               return currentBoard;
            }
            return b;
         }),
      );
   }
   function dropItemHandler(e, board) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      setBoards(
         boards.map((b) => {
            if (b.id === board.id) {
               return board;
            }
            if (b.id === currentBoard.id) {
               return currentBoard;
            }
            return b;
         }),
      );
   }

   return (
      <div className="app">
         {boards.map((board) => {
            return (
               <div
                  key={board.id}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropItemHandler(e, board)}
                  className="board">
                  <h3 className="board__title">{board.title}</h3>
                  {board.items.map((item) => {
                     return (
                        <div
                           key={item.id}
                           onDragEnd={(e) => dragEndHandler(e)}
                           onDragStart={(e) => dragStartHandler(e, board, item)}
                           onDragLeave={(e) => dragLeaveHandler(e)}
                           onDragOver={(e) => dragOverHandler(e)}
                           onDrop={(e) => droptHandler(e, board, item)}
                           draggable={true}
                           className="item">
                           {item.title}
                        </div>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default TableOfTasck;
