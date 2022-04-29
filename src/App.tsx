import React, { useState, useEffect, SetStateAction, FC } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
//STYLING
import styled from 'styled-components';
//WEATHER API
import {
  useFetchCurrentQuery,
  useFetchHistoryQuery,
} from './features/weather/Weather-Api-slice';
//STYLING
import './App.css';
//COMPONENTS
import Current from './components/Current';
import History from './components/History';

function App() {
  //COUNTER STATE
  const count: number = useAppSelector((state) => state.counter.value);
  //LOCATION STATE
  const real: boolean = useAppSelector((state) => state.location.real);
  const dispatch: object = useAppDispatch();
  //states
  const [city, setCity] = useState('TORONTO');
  //fetch API data
  const { data: currentData, error, isFetching } = useFetchCurrentQuery(city);
  const { data: historyData } = useFetchHistoryQuery(city);
  //CHART
  const hours = historyData?.forecast.forecastday[0].hour;

  useEffect(() => {
    console.log(hours);
  }, [historyData]);

  interface cityType {
    preventDefault: () => void;
    target: { value: SetStateAction<string> }[];
  }

  //DISPLAY CITY ENTERED IN INPUT
  const updateCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [_, location] = formData.entries().next().value;

    setCity(location);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {!real && <p>Enter Valid Location</p>}
        <form action='' onSubmit={updateCity}>
          <input name='location' type='text' placeholder='City or PostalCode' />{' '}
          <input type='submit' value='Submit' />
        </form>
        {currentData && (
          <StyledInformationDisplayed>
            <Current data={currentData} />
            {/* <History hours={hours} /> */}
          </StyledInformationDisplayed>
        )}
      </header>
      <div></div>
    </div>
  );
}

const StyledInformationDisplayed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default App;
