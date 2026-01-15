import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../helpers/products';
import { fetchLikedSneakers } from '../actionCreateions/likedCreation';

interface LikedSlice {
   products: IProducts[];
   error: string;
   isLoading: boolean;
}

const initialState: LikedSlice = {
   products: [],
   error: '',
   isLoading: false,
};

const likedSlice = createSlice({
   name: 'liked',
   initialState,
   reducers: {},
   extraReducers: {
      [fetchLikedSneakers.pending.type]: (state) => {
         state.isLoading = true;
      },
      [fetchLikedSneakers.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
         state.isLoading = false;
         state.products = action.payload;
      },
      [fetchLikedSneakers.rejected.type]: (state, action: PayloadAction<string>) => {
         state.isLoading = true;
         state.error = action.payload;
      },
   },
});

// export const { } = likedSlice.actions;

export default likedSlice.reducer;
