import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPizza } from '../../redux/slices/cartSlice';
import { ObjPizza } from './BlockPizzes';

const PizzaBlock: React.FC<{ pizza: ObjPizza }> = ({ pizza }) => {
   let { price, sizes, types, imageUrl: img, title, id } = pizza;

   const dispatch = useDispatch();

   let [currentTypePizza, setCurrentTypePizza] = useState(types[0]);
   let [currentSizePizza, setCurrentSizePizza] = useState(sizes[0]);

   function preAddPizza() {
      const mapID = [title, price, currentTypePizza, currentSizePizza, img].join(',');
      dispatch(addPizza(mapID));
   }

   function chooseTypePizza(piz: any) {
      setCurrentTypePizza(piz);
   }
   function chooseSizePizza(piz: any) {
      setCurrentSizePizza(piz);
   }
   const link = `/pizza/${id}`;

   return (
      <div className="pizza-block">
         <Link to={link}>
            <img className="pizza-block__image" src={img} alt="Pizza" />
         </Link>

         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types.map((type: string) => {
                  return (
                     <li
                        key={type}
                        onClick={() => chooseTypePizza(type)}
                        className={type === currentTypePizza ? 'active' : ''}>
                        {type}
                     </li>
                  );
               })}
            </ul>
            <ul>
               {sizes.map((size: number) => {
                  return (
                     <li
                        key={size}
                        onClick={() => chooseSizePizza(size)}
                        className={size === currentSizePizza ? 'active' : ''}>
                        {size}
                     </li>
                  );
               })}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <button onClick={preAddPizza} className="button button--outline button--add">
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Добавить</span>
               {/* <i>{countPizza}</i> */}
            </button>
         </div>
      </div>
   );
};

export default PizzaBlock;
