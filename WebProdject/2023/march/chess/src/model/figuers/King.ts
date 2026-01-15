import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
   constructor(color: Colors, cell: Cell) {
      super(color, cell);
      this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
      this.name = FigureNames.KING;
   }

   cellIsAttack(cell: Cell): boolean {
      for (let i = 0; i < this.cell.board.cells.length; i++) {
         const row = this.cell.board.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target2 = row[j];
            if (this.color === target2.figure?.color || !target2.figure) {
               continue;
            }

            if (this.cell.board.isCheckCell(cell, target2)) {
               console.log(cell);

               return true;
            }
         }
      }
      return false;
   }

   canMove(target: Cell): boolean {
      if (!super.canMove(target)) {
         return false;
      }
      if (target.figure?.name === FigureNames.ROOK && target.figure?.color === this.color) {
         if (!target.figure?.isFirstStep || !this.isFirstStep) {
            return false;
         }

         for (let i = 0; i < this.cell.board.cells.length; i++) {
            const row = this.cell.board.cells[i];
            for (let j = 0; j < row.length; j++) {
               const target2 = row[j];
               if (this.cell.board.isCheck(this, target2)) {
                  return false;
               }
            }
         }
         const min = Math.min(this.cell.x, target.x);
         const max = Math.max(this.cell.x, target.x);
         for (let x = min + 1; x < max; x++) {
            const cell = this.cell.board.getCell(x, this.cell.y);
            if (!cell.isEmpty()) {
               return false;
            }
            if (this.cellIsAttack(cell)) {
               return false;
            }
         }
         return true;
      }

      const dx = Math.abs(this.cell.x - target.x);
      const dy = Math.abs(this.cell.y - target.y);

      if (dx <= 1 && dy <= 1) {
         if (target.figure) {
            return true;
         }
         if (this.cellIsAttack(target)) {
            return false;
         }

         return true;
      }

      return false;
   }
}
