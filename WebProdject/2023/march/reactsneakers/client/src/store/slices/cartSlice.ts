import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../helpers/products';
import { fetchCartSneakers } from '../actionCreateions/cartCreation';

interface CartSlice {
   products: IProducts[];
   totalPrice: number;
   tax: number;
   checkout: boolean;
   error: string;
   isLoading: boolean;
}

const initialState: CartSlice = {
   products: [],
   totalPrice: 0,
   tax: 0,
   checkout: false,
   error: '',
   isLoading: false,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      resetCartPoducts: (state) => {
         state.products = [];
         state.tax = 0;
         state.totalPrice = 0;
      },
      resetCartPoductsCheckout: (state) => {
         state.products = [];
         state.tax = 0;
         state.totalPrice = 0;
         state.checkout = true;
      },
      changeCheckout: (state) => {
         state.checkout = false;
      },
   },
   extraReducers: {
      [fetchCartSneakers.pending.type]: (state) => {
         state.isLoading = true;
      },
      [fetchCartSneakers.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
         state.isLoading = false;
         state.products = action.payload;

         const totPrice = state.products.reduce((acc, product) => {
            return (acc += product.price);
         }, 0);
         state.totalPrice = totPrice;

         state.tax = Math.round((state.totalPrice / 100) * 5);
      },
      [fetchCartSneakers.rejected.type]: (state, action: PayloadAction<string>) => {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export const { resetCartPoducts, changeCheckout, resetCartPoductsCheckout } = cartSlice.actions;

export default cartSlice.reducer;
