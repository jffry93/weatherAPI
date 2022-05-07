import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface locationState {
  city: string;
}

const initialState: locationState = {
  city: 'toronto',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    selectedCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { selectedCity } = locationSlice.actions;

export default locationSlice.reducer;
