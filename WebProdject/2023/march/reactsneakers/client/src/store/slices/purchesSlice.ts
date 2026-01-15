import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPurchesProducts } from '../../helpers/products';
import { fetchPurchesSneakers } from '../actionCreateions/purchesCreation';

interface PurchesSlice {
   purches: IPurchesProducts[];
   error: string;
   isLoading: boolean;
}

const initialState: PurchesSlice = {
   purches: [],
   error: '',
   isLoading: false,
};

const purchesSlice = createSlice({
   name: 'purches',
   initialState,
   reducers: {
      purchesProducts: (state, action: PayloadAction<IPurchesProducts[]>) => {
         state.purches = [...state.purches, ...action.payload];
      },
   },
   extraReducers: {
      [fetchPurchesSneakers.pending.type]: (state) => {
         state.isLoading = true;
      },
      [fetchPurchesSneakers.fulfilled.type]: (state, action: PayloadAction<IPurchesProducts[]>) => {
         state.isLoading = false;
         state.purches = action.payload;
      },
      [fetchPurchesSneakers.rejected.type]: (state, action: PayloadAction<string>) => {
         state.isLoading = true;
         state.error = action.payload;
      },
   },
});

export const { purchesProducts } = purchesSlice.actions;

export default purchesSlice.reducer;
