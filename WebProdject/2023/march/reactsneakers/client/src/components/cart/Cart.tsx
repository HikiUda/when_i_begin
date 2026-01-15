import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { fetchCartSneakers } from '../../store/actionCreateions/cartCreation';
import { changeCheckout } from '../../store/slices/cartSlice';
import useInitCart from './../../hooks/useInitCart';
import CartCheckout from './CartCheckout';
import CartEmpty from './CartEmpty';
import CartFull from './CartFull';

const Cart: FC = () => {
   const dispatch = useAppDispatch();
   const { products, checkout, isLoading } = useAppSelector((state) => state.cart);

   useEffect(() => {
      if (checkout) {
         fetchCartSneakers();
         setTimeout(() => {
            dispatch(changeCheckout());
         }, 5000);
      } else {
         dispatch(fetchCartSneakers());
      }
   }, [dispatch, checkout]);

   useInitCart();

   return (
      <div className="cart">
         <h2 className="cart__title">Корзина</h2>
         {isLoading ? (
            <h3>Loading...</h3>
         ) : checkout ? (
            <CartCheckout />
         ) : products.length ? (
            <CartFull />
         ) : (
            <CartEmpty />
         )}
      </div>
   );
};

export default Cart;
