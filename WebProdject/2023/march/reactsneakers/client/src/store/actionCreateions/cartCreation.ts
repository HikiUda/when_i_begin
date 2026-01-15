import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProducts } from '../../helpers/products';

export const fetchCartSneakers = createAsyncThunk<IProducts[]>(
   'cart/fetchCartSneakers',
   async (_, thunkAPI) => {
      try {
         const sneakers = await axios.get<IProducts[]>(`http://localhost:5000/api/sneakers/cart`);
         //console.log(sneakers.data);
         return sneakers.data;
      } catch (e) {
         return thunkAPI.rejectWithValue('Error');
      }
   },
);
