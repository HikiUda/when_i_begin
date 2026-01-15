import { useState } from 'react';

const SortCard = () => {
   const [cardList, setCardList] = useState([
      { id: 1, order: 3, title: 'Карточка 3' },
      { id: 2, order: 1, title: 'Карточка 1' },
      { id: 3, order: 2, title: 'Карточка 2' },
      { id: 4, order: 4, title: 'Карточка 4' },
   ]);
   const [currentCard, setCurrentCard] = useState(null);

   function dragStartHandler(e, card) {
      setCurrentCard(card);
   }
   function dragEndHandler(e) {
      e.target.style.background = 'white';
   }
   function dragOverHandler(e) {
      e.preventDefault();
      e.target.style.background = 'lightgrey';
   }
   function dropHandler(e, card) {
      e.preventDefault();
      setCardList(
         cardList.map((c) => {
            if (c.id == card.id) {
               return { ...c, order: currentCard.order };
            }
            if (c.id === currentCard.id) {
               return { ...c, order: card.order };
            }
            return c;
         }),
      );
      e.target.style.background = 'white';
   }
   const sortCards = (a, b) => (a.order > b.order ? 1 : -1);

   return (
      <div className="app">
         {cardList.sort(sortCards).map((card) => {
            return (
               <div
                  key={card.id}
                  onDragStart={(e) => dragStartHandler(e, card)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, card)}
                  draggable={true}
                  className="card">
                  {card.title}
               </div>
            );
         })}
      </div>
   );
};

export default SortCard;
