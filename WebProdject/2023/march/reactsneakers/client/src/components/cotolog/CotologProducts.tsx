import { FC } from 'react';
import { ICotologProducts } from '../../types/ICotologProducts';
import CotologProduct from './CotologProduct';
import CotologProductSceleton from './CotologProductSceleton';

const CotologProducts: FC<ICotologProducts> = ({ products, disabled }) => {
   if (!products.length) {
      return (
         <div className="cotolog__products">
            {[1, 2, 3, 4].map((el, i) => (
               <CotologProductSceleton key={i} />
            ))}
         </div>
      );
   }

   return (
      <div className="cotolog__products">
         {products.map((product) => (
            <CotologProduct key={product.id} product={product} disabled={disabled} />
         ))}
      </div>
   );
};

export default CotologProducts;
