import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProducts, IPurchesProducts } from '../../helpers/products';

export const fetchPurchesSneakers = createAsyncThunk<IPurchesProducts[]>(
   'purches/fetchPerchesSneakers',
   async (_, thunkAPI) => {
      try {
         await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
         const sneakers = await axios.get<IPurchesProducts[]>(
            `http://localhost:5000/api/sneakers/purches`,
         );
         //console.log(sneakers.data);
         return sneakers.data;
      } catch (e) {
         return thunkAPI.rejectWithValue('Error');
      }
   },
);
export const postPurchesSneakers = createAsyncThunk<string, IProducts[]>(
   'purches/postPerchesSneakers',
   async (products, thunkAPI) => {
      try {
         await axios.post(`http://localhost:5000/api/sneakers/purches`, { products });
         return thunkAPI.fulfillWithValue('Success');
      } catch (e) {
         return thunkAPI.rejectWithValue('Error');
      }
   },
);
