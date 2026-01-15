import { useCallback, useRef } from 'react';

export default function useDebounce(callback: Function, delay: number): any {
   const timer = useRef();

   const debounceedCallback = useCallback(
      (...args: any) => {
         if (timer.current) {
            clearTimeout(timer.current);
         }
         //@ts-ignore
         timer.current = setTimeout(() => {
            callback(...args);
         }, delay);
      },
      [callback, delay],
   );
   return debounceedCallback;
}
