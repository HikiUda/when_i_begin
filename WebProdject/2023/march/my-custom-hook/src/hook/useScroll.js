import { useRef, useEffect, useState } from 'react';

export default function useScroll(parentRef, childRef, callback) {
   const observer = useRef();
   const [currentChild, setCurrentChild] = useState(null);

   useEffect(() => {
      if (currentChild && currentChild !== childRef.current) {
         observer.current.unobserve(currentChild);
      }
      setCurrentChild(childRef.current);

      const options = {
         root: parentRef.current,
         rootMargin: '0px',
         threshold: 0,
      };
      observer.current = new IntersectionObserver(([target]) => {
         if (target.isIntersecting) {
            console.log('intersected');
            callback();
         }
      }, options);

      if (currentChild) {
         observer.current.observe(currentChild);
      }

      return function () {
         if (currentChild) {
            observer.current.unobserve(currentChild);
         }
      };
   }, [callback, childRef, parentRef, currentChild]);
}
