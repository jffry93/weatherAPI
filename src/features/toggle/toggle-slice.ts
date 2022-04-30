import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface toggleState {
  show: boolean;
}

const initialState: toggleState = {
  show: false,
};

const toggleSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleState } = toggleSlice.actions;

export default toggleSlice.reducer;
