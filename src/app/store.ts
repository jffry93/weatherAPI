import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counter-slice';
import locationReducer from '../features/location/locationSlice';
import { apiSlice } from '../features/weather/Weather-Api-slice';
import dateReducer from '../features/date/date-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    location: locationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    dateReducer: dateReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
