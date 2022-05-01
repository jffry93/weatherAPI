import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hour } from '../weather/Weather-Api-slice';

interface HourState {
  index: number;
  updatedArray: Hour[];
  nextTwentyFour: Hour[];
}

const initialState: HourState = {
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
    handleArray(state, action: PayloadAction<Hour[]>) {
      state.updatedArray = action.payload;
    },
    handleTwentyFour(state, action: PayloadAction<Hour[]>) {
      state.nextTwentyFour = action.payload.splice(state.index, 24);
      // console.log(typeof state.nextTwentyFour);
    },
  },
});

export const { handleIndex, handleArray, handleTwentyFour } = hourSlice.actions;

export default hourSlice.reducer;
