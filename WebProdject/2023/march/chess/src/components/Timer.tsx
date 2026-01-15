import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Colors } from '../model/Colors';
import { Player } from '../model/Player';

interface TimerProps {
   currentPlayer: Player | null;
   restart: () => void;
   setIsMate: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, setIsMate }) => {
   const [blackTime, setBlackTime] = useState(300);
   const [whiteTime, setWhiteTime] = useState(300);
   const timer = useRef<null | ReturnType<typeof setInterval>>(null);

   useEffect(() => {
      startTimer();
   }, [currentPlayer, currentPlayer?.isCheck, currentPlayer?.isMate]);

   function startTimer() {
      clearTime();
      const callback =
         currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
      timer.current = setInterval(callback, 1000);
   }
   function clearTime() {
      if (timer.current) {
         clearInterval(timer.current);
      }
   }
   function decrementBlackTimer() {
      setBlackTime((prev) => prev - 1);
   }
   function decrementWhiteTimer() {
      setWhiteTime((prev) => prev - 1);
   }

   function handleRestart() {
      setWhiteTime(300);
      setBlackTime(300);
      restart();
   }
   function checkLose() {
      if (currentPlayer?.isCheck && currentPlayer?.isMate) {
         clearTime();
      }

      if (!blackTime || !whiteTime) {
         clearTime();
         if (currentPlayer) {
            currentPlayer.isCheck = true;
            currentPlayer.isMate = true;
         }
         setIsMate();
      }
   }
   checkLose();

   return (
      <div>
         <div>
            <button onClick={handleRestart}>Restart game</button>
         </div>
         <h2>Черные - {blackTime}</h2>
         <h2>Белые - {whiteTime}</h2>
      </div>
   );
};

export default Timer;
