import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isReal, notReal } from '../location/locationSlice';

const WEATHER_API_KEY: string = '2049db5f99ef405eb86151912211611';

interface Current {
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    uv: number;
    wind_kph: number;
    pressure_mb: number;
  };
  location: {
    name: string;
    country: string;
  };
}
interface Hour {
  temp_c: number;
}

interface ForecastDay {
  hour: Hour[];
}
interface History {
  forecast: {
    forecastday: ForecastDay[];
  };
}
//HISTORY VARIABLE

let today: any = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
// console.log(today);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1',
  }),
  endpoints(builder) {
    return {
      fetchCurrent: builder.query<Current, string | void>({
        query(location) {
          return `/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`;
        },
        keepUnusedDataFor: 1,
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          // `onStart` side-effect
          // console.log('Fetching post...');
          try {
            const { data } = await queryFulfilled;
            // `onSuccess` side-effect
            dispatch(isReal());
            // console.log('Post received!');
          } catch (err) {
            // `onError` side-effect
            dispatch(notReal());
            // console.log('Error fetching post!');
          }
        },
      }),
      fetchHistory: builder.query<History, string | void>({
        query(location) {
          return `/history.json?key=${WEATHER_API_KEY}&q=${location}&dt=${today}`;
        },
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          // `onStart` side-effect
          console.log('Fetching post...');
          try {
            const { data } = await queryFulfilled;
            // `onSuccess` side-effect

            // console.log(data);
          } catch (err) {
            // `onError` side-effect

            console.log('Error fetching post!');
          }
        },
      }),
    };
  },
});

export const { useFetchCurrentQuery, useFetchHistoryQuery } = apiSlice;
