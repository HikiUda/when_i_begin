import React from 'react';
import { categories } from '../../helpers/pizzes';

type CategoriesProps = { onChangeCategory: (category: string) => void; currentCategory: string };

const Categories: React.FC<CategoriesProps> = ({ onChangeCategory, currentCategory }) => {
   return (
      <div className="categories">
         <ul>
            {categories.map((category) => {
               return (
                  <li
                     key={category}
                     onClick={() => onChangeCategory(category)}
                     className={category === currentCategory ? 'active' : ''}>
                     {category}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Categories;
