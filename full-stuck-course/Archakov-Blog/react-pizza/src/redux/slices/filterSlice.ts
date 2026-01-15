import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ListSortBy, listSortBy } from '../../helpers/pizzes';

interface FilterSliceState {
   currentCategory: string;
   currentSortEl: ListSortBy;
   searchValue: string;
}
export type SetParams = { byCategory: string; sortBy: string; searchBy?: string };

const initialState: FilterSliceState = {
   currentCategory: 'Все',
   currentSortEl: listSortBy[0],
   searchValue: '',
};

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCurrentCategory(state, action: PayloadAction<string>) {
         state.currentCategory = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setCurrentSortEl(state, action: PayloadAction<ListSortBy>) {
         state.currentSortEl = action.payload;
      },
      setInitParams(state, action: PayloadAction<SetParams>) {
         state.currentCategory = action.payload.byCategory;
         const sortEl = listSortBy.find((obj) => obj.sortValue === action.payload.sortBy);
         if (sortEl) {
            state.currentSortEl = sortEl;
         }
      },
   },
});

export const { setCurrentCategory, setCurrentSortEl, setInitParams, setSearchValue } =
   filterSlice.actions;

export default filterSlice.reducer;
