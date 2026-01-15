import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/productsSlice';
import cart from './slices/cartSlice';
import liked from './slices/likedSlice';
import purches from './slices/purchesSlice';

const rootReducer = combineReducers({
   products,
   cart,
   liked,
   purches,
});

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
   });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
