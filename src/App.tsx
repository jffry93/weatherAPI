import React, { useState, useEffect, SetStateAction, FC } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
//STYLING
import styled from 'styled-components';
//REDUCERS
import { handleDate } from './features/date/date-slice';
import { handleIndex, handleArray } from './features/date/hour-slice';
import { toggleState } from './features/toggle/toggle-slice';
//WEATHER API
import {
  useFetchCurrentQuery,
  useFetchYesterdayQuery,
  useFetchTodayQuery,
  useFetchTomorrowQuery,
} from './features/weather/Weather-Api-slice';
//STYLING
import './App.css';
//COMPONENTS
import Current from './components/Current';
import Yesterday from './components/Yesterday';
import Navbar from './components/Navbar';
import MoreDetails from './components/MoreDetails';

function App() {
  //COUNTER STATE
  const count: number = useAppSelector((state) => state.counter.value);
  //LOCATION STATE
  const real: boolean = useAppSelector((state) => state.real.real);
  const place: string = useAppSelector((state) => state.location.city);
  //DATE STATE
  const date: string = useAppSelector((state) => state.date.date);
  //TOGGLE DETAILS STATE
  const toggle: boolean = useAppSelector((state) => state.toggle.show);

  const dispatch: object = useAppDispatch();
  //states
  // const [hourIndex, setHourIndex] = useState();
  //fetch API data
  const { data: currentData, error, isFetching } = useFetchCurrentQuery(place);
  const { data: yesterdayData } = useFetchYesterdayQuery(place);
  const { data: todayData } = useFetchTodayQuery(place);
  const { data: tomorrowData } = useFetchTomorrowQuery(place);

  //NEXT 24 HOURS
  const todayHours = todayData?.forecast.forecastday[0].hour;
  const tomorrowHours = tomorrowData?.forecast.forecastday[0].hour;
  const fourthEightHours = todayHours?.concat(tomorrowHours);

  var currentDate = new Date(new Date());

  const getCurrentHour = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();

    return `${year}-${month}-${day} ${hour}:00`;
  };

  useEffect(() => {
    const currentHour = getCurrentHour(currentDate);
    const updatedState = {};

    fourthEightHours?.forEach((el, i) => {
      const tomorrowHours = getCurrentHour(new Date(el.time));
      if (tomorrowHours === currentHour) {
        dispatch(handleIndex(i));
      }
    });
    dispatch(handleArray(fourthEightHours));
  }, [toggle, location]);

  const handleClick = (string: string) => {
    dispatch(handleDate(string));
  };

  const handleToggle = () => {
    dispatch(toggleState(toggle));
  };

  return (
    <StyledApp>
      <Navbar />
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
          <StyledMoreDetail onClick={() => handleToggle()}>
            <button>More Details</button>
          </StyledMoreDetail>
        </>
      )}
      {toggle && <MoreDetails />}
    </StyledApp>
  );
}
const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

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
    box-shadow: 0px 2px 60px 5px rgba(252, 164, 38, 0.025);
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
    box-shadow: 0px 2px 60px 5px rgba(252, 164, 38, 0.025);
  }
`;

export default App;
