import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface locationState {
  real: boolean;
}

const initialState: locationState = {
  real: true,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    isReal: (state): any => {
      state.real = true;
    },
    notReal: (state): any => {
      state.real = false;
    },
  },
});

export const { isReal, notReal } = locationSlice.actions;

export default locationSlice.reducer;
