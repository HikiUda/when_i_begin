import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProducts } from '../../helpers/products';

interface SneakersCreation {
   limit: number;
   page: number;
   search: string;
}

export const fetchSneakers = createAsyncThunk<IProducts[], SneakersCreation>(
   'products/fetchSneakers',
   async ({ limit, page, search }, thunkAPI) => {
      try {
         await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
         const sneakers = await axios.get<IProducts[]>(
            `http://localhost:5000/api/sneakers?limit=${limit}&page=${page}&search=${search}`,
         );
         //console.log(sneakers.data);

         return sneakers.data;
      } catch (e) {
         return thunkAPI.rejectWithValue('Error');
      }
   },
);
