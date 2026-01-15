import { findAllByDisplayValue } from '@testing-library/react';
import { useEffect, useRef, useState } from 'react';

import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './model/Board';
import { Colors } from './model/Colors';
import { Player } from './model/Player';

function App() {
   const [board, setBoard] = useState(new Board());
   const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
   const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
   const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
   const [lose, setLose] = useState(false);

   useEffect(() => {
      restart();
      setCurrentPlayer(whitePlayer);
   }, []);

   function setIsMate() {
      setLose(true);
   }

   function restart() {
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      setBoard(newBoard);
      setWhitePlayer(new Player(Colors.WHITE));
      setBlackPlayer(new Player(Colors.BLACK));
      setCurrentPlayer(whitePlayer);
   }

   function swapPlayer() {
      setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
   }

   return (
      <div className="app">
         <Timer currentPlayer={currentPlayer} restart={restart} setIsMate={setIsMate} />
         <BoardComponent
            board={board}
            setBoard={setBoard}
            whitePlayer={whitePlayer}
            blackPlayer={blackPlayer}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
         />
         <div>
            <LostFigures title={Colors.BLACK} figures={board.lostBlackFigures} />
            <LostFigures title={Colors.WHITE} figures={board.lostWhiteFigures} />
         </div>
      </div>
   );
}

export default App;
