import React from 'react';
import NotFoundElement from '../NotFoundElment/NotFoundElment';
import PizzaBlock from './PizzaCard';
import PizzaSceleton from './PizzaSceleton';

export type ObjPizza = {
   id: string;
   imageUrl: string;
   title: string;
   types: string[];
   sizes: number[];
   price: number;
   category: number;
   rating: number;
};

type BlockPizzesProps = {
   listPizzas: ObjPizza[];
   isLoading: string;
};

const BlockPizzes: React.FC<BlockPizzesProps> = ({ listPizzas, isLoading }) => {
   return (
      <>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading === 'pending' ? (
               [...new Array(6)].map((_, i) => <PizzaSceleton key={i} />)
            ) : isLoading === 'fulfilled' ? (
               listPizzas.map((pizza, index) => <PizzaBlock key={index} pizza={pizza} />)
            ) : (
               <NotFoundElement />
            )}
         </div>
      </>
   );
};

export default BlockPizzes;
