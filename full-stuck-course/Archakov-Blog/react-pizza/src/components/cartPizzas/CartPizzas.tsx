import CartPizza from './CartPizza';
import { useSelector } from 'react-redux';
import { selectorCart } from '../../redux/slices/cartSlice';
import React, { useEffect } from 'react';

const CartPizzas: React.FC = () => {
   const { allPizzas } = useSelector(selectorCart());

   useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(allPizzas));
      console.log(localStorage.getItem('cart'));
   }, [allPizzas]);

   return (
      <div className="content__items">
         {Object.entries(allPizzas).map((pizza, i) => (
            <CartPizza key={i} pizza={pizza[0]} count={pizza[1]} />
         ))}
      </div>
   );
};

export default CartPizzas;
