import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../helpers/products';
import { fetchSneakers } from '../actionCreateions/productsCreations';

interface ProductsSlice {
   products: IProducts[];
   page: number;
   limit: number;
   search: string;
   isLoading: boolean;
   error: string;
}

const initialState: ProductsSlice = {
   products: [],
   limit: 4,
   page: 1,
   search: '',
   isLoading: false,
   error: '',
};

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      resetProducts(state) {
         state.products = [];
         state.page = 1;
      },
      changeSearch(state, action: PayloadAction<string>) {
         state.page = 1;
         state.search = action.payload;
      },
   },
   extraReducers: {
      [fetchSneakers.pending.type]: (state) => {
         state.isLoading = true;
         state.page = state.page += 1;
      },
      [fetchSneakers.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
         state.isLoading = false;
         state.products = [...state.products, ...action.payload];
      },
      [fetchSneakers.rejected.type]: (state, action: PayloadAction<string>) => {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export const { resetProducts, changeSearch } = productsSlice.actions;

export default productsSlice.reducer;
