import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isReal, notReal } from '../location/locationSlice';

const WEATHER_API_KEY: string = '2049db5f99ef405eb86151912211611';

interface Location {
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: await fetchBaseQuery({
    baseUrl: 'http://api.weatherapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', WEATHER_API_KEY);

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchCurrent: builder.query<Location, string | void>({
        query(location) {
          return `/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`;
        },
        keepUnusedDataFor: 1,
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          // `onStart` side-effect
          console.log('Fetching post...');
          try {
            const { data } = await queryFulfilled;
            // `onSuccess` side-effect
            dispatch(isReal());
            console.log('Post received!');
          } catch (err) {
            // `onError` side-effect
            dispatch(notReal());
            console.log('Error fetching post!');
          }
        },
      }),
    };
  },
});

export const { useFetchCurrentQuery } = apiSlice;
