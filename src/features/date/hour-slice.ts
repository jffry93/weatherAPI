import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface hourState {
  index: number;
  updatedArray: [];
  nextTwentyFour: [];
}

const initialState: hourState = {
  index: 0,
  updatedArray: [],
  nextTwentyFour: [],
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
    handleTwentyFour(state, action: PayloadAction<[]>) {
      state.nextTwentyFour = action.payload.splice(state.index, 24);
    },
  },
});

export const { handleIndex, handleArray, handleTwentyFour } = hourSlice.actions;

export default hourSlice.reducer;
