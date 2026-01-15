function showCart() {
   const cartBtn = document.querySelector('.header__cart-btn');
   const cart = document.querySelector('.cart');
   const cartMask = document.querySelector('.cart__mask');
   console.log(cartBtn, cart, cartMask);

   if (cart && cartMask && cartBtn) {
      cartBtn.addEventListener('click', (e) => {
         document.body.classList.toggle('_lock');
         cart.classList.toggle('_active');
         cartMask.classList.toggle('_active');
      });
      cartMask.addEventListener('click', (e) => {
         document.body.classList.toggle('_lock');
         cart.classList.toggle('_active');
         cartMask.classList.toggle('_active');
      });
      console.log(cartBtn, cart, cartMask);
   }
}

showCart();
