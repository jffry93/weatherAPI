import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

interface VictoryData {
  time: string;
  temp: number;
}

interface NextHourInterface {
  format: string[];
  value: number[];
  victory: VictoryData[];
}

const initialState: NextHourInterface = {
  format: [],
  value: [],
  victory: [],
};

const nextTwentyFourSlice = createSlice({
  name: 'nextHours',
  initialState,
  reducers: {
    handleFormat(state, action: PayloadAction<string[]>) {
      state.format = action.payload;
    },
    handleValues(state, action: PayloadAction<number[]>) {
      state.value = action.payload;
    },
    handleVictory(state, action: PayloadAction<VictoryData[]>) {
      state.victory = action.payload;
    },
  },
});

export const { handleFormat, handleValues, handleVictory } =
  nextTwentyFourSlice.actions;

export default nextTwentyFourSlice.reducer;
