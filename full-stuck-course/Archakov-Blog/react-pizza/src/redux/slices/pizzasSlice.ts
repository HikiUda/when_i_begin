import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ObjPizza } from '../../components/card/BlockPizzes';

export const fetchPizzas = createAsyncThunk<ObjPizza[], Record<string, string>>(
   'pizzas/fetchPizzasStatus',
   async ({ byCategory, sortBy, searchBy, order }) => {
      const { data } = await axios.get<ObjPizza[]>(
         `https://63d276a74abff888340b71d3.mockapi.io/pizzes?${byCategory}${sortBy}${searchBy}${order}`,
      );

      // if (data.length === 0) {
      //    return thunkAPI.rejectWithValue('Reject');
      // }
      // return thunkAPI.fulfillWithValue(data);
      //thunkAPI
      return data;
   },
);

enum Status {
   PENDING = 'pending',
   FULFILLED = 'fulfilled',
   REJECTED = 'rejected',
}

interface PizzasSliceState {
   pizzas: ObjPizza[];
   status: Status;
}

const initialState: PizzasSliceState = {
   pizzas: [],
   status: Status.PENDING,
};

export const pizzasSlice = createSlice({
   name: 'pizzas',
   initialState,
   reducers: {
      addListPizzas(state, action: PayloadAction<ObjPizza[]>) {
         state.pizzas = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.pizzas = [];
         state.status = Status.PENDING;
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.pizzas = action.payload;
         state.status = Status.FULFILLED;
      });
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.pizzas = [];
         state.status = Status.REJECTED;
      });
   },
});

export const { addListPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
