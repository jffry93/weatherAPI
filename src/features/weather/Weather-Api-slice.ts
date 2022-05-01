import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isReal, notReal } from '../location/real-place-slice';

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
export interface Hour {
  time: string;
  temp_c: number;
}

export interface ForecastDay {
  date: string | number | Date;
  day: {
    avgtemp_c?: number;
    maxtemp_c?: number;
    avghumidity: number;
    uv: number;
    maxwind_kph: number;
    totalprecip_in: number;
    condition: {
      text: string;
      icon: string;
    };
    date: number;
  };

  hour: Hour[];
}
interface History {
  location: {
    country: string;
    name: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}
//HISTORY VARIABLE
//YESTERDAY'S DATE
const getYesterdaysDate = () => {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};
const yesterday = getYesterdaysDate();
//TOMORROWS DATE
const getTomorrowsDate = () => {
  let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
};
const tomorrow = getTomorrowsDate();

//TODAYS DATE
const getTodayDate = () => {
  let today: any = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
};
const today = getTodayDate();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1',
  }),
  endpoints(builder) {
    return {
      //CURRENT
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
      //YESTERDAY
      fetchYesterday: builder.query<History, string | void>({
        query(location) {
          return `/history.json?key=${WEATHER_API_KEY}&q=${location}&dt=${yesterday}`;
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
      //TODAY
      fetchToday: builder.query<History, string | void>({
        query(location) {
          return `/history.json?key=${WEATHER_API_KEY}&q=${location}&dt=${today}`;
        },
      }),

      //TOMORROW
      fetchTomorrow: builder.query<History, string | void>({
        query(location) {
          return `/history.json?key=${WEATHER_API_KEY}&q=${location}&dt=${tomorrow}`;
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
      fetchThreeDays: builder.query<History, string | void>({
        query(location) {
          return `/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7&aqi=no&alerts=no`;
        },
      }),
    };
  },
});

export const {
  useFetchCurrentQuery,
  useFetchYesterdayQuery,
  useFetchTodayQuery,
  useFetchTomorrowQuery,
  useFetchThreeDaysQuery,
} = apiSlice;
