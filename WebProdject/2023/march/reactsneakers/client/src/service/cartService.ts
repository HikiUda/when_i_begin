import axios from 'axios';
import { IProducts } from '../helpers/products';

export const exitCart = () => {
   const cart = document.querySelector('.cart');
   const cartMask = document.querySelector('.cart__mask');

   if (cart && cartMask) {
      document.body.classList.toggle('_lock');
      cart?.classList.toggle('_active');
      cartMask?.classList.toggle('_active');
   }
};

export async function putSneakers(c: boolean, l: boolean, product: IProducts) {
   try {
      const res = await axios.put(`http://localhost:5000/api/sneakers/${product.id}`, {
         ...product,
         inCart: c,
         isLiked: l,
      });
      //console.log(res);
   } catch (e) {
      console.log(e);
   }
}
