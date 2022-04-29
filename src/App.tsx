import React, { useState, useEffect, SetStateAction, FC } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
//STYLING
import styled from 'styled-components';
//REDUCERS
import { handleDate } from './features/date/date-slice';
import { incremented } from './features/counter/counter-slice';
//WEATHER API
import {
  useFetchCurrentQuery,
  useFetchYesterdayQuery,
  useFetchTomorrowQuery,
} from './features/weather/Weather-Api-slice';
//STYLING
import './App.css';
//COMPONENTS
import Current from './components/Current';
import Yesterday from './components/Yesterday';
import Navbar from './components/Navbar';

function App() {
  //COUNTER STATE
  const count: number = useAppSelector((state) => state.counter.value);
  //LOCATION STATE
  const real: boolean = useAppSelector((state) => state.location.real);
  //DATE STATE
  const date: string = useAppSelector((state) => state.dateReducer.date);

  const dispatch: object = useAppDispatch();
  //states
  const [city, setCity] = useState('');
  //fetch API data
  const { data: currentData, error, isFetching } = useFetchCurrentQuery(city);
  const { data: yesterdayData } = useFetchYesterdayQuery(city);
  const { data: tomorrowData } = useFetchTomorrowQuery(city);

  useEffect(() => {
    console.log(date);
  }, [date]);

  // interface cityType {
  //   preventDefault: () => void;
  //   target: { value: SetStateAction<string> }[];
  // }

  //DISPLAY CITY ENTERED IN INPUT
  const updateCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [_, location] = formData.entries().next().value;

    setCity(location);
  };

  const handleClick = (string) => {
    dispatch(handleDate(string));
  };

  return (
    <div className='App-header'>
      <Navbar setCity={setCity} />
      {!real && <p>Enter Valid Location</p>}
      <StyledDateNav>
        <button
          onClick={() => handleClick('yesterday')}
          className={date === 'yesterday' ? 'active' : ''}
        >
          Yesterday
        </button>
        <button
          onClick={() => handleClick('today')}
          className={date === 'today' ? 'active' : ''}
        >
          Today
        </button>
        <button
          onClick={() => handleClick('tomorrow')}
          className={date === 'tomorrow' ? 'active' : ''}
        >
          Tomorrow
        </button>
      </StyledDateNav>

      {currentData && (
        <>
          <StyledInformationDisplayed>
            {date === 'yesterday' ? (
              <Yesterday yesterdayData={yesterdayData} />
            ) : (
              ''
            )}
            {date === 'today' ? <Current data={currentData} /> : ''}
            {date === 'tomorrow' ? (
              <Yesterday yesterdayData={tomorrowData} />
            ) : (
              ''
            )}
          </StyledInformationDisplayed>
          <StyledMoreDetail>
            <button>More Details</button>
          </StyledMoreDetail>
        </>
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
const StyledMoreDetail = styled.div`
  button {
    background-color: #fca426;
    padding: 8px 32px;
    border-radius: 3px;
    width: fit-content;
    box-shadow: 0px 2px 60px 5px rgba(252, 164, 38, 0.1);
  }
`;

export default App;
