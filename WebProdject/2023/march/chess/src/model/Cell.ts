import { Board } from './Board';
import { Colors } from './Colors';
import { Figure, FigureNames } from './figuers/Figure';
import { King } from './figuers/King';

export class Cell {
   readonly x: number;
   readonly y: number;
   readonly color: Colors;
   figure: Figure | null;
   board: Board;
   available: boolean; //is may move
   id: number; // react keies

   constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
      this.board = board;
      this.x = x;
      this.y = y;
      this.figure = figure;
      this.color = color;
      this.available = false;
      this.id = Math.random();
   }

   isEmpty(): boolean {
      return this.figure === null;
   }

   isEnemy(target: Cell): boolean {
      if (target.figure) {
         return target.figure?.color !== this.figure?.color;
      }
      return false;
   }

   isEmptyVertical(target: Cell): boolean {
      if (this.x !== target.x) {
         return false;
      }

      const min = Math.min(this.y, target.y);
      const max = Math.max(this.y, target.y);

      for (let y = min + 1; y < max; y++) {
         if (!this.board.getCell(this.x, y).isEmpty()) {
            return false;
         }
      }

      return true;
   }
   isEmptyHorizontal(target: Cell): boolean {
      if (this.y !== target.y) {
         return false;
      }

      const min = Math.min(this.x, target.x);
      const max = Math.max(this.x, target.x);

      for (let x = min + 1; x < max; x++) {
         if (!this.board.getCell(x, this.y).isEmpty()) {
            return false;
         }
      }

      return true;
   }
   isEmptyDiagonal(target: Cell): boolean {
      const absX = Math.abs(target.x - this.x);
      const absY = Math.abs(target.y - this.y);
      if (absX !== absY) {
         return false;
      }

      const dy = this.y < target.y ? 1 : -1;
      const dx = this.x < target.x ? 1 : -1;

      for (let i = 1; i < absY; i++) {
         if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
            return false;
         }
      }

      return true;
   }

   setFigure(figure: Figure) {
      this.figure = figure;
      this.figure.cell = this;
   }

   addLostFigure(figure: Figure) {
      figure.color === Colors.BLACK
         ? this.board.lostBlackFigures.push(figure)
         : this.board.lostWhiteFigures.push(figure);
   }

   castling(cell: Cell, target: Cell) {
      if (cell.figure && target.figure) {
         const direction = cell.x < target.x ? 1 : -1;
         const kingPlace = this.board.getCell(cell.x + direction * 2, cell.y);
         kingPlace.setFigure(cell.figure);
         cell.figure = null;
         const rookPlace = this.board.getCell(kingPlace.x - direction, kingPlace.y);
         rookPlace.setFigure(target.figure);
         target.figure = null;
         kingPlace.figure?.moveFigure(kingPlace);
         rookPlace.figure?.moveFigure(rookPlace);
      }
   }

   moveFigure(target: Cell) {
      if (this.figure && this.figure?.canMove(target)) {
         if (
            target.figure?.name === FigureNames.ROOK &&
            target.figure?.color === this.figure.color
         ) {
            this.castling(this, target);
            return;
         }
         //this.figure.moveFigure(target);
         if (target.figure) {
            this.addLostFigure(target.figure);
         }
         target.setFigure(this.figure);
         this.figure = null;
         target.figure?.moveFigure(target);
      }
   }
}
