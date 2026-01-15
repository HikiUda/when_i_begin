import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
   fetchPurchesSneakers,
   postPurchesSneakers,
} from '../../store/actionCreateions/purchesCreation';
import { resetCartPoductsCheckout } from '../../store/slices/cartSlice';

import CartCard from './CartCard';

const CartFull: FC = () => {
   const dispatch = useAppDispatch();
   const { totalPrice, tax, products } = useAppSelector((state) => state.cart);

   async function buyAllProducts() {
      await dispatch(postPurchesSneakers(products));
      dispatch(resetCartPoductsCheckout());
      dispatch(fetchPurchesSneakers());
   }

   return (
      <>
         <div className="cart__cart-catalog">
            {products.map((product) => (
               <CartCard key={product.id} product={product} />
            ))}
         </div>
         <div className="cart__info">
            <div className="cart__info-place">
               <span>Итого: </span>
               <span>{totalPrice} руб.</span>
            </div>
            <div className="cart__info-place">
               <span className="cart__info-name">Налог 5%:</span>
               <span className="cart__info-total">{tax} руб.</span>
            </div>
            <button onClick={buyAllProducts} className="cart__checkout-btn green-btn">
               Оформить заказ
            </button>
         </div>
      </>
   );
};

export default CartFull;
