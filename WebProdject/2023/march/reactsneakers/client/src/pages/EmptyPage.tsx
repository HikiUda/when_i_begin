import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IEmptyPage {
   img: any;
   title: string;
   text: string[];
}

const EmptyPage: FC<IEmptyPage> = ({ img, title, text }) => {
   return (
      <main className="main">
         <section className="empty-page">
            <div className="empty-page__container __container">
               <div className="empty-page__block">
                  <div className="empty-page__smilic">
                     <img src={img} alt="smile" />
                  </div>
                  <h1 className="empty-page__title">{title}</h1>
                  <div className="empty-page__text">
                     {text.map((item) => (
                        <p key={item}>{item}</p>
                     ))}
                  </div>
                  <Link to="/" className="empty-page__btn green-btn">
                     Вернуться назад
                  </Link>
               </div>
            </div>
         </section>
      </main>
   );
};

export default EmptyPage;
