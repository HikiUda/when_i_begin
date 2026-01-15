import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Board } from '../model/Board';
import { Cell } from '../model/Cell';
import { FigureNames } from '../model/figuers/Figure';
import { Player } from '../model/Player';
import CellComponent from './CellComponent';

interface BoardProps {
   board: Board;
   setBoard: (board: Board) => void;
   currentPlayer: Player | null;
   whitePlayer: Player | null;
   blackPlayer: Player | null;

   swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
   board,
   setBoard,
   swapPlayer,
   currentPlayer,
   whitePlayer,
   blackPlayer,
}) => {
   const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

   function click(cell: Cell) {
      if (currentPlayer?.isMate) {
         console.log(currentPlayer.color, 'lose');
         return;
      }
      if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
         if (currentPlayer?.isCheck && selectedCell.figure?.name !== FigureNames.KING) {
            if (board.isClearCheck(selectedCell, cell)) {
               //console.log('1');
               currentPlayer.isCheck = false;
            } else {
               //console.log('2');
               return;
            }
         } else if (!board.isClearCheck(selectedCell, cell)) {
            return;
         }
         //console.log('3');
         selectedCell.moveFigure(cell);
         swapPlayer();
         setSelectedCell(null);
      } else if (cell.figure) {
         //console.log('4');
         if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
         }
      }
   }

   useEffect(() => {
      highlightCells();
   }, [selectedCell]);

   function highlightCells() {
      board.highlightCells(selectedCell);
      board.kingIsUnderAttack(whitePlayer, blackPlayer);
      updateBoard();
   }

   function updateBoard() {
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
   }

   return (
      <div>
         {currentPlayer?.isCheck && currentPlayer.isMate ? (
            <h2>Player {currentPlayer?.color} lose</h2>
         ) : (
            <h2>Ход за {currentPlayer?.color}</h2>
         )}
         <div className="board">
            {board.cells.map((row, index) => (
               <React.Fragment key={index}>
                  {row.map((cell) => (
                     <CellComponent
                        key={cell.id}
                        cell={cell}
                        click={click}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                     />
                  ))}
               </React.Fragment>
            ))}
         </div>
      </div>
   );
};

export default BoardComponent;
