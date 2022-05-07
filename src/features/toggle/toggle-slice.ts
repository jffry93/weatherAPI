import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface toggleState {
  show: boolean;
}

const initialState: toggleState = {
  show: true,
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
