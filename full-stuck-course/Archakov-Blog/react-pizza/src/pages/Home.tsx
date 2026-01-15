import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/base/Categories';
import SortPizza, { CurrentSortEl } from '../components/base/SortPizza';
import BlockPizzes from '../components/card/BlockPizzes';
import {
   setCurrentCategory,
   setCurrentSortEl,
   setInitParams,
   SetParams,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import { categories } from '../helpers/pizzes';
import { RootState, useAppDispatch } from '../redux/store';
import { initCartFromLC } from '../redux/slices/cartSlice';

const Home = () => {
   const dispatch = useAppDispatch();
   const { currentCategory, currentSortEl, searchValue } = useSelector(
      (state: RootState) => state.filter,
   );
   const { pizzas: listPizzas, status: satusPizza } = useSelector(
      (state: RootState) => state.pizzas,
   );

   const navigate = useNavigate();

   let isSearch = useRef(false);
   let isMounted = useRef(false);

   const getPizzas = () => {
      const byCategory = categories.indexOf(currentCategory)
         ? 'category=' + categories.indexOf(currentCategory)
         : '';
      const order = `&order=${currentSortEl.sortValue.includes('-') ? 'asc' : 'desc'}`;
      const sortBy = '&sortBy=' + currentSortEl.sortValue.replace('-', '');
      const searchBy = searchValue ? `&search=${searchValue}` : '';

      dispatch(fetchPizzas({ byCategory, sortBy, searchBy, order }));
   };

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1)) as SetParams;
         console.log(params);
         dispatch(setInitParams(params));
         if (params.byCategory === 'Все') {
            return;
         }
         isSearch.current = true;
      }
   }, [dispatch]);

   useEffect(() => {
      if (!isSearch.current) {
         getPizzas();
      }
      isSearch.current = false;
   }, [currentCategory, currentSortEl.sortValue, searchValue]);

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            byCategory: currentCategory,
            sortBy: currentSortEl.sortValue,
            searchBy: searchValue,
         });
         navigate(`?${queryString}`);
      } else {
         const dataCart = localStorage.getItem('cart');
         if (dataCart) {
            const cart = JSON.parse(dataCart);
            if (cart) {
               console.log(cart);
               dispatch(initCartFromLC(cart));
            }
         }
      }
      isMounted.current = true;
   }, [currentCategory, currentSortEl.sortValue, searchValue, navigate, dispatch]);

   return (
      <div className="content">
         <div className="container">
            <div className="content__top">
               <Categories
                  currentCategory={currentCategory}
                  onChangeCategory={(catg: string) => dispatch(setCurrentCategory(catg))}
               />
               <SortPizza
                  currentSortEl={currentSortEl}
                  onChangeSort={(el: CurrentSortEl) => dispatch(setCurrentSortEl(el))}
               />
            </div>
            <BlockPizzes listPizzas={listPizzas} isLoading={satusPizza} />
         </div>
      </div>
   );
};

export default Home;
