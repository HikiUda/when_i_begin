import { FC } from 'react';
//@ts-ignore
import brend from './../../accets/img/brend.png';
//@ts-ignore
import background from './../../accets/img/intro.png';

const Intro: FC = () => {
   return (
      <section className="intro">
         <div className="intro__container __container">
            <div className="intro__block">
               <div className="intro__info">
                  <div className="intro__brend">
                     <img src={brend} alt="brend" />
                  </div>
                  <h1 className="intro__title">
                     Stan Smith<span>, Forever!</span>
                  </h1>
                  <button className="intro__btn green-btn">Купить</button>
               </div>
               <div className="intro__img">
                  <img src={background} alt="brend" />
               </div>
            </div>
         </div>
      </section>
   );
};

export default Intro;
