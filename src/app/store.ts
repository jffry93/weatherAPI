import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counter-slice';
import realReducer from '../features/location/real-place-slice';
import locationReducer from '../features/location/location-slice';
import { apiSlice } from '../features/weather/Weather-Api-slice';
import dateReducer from '../features/date/date-slice';
import hourReducer from '../features/date/hour-slice';
import toggleReducer from '../features/toggle/toggle-slice';
import nextTwentyFourSlice from '../features/date/next-hours-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    real: realReducer,
    location: locationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    date: dateReducer,
    hour: hourReducer,
    toggle: toggleReducer,
    nextHours: nextTwentyFourSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
