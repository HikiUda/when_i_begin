import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import useDebounce from '../../hooks/useDebounce';
import { fetchSneakers } from '../../store/actionCreateions/productsCreations';
import { changeSearch, resetProducts } from '../../store/slices/productsSlice';

import CotologProducts from '../cotolog/CotologProducts';

const Cotolog: FC = () => {
   const dispatch = useAppDispatch();
   const { products, limit, page, search } = useAppSelector((state) => state.products);
   const [searchValue, setSearchValue] = useState('');

   const debounced = useDebounce(searchRequest, 1000);

   function searchRequest(value: string) {
      dispatch(changeSearch(value));
      dispatch(resetProducts());
      dispatch(fetchSneakers({ limit, page: 1, search: value }));
   }

   useEffect(() => {
      dispatch(fetchSneakers({ limit, page, search }));

      return () => {
         dispatch(resetProducts());
      };
   }, [limit, dispatch]);

   function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
      setSearchValue(e.target.value);
      debounced(e.target.value);
   }

   return (
      <section className="cotolog">
         <div className="cotolog__container __container">
            <div className="cotolog__header-all-products">
               <h2 className="cotolog__title">Все кроссовки</h2>
               <form className="cotolog__search">
                  <svg
                     width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
                        stroke="#E4E4E4"
                        strokeWidth="2"
                        strokeLinecap="round"
                     />
                  </svg>
                  <input
                     value={searchValue}
                     onChange={handleChangeSearch}
                     type="text"
                     placeholder="Поиск..."
                  />
               </form>
            </div>
            <CotologProducts products={products} disabled={false} />
            <button onClick={() => dispatch(fetchSneakers({ limit, page, search }))}>Fetch</button>
         </div>
      </section>
   );
};

export default Cotolog;
