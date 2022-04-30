import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface hourState {
  index: number;
  updatedArray: [];
}

const initialState: hourState = {
  index: 0,
  updatedArray: [],
};

const hourSlice = createSlice({
  name: 'hour',
  initialState,
  reducers: {
    handleIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
    handleArray(state, action: PayloadAction<[]>) {
      state.updatedArray = action.payload;
    },
  },
});

export const { handleIndex, handleArray } = hourSlice.actions;

export default hourSlice.reducer;
