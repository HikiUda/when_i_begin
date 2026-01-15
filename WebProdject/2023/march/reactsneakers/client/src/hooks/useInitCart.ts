import { useEffect } from 'react';

export default function useInitCart() {
   useEffect(() => {
      const cartBtn = document.querySelector('.header__cart-btn');
      const cart = document.querySelector('.cart');
      const cartMask = document.querySelector('.cart__mask');
      function toggleCart(e: any) {
         document.body.classList.toggle('_lock');
         cart?.classList.toggle('_active');
         cartMask?.classList.toggle('_active');
      }

      function initCart() {
         //console.log(45);
         //console.log(cart, cartBtn, cartMask);

         if (cart && cartMask && cartBtn) {
            cartBtn.addEventListener('click', toggleCart);
            cartMask.addEventListener('click', toggleCart);
         }
      }
      function removeCart() {
         //console.log(67);
         if (cart && cartMask && cartBtn) {
            cartBtn.removeEventListener('click', toggleCart);
            cartMask.removeEventListener('click', toggleCart);
         }
      }
      initCart();

      return () => {
         removeCart();
      };
   }, []);
}
