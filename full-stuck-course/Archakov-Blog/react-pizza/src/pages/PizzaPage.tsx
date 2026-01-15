import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PizzaPage: React.FC = () => {
   let [dataPizza, setDataPizza] = useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>();
   const { id } = useParams();

   useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(
               `https://63d276a74abff888340b71d3.mockapi.io/pizzes/${id}`,
            );
            setDataPizza(data);
         } catch (err) {
            console.log(err);
         }
      }
      fetchPizza();
   }, [id]);

   if (!dataPizza) {
      return <div>Loading</div>;
   }

   return (
      <div className="container">
         <img src={dataPizza.imageUrl} alt={id} />
         <h1>{dataPizza.title}</h1>
         <p>{dataPizza.price}</p>
      </div>
   );
};

export default PizzaPage;
