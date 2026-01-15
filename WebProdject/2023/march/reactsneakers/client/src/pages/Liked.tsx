import { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import CotologProducts from '../components/cotolog/CotologProducts';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import EmptyPage from './EmptyPage';
//@ts-ignore
import smile from './../accets/img/smalic/sad.png';
import { fetchLikedSneakers } from '../store/actionCreateions/likedCreation';

const Liked: FC = () => {
   const dispatch = useAppDispatch();
   const { products, isLoading } = useAppSelector((state) => state.liked);

   useEffect(() => {
      dispatch(fetchLikedSneakers());
   }, [dispatch]);

   if (!products.length && !isLoading) {
      return (
         <EmptyPage
            text={['Вы ничего не добавляли в закладки']}
            title={'Закладок нет :('}
            img={smile}
         />
      );
   }

   return (
      <main className="main">
         <section className="person-store">
            <div className="person-store__container __container">
               <div className="person-store__header">
                  <Link to="/" className="person-store__exit">
                     <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                           x="0.5"
                           y="0.5"
                           width="34"
                           height="34"
                           rx="7.5"
                           fill="white"
                           stroke="#F2F2F2"
                        />
                        <path
                           d="M19 22L14 17L19 12"
                           stroke="#C8C8C8"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </Link>
                  <h2 className="person-store__title">Мои закладки</h2>
               </div>
               <CotologProducts products={products} disabled={false} />
            </div>
         </section>
      </main>
   );
};

export default Liked;
