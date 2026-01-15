import { FC } from 'react';
import { exitCart } from '../../service/cartService';
//@ts-ignore
import icon from './../../accets/img/cart/box.png';

const CartEmpty: FC = () => {
   return (
      <>
         <div className="cart__other-info other-info-cart">
            <div className="other-info-cart__img">
               <img src={icon} alt="" />
            </div>
            <h3 className="other-info-cart__title">Корзина пустая</h3>
            <div className="other-info-cart__text">
               <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            </div>
            <button
               onClick={() => {
                  exitCart();
               }}
               className="other-info-cart__btn green-btn">
               Вернуться назад
            </button>
         </div>
      </>
   );
};

export default CartEmpty;
