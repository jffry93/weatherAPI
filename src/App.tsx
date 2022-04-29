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
import Navbar from './components/Navbar';

function App() {
  //COUNTER STATE
  const count: number = useAppSelector((state) => state.counter.value);
  //LOCATION STATE
  const real: boolean = useAppSelector((state) => state.location.real);
  const dispatch: object = useAppDispatch();
  //states
  const [city, setCity] = useState('Toronto');
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
    <div className='App-header'>
      <Navbar setCity={setCity} />
      {!real && <p>Enter Valid Location</p>}
      <StyledDateNav>
        <button>Yesterday</button>
        <button className='active'>Today</button>
        <button>Tomorrow</button>
      </StyledDateNav>

      {currentData && (
        <StyledInformationDisplayed>
          <Current data={currentData} />
          {/* <History hours={hours} /> */}
        </StyledInformationDisplayed>
      )}
    </div>
  );
}
const StyledDateNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 22px);
  max-width: 500px;
  background-color: #343842;
  border-radius: 3px;
  margin-top: 16px;
  button {
    /* border: 1px solid red; */
    width: 100%;
    padding: 8px 16px;
    border-radius: 3px;
  }
  .active {
    background-color: #fca426;
  }
`;

const StyledInformationDisplayed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default App;
