import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CartSlice {
   commonPrice: number;
   commonQuantity: number;
   allPizzas: Record<string, number>;
}

const initialState: CartSlice = {
   commonPrice: 0,
   commonQuantity: 0,
   allPizzas: {},
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addPizza(state, action: PayloadAction<string>) {
         const piz: string = action.payload;

         if (state.allPizzas[piz] !== undefined) {
            state.allPizzas[piz]++;
         } else {
            state.allPizzas[piz] = 1;
         }

         let countPrice = 0;
         for (let item of Object.keys(state.allPizzas)) {
            const price = Number(item.split(',')[1]);

            if (typeof price === 'number') {
               countPrice = countPrice + price * state.allPizzas[item];
            }
         }
         state.commonPrice = countPrice;

         state.commonQuantity = Object.values(state.allPizzas).reduce(
            (acc: number, val) => (acc += val),
            0,
         );
      },
      subPizza(state, action: PayloadAction<string>) {
         const piz = action.payload;

         state.allPizzas[piz]--;

         if (state.allPizzas[piz] <= 0) {
            delete state.allPizzas[piz];
         }

         let countPrice = 0;
         for (let item of Object.keys(state.allPizzas)) {
            const price = Number(item.split(',')[1]);
            if (typeof price === 'number') {
               countPrice = countPrice + price * state.allPizzas[item];
            }
         }
         state.commonPrice = countPrice;

         state.commonQuantity = Object.values(state.allPizzas).reduce(
            (acc: number, val) => (acc += val),
            0,
         );
      },
      removePizza(state, action: PayloadAction<string>) {
         const piz = action.payload;

         delete state.allPizzas[piz];

         let countPrice = 0;
         for (let item of Object.keys(state.allPizzas)) {
            const price = Number(item.split(',')[1]);

            if (typeof price === 'number') {
               countPrice = countPrice + price * state.allPizzas[item];
            }
         }
         state.commonPrice = countPrice;

         state.commonQuantity = Object.values(state.allPizzas).reduce(
            (acc: number, val) => (acc += val),
            0,
         );
      },
      clearCart(state) {
         state.allPizzas = {};
         state.commonPrice = 0;
         state.commonQuantity = 0;
      },
      initCartFromLC(state, action) {
         state.allPizzas = action.payload;

         let countPrice = 0;
         for (let item of Object.keys(state.allPizzas)) {
            const price = Number(item.split(',')[1]);

            if (typeof price === 'number') {
               countPrice = countPrice + price * state.allPizzas[item];
            }
         }
         state.commonPrice = countPrice;

         state.commonQuantity = Object.values(state.allPizzas).reduce(
            (acc: number, val) => (acc += val),
            0,
         );
      },
   },
});

export const selectorCart = () => (state: RootState) => state.cart;

export const { addPizza, subPizza, clearCart, removePizza, initCartFromLC } = cartSlice.actions;

export default cartSlice.reducer;
