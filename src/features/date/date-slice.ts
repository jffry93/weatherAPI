import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dateState {
  date: string;
}

const initialState: dateState = {
  date: 'today',
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    handleDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
  },
});

export const { handleDate } = dateSlice.actions;

export default dateSlice.reducer;
