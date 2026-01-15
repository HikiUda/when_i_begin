import { FC } from 'react';
import { Cell } from '../model/Cell';
import { FigureNames } from '../model/figuers/Figure';

interface CellProps {
   cell: Cell;
   selected: boolean;
   click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
   return (
      <div
         className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
         onClick={() => click(cell)}
         style={{
            background:
               cell.available && cell.figure
                  ? cell.figure.name === FigureNames.KING
                     ? 'red'
                     : 'green'
                  : '',
         }}>
         {cell.available && !cell.figure && <div className="available"></div>}
         {cell.figure?.logo && <img src={cell.figure.logo} alt="img" />}
      </div>
   );
};

export default CellComponent;
