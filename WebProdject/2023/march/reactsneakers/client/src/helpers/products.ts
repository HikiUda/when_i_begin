const img1 = 'http://localhost:3000/sneakers/1.jpg';
const img2 = 'http://localhost:3000/sneakers/2.jpg';
const img3 = 'http://localhost:3000/sneakers/3.jpg';
const img4 = 'http://localhost:3000/sneakers/4.jpg';
const img5 = 'http://localhost:3000/sneakers/5.jpg';
const img6 = 'http://localhost:3000/sneakers/6.jpg';
const img7 = 'http://localhost:3000/sneakers/7.jpg';
const img8 = 'http://localhost:3000/sneakers/8.jpg';
const img9 = 'http://localhost:3000/sneakers/9.jpg';
const img10 = 'http://localhost:3000/sneakers/10.jpg';

export interface IProducts {
   id: number;
   title: string;
   price: number;
   img: string;
   inCart: boolean;
   isLiked: boolean;
}

export interface IPurchesProducts extends IProducts {
   sneakersId: number;
}

export const products: IProducts[] = [
   {
      id: 1,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 12999,
      img: img1,
      inCart: false,
      isLiked: true,
   },
   {
      id: 2,
      title: 'Мужские Кроссовки Nike Air Max 270 ',
      price: 11999,
      img: img2,
      inCart: true,
      isLiked: false,
   },
   {
      id: 3,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 8499,
      img: img3,
      inCart: false,
      isLiked: false,
   },
   {
      id: 4,
      title: 'Кроссовки Puma X Aka Boku Future Rider',
      price: 8999,
      img: img4,
      inCart: false,
      isLiked: false,
   },
   {
      id: 5,
      title: 'Мужские Кроссовки Under Armour Curry 8',
      price: 15199,
      img: img5,
      inCart: false,
      isLiked: false,
   },
   {
      id: 6,
      title: 'Мужские Кроссовки Nike Kyrie 7',
      price: 11299,
      img: img6,
      inCart: false,
      isLiked: false,
   },
   {
      id: 7,
      title: 'Мужские Кроссовки Jordan Air Jordan 11',
      price: 11799,
      img: img7,
      inCart: false,
      isLiked: false,
   },
   {
      id: 8,
      title: 'Мужские Кроссовки Nike LeBron XVIII',
      price: 16499,
      img: img8,
      inCart: false,
      isLiked: false,
   },
   {
      id: 9,
      title: 'Мужские Кроссовки Nike Lebron XVIII Low',
      price: 13999,
      img: img9,
      inCart: false,
      isLiked: false,
   },
   {
      id: 10,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 8499,
      img: img1,
      inCart: false,
      isLiked: false,
   },
   {
      id: 11,
      title: 'Кроссовки Puma X Aka Boku Future Rider',
      price: 8999,
      img: img4,
      inCart: false,
      isLiked: false,
   },
   {
      id: 12,
      title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
      price: 11299,
      img: img10,
      inCart: false,
      isLiked: false,
   },
];
