import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface locationState {
  real: boolean;
}

const initialState: locationState = {
  real: true,
};

const realSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    isReal: (state) => {
      state.real = true;
    },
    notReal: (state) => {
      state.real = false;
    },
  },
});

export const { isReal, notReal } = realSlice.actions;

export default realSlice.reducer;
