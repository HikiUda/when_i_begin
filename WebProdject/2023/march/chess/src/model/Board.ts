import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figuers/Bishop';
import { Figure, FigureNames } from './figuers/Figure';
import { King } from './figuers/King';
import { Knight } from './figuers/Knight';
import { Pawn } from './figuers/Pawn';
import { Queen } from './figuers/Queen';
import { Rook } from './figuers/Rook';
import { Player } from './Player';

export class Board {
   cells: Cell[][] = [];
   lostBlackFigures: Figure[] = [];
   lostWhiteFigures: Figure[] = [];
   blackKing: King | null = null;
   whiteKing: King | null = null;

   public initCells() {
      for (let i = 0; i < 8; i++) {
         const row: Cell[] = [];
         for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 !== 0) {
               row.push(new Cell(this, j, i, Colors.BLACK, null)); // Black cell
            } else {
               row.push(new Cell(this, j, i, Colors.WHITE, null)); // White cell
            }
         }
         this.cells.push(row);
      }
   }

   public highlightCells(selectedCell: Cell | null) {
      for (let i = 0; i < this.cells.length; i++) {
         const row = this.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target = row[j];
            if (target.figure?.name === FigureNames.KING) {
               if (target.available) {
                  target.available = false;
                  continue;
               }
            }
            target.available = !!selectedCell?.figure?.canMove(target);
         }
      }
   }

   isMate(king: King, attackFigure: Cell): boolean {
      for (let i = 0; i < this.cells.length; i++) {
         const row = this.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target = row[j];
            if (king.canMove(target)) {
               return false;
            }
         }
      }

      if (this.cellIsAttack(attackFigure, attackFigure)) {
         return false;
      }

      if (
         attackFigure.figure?.name === FigureNames.KNIGHT ||
         attackFigure.figure?.name === FigureNames.PAWN
      ) {
         console.log(attackFigure.figure);
         return true;
      }
      if (king.cell.x === attackFigure.x) {
         const min = Math.min(king.cell.y, attackFigure.y);
         const max = Math.max(king.cell.y, attackFigure.y);
         for (let y = min + 1; y < max; y++) {
            const cell = attackFigure.board.getCell(king.cell.x, y);

            if (this.cellIsAttack(cell, attackFigure)) {
               return false;
            }
         }
      }

      if (king.cell.y === attackFigure.y) {
         const min = Math.min(king.cell.x, attackFigure.x);
         const max = Math.max(king.cell.x, attackFigure.x);
         for (let x = min + 1; x < max; x++) {
            const cell = attackFigure.board.getCell(x, king.cell.y);

            if (this.cellIsAttack(cell, attackFigure)) {
               return false;
            }
         }
      }
      const absX = Math.abs(king.cell.x - attackFigure.x);
      const absY = Math.abs(king.cell.y - attackFigure.y);
      if (absX === absY) {
         const dy = attackFigure.y < king.cell.y ? 1 : -1;
         const dx = attackFigure.x < king.cell.x ? 1 : -1;

         for (let i = 1; i < absY; i++) {
            const cell = attackFigure.board.getCell(
               attackFigure.x + dx * i,
               attackFigure.y + dy * i,
            );
            if (this.cellIsAttack(cell, attackFigure)) {
               return false;
            }
         }
      }

      return true;
   }

   cellIsAttack(cell: Cell, attackFigure: Cell): boolean {
      for (let i = 0; i < this.cells.length; i++) {
         const row = this.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target = row[j];
            if (!target.figure) {
               continue;
            }
            if (attackFigure.figure && attackFigure.figure.color === target.figure?.color) {
               continue;
            }
            if (attackFigure.board.isCheckCell(cell, target)) {
               return true;
            }
         }
      }
      return false;
   }

   kingIsUnderAttack(whitePlayer: Player | null, blackPlayer: Player | null) {
      for (let i = 0; i < this.cells.length; i++) {
         const row = this.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target = row[j];

            if (this.isCheck(this.blackKing, target)) {
               if (this.blackKing) {
                  this.blackKing.cell.available = true;
                  if (blackPlayer && this.isMate(this.blackKing, target)) {
                     blackPlayer.isMate = true;
                  }
               }
            }
            if (this.isCheck(this.whiteKing, target)) {
               if (this.whiteKing) {
                  this.whiteKing.cell.available = true;
                  if (whitePlayer && this.isMate(this.whiteKing, target)) {
                     whitePlayer.isMate = true;
                  }
               }
            }
         }
      }
      if (whitePlayer && blackPlayer) {
         if (this.whiteKing?.cell.available) {
            whitePlayer.isCheck = true;
         } else {
            whitePlayer.isCheck = false;
         }
         if (this.blackKing?.cell.available) {
            blackPlayer.isCheck = true;
         } else {
            blackPlayer.isCheck = false;
         }
      }
   }
   isCheck(king: Figure | null, target: Cell): boolean {
      if (!king) {
         return false;
      }
      if (!target.figure) {
         return false;
      }
      if (king?.color === target.figure?.color) {
         return false;
      }
      if (target.figure?.name === FigureNames.KING) {
         return false;
      }
      if (this.isCheckCell(king.cell, target)) {
         return true;
      }

      return false;
   }

   isCheckCell(cell: Cell, target: Cell): boolean {
      if (cell.isEmptyVertical(target)) {
         if (
            target.figure?.name === FigureNames.ROOK ||
            target.figure?.name === FigureNames.QUEEN
         ) {
            //console.log('w1');
            return true;
         }
      }
      if (cell.isEmptyHorizontal(target)) {
         if (
            target.figure?.name === FigureNames.ROOK ||
            target.figure?.name === FigureNames.QUEEN
         ) {
            //console.log('w2');
            return true;
         }
      }
      if (cell.isEmptyDiagonal(target)) {
         if (
            target.figure?.name === FigureNames.BISHOP ||
            target.figure?.name === FigureNames.QUEEN
         ) {
            //console.log('w3');
            return true;
         }
      }
      const direction = target.figure?.color === Colors.BLACK ? 1 : -1;

      if (cell.y === target.y + direction && (cell.x === target.x + 1 || cell.x === target.x - 1)) {
         if (target.figure?.name === FigureNames.PAWN) {
            //console.log('w4');
            return true;
         }
      }
      if (target.figure?.name === FigureNames.KNIGHT) {
         const dx = Math.abs(cell.x - target.x);
         const dy = Math.abs(cell.y - target.y);
         if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
            //console.log('w5');
            return true;
         }
      }
      return false;
   }

   isClearCheck(cell: Cell, target: Cell): boolean {
      if (!cell.figure) {
         return false;
      }
      const newBoard = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

      const color = cell.figure?.color;

      const temporaryCell = new Cell(newBoard, 9, 9, Colors.BLACK, target.figure);
      target.figure = cell.figure;
      target.figure.cell = target;
      cell.figure = null;

      if (newBoard.whiteKing && newBoard.blackKing) {
         newBoard.whiteKing.cell.available = false;
         newBoard.blackKing.cell.available = false;
      }

      newBoard.kingIsUnderAttack(null, null);

      if (
         (newBoard.whiteKing?.cell.available && newBoard.whiteKing?.color === color) ||
         (newBoard.blackKing?.cell.available && newBoard.blackKing?.color === color)
      ) {
         cell.figure = target.figure;
         cell.figure.cell = cell;
         target.figure = temporaryCell.figure;
         return false;
      }
      cell.figure = target.figure;
      cell.figure.cell = cell;
      target.figure = temporaryCell.figure;
      return true;
   }

   public getCopyBoard(): Board {
      const newBoard = new Board();
      newBoard.cells = this.cells;
      newBoard.lostBlackFigures = this.lostBlackFigures;
      newBoard.lostWhiteFigures = this.lostWhiteFigures;
      newBoard.blackKing = this.blackKing;
      newBoard.whiteKing = this.whiteKing;
      return newBoard;
   }

   public getCell(x: number, y: number) {
      return this.cells[y][x];
   }

   private addPawns() {
      for (let i = 0; i < 8; i++) {
         new Pawn(Colors.BLACK, this.getCell(i, 1));
         new Pawn(Colors.WHITE, this.getCell(i, 6));
      }
   }
   private addKings() {
      this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
      this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
   }
   private addKnights() {
      new Knight(Colors.BLACK, this.getCell(1, 0));
      new Knight(Colors.BLACK, this.getCell(6, 0));
      new Knight(Colors.WHITE, this.getCell(6, 7));
      new Knight(Colors.WHITE, this.getCell(1, 7));
   }
   private addQueens() {
      new Queen(Colors.BLACK, this.getCell(3, 0));
      new Queen(Colors.WHITE, this.getCell(3, 7));
   }
   private addBishops() {
      new Bishop(Colors.BLACK, this.getCell(2, 0));
      new Bishop(Colors.BLACK, this.getCell(5, 0));
      new Bishop(Colors.WHITE, this.getCell(5, 7));
      new Bishop(Colors.WHITE, this.getCell(2, 7));
   }
   private addRooks() {
      new Rook(Colors.BLACK, this.getCell(0, 0));
      new Rook(Colors.BLACK, this.getCell(7, 0));
      new Rook(Colors.WHITE, this.getCell(7, 7));
      new Rook(Colors.WHITE, this.getCell(0, 7));
   }

   public addFigures() {
      this.addPawns();
      this.addKings();
      this.addKnights();
      this.addQueens();
      this.addBishops();
      this.addRooks();
   }
}
