import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProducts } from '../../helpers/products';

export const fetchLikedSneakers = createAsyncThunk<IProducts[]>(
   'liked/fetchLikedSneakers',
   async (_, thunkAPI) => {
      try {
         await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
         const sneakers = await axios.get<IProducts[]>(`http://localhost:5000/api/sneakers/liked`);
         //console.log(sneakers.data);
         return sneakers.data;
      } catch (e) {
         return thunkAPI.rejectWithValue('Error');
      }
   },
);
