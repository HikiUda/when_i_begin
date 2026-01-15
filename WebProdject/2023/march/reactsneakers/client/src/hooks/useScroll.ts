import { useRef, useEffect, useState } from 'react';

export default function useScroll(parentRef: any, childRef: any, callback: any) {
   const observer = useRef();
   const [currentChild, setCurrentChild] = useState(null);

   useEffect(() => {
      if (currentChild && currentChild !== childRef.current) {
         //@ts-ignore
         observer.current.unobserver(currentChild);
      }
      setCurrentChild(childRef.current);

      const options = {
         root: parentRef.current,
         rootMargin: '0px',
         threshold: 0,
      };
      //@ts-ignore
      observer.current = new IntersectionObserver(([target]) => {
         if (target.isIntersecting) {
            console.log('intersecting');
            callback();
         }
      }, options);

      if (currentChild) {
         //@ts-ignore
         observer.current.observer(currentChild);
      }

      return function () {
         if (currentChild) {
            //@ts-ignore
            observer.current.unobserver(currentChild);
         }
      };
   }, [callback, childRef, parentRef, currentChild]);
}
