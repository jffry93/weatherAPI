import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
//STYLING
import styled from 'styled-components';
//REDUCERS
import { handleDate } from './features/date/date-slice';
import {
  handleIndex,
  handleArray,
  handleTwentyFour,
} from './features/date/hour-slice';
import { toggleState } from './features/toggle/toggle-slice';
import {
  handleFormat,
  handleValues,
  handleVictory,
} from './features/date/next-hours-slice';
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
import { BenType } from './components/BenType';

//INTERFACES

function App() {
  //TYPESCRIPT PRACTICE
  const [number, setNumber] = useState('');

  const changeNumber = () => {
    setNumber('10');
  };

  //REDUX
  const dispatch = useAppDispatch();

  //REDUX SLICES
  const count: number = useAppSelector((state) => state.counter.value);
  const real: boolean = useAppSelector((state) => state.real.real);
  const place: string = useAppSelector((state) => state.location.city);
  const date: string = useAppSelector((state) => state.date.date);
  const twoDayArray = useAppSelector((state) => state.hour.updatedArray);
  const toggle: boolean = useAppSelector((state) => state.toggle.show);
  const twentyFourHours = useAppSelector((state) => state.hour.nextTwentyFour);

  //fetch API data
  const { data: currentData, error, isFetching } = useFetchCurrentQuery(place);
  const { data: yesterdayData } = useFetchYesterdayQuery(place);
  const { data: todayData } = useFetchTodayQuery(place);
  const { data: tomorrowData } = useFetchTomorrowQuery(place);

  //---------NEXT 24 HOURS STATE----------

  // interface Hour {
  //   hour?: {
  //     time: string;
  //   };
  // }
  //SET 48 HOURS
  const todayHours = todayData?.forecast.forecastday[0].hour || [];
  const tomorrowHours = tomorrowData?.forecast.forecastday[0].hour || [];
  const fourEightHours = todayHours?.concat(tomorrowHours);

  //GET CURRENT DATE & TIME
  let currentDate = new Date(new Date());

  //FUNCTION TO CREATE EXACT MATCH OF API VALUE
  interface DateInterface {
    getDate(): number;
    getMonth(): number;
    getFullYear(): number;
    getHours(): number;
  }

  const getCurrentHour = (date: DateInterface): string => {
    let day = date.getDate();
    let formattedDay = ('0' + day).slice(-2);
    let month = date.getMonth() + 1;
    let formattedMonth = ('0' + month).slice(-2);
    let year = date.getFullYear();
    let hour = date.getHours();
    let formattedHour = ('0' + hour).slice(-2);

    return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:00`;
  };

  //FIND CURRENT TIME IN ARRAY 48HOURS ARRAY
  useEffect(() => {
    const currentHour = getCurrentHour(currentDate);
    const index = todayHours.findIndex(({ time }) => time === currentHour);

    dispatch(handleIndex(index));
    dispatch(handleArray(fourEightHours));

    //MUST WAIT FOR TOMORROW HOURS DATA TO RUN ON TIME
  }, [JSON.stringify(fourEightHours)]);

  //SET NEXT 24 HOURS ARRAY
  useEffect(() => {
    let reducerCopy = [...twoDayArray]; //CREATE CLONE OF ARRAY
    dispatch(handleTwentyFour(reducerCopy));
  }, [JSON.stringify(twoDayArray)]); //RUNS EVERYTIME THE LOCATION CHANGES

  //SET STATE FOR GRAPH STATE
  useEffect(() => {
    const victoryData = twentyFourHours.map((hour) => {
      return { time: hour.time, temp: hour.temp_c };
    });
    const formatData = twentyFourHours.map((hour, i) => {
      const hourOnly = hour.time.split(' ');
      // console.log(hourOnly[1]);
      return hourOnly[1];
    });
    const valuesData = twentyFourHours.map((hour, i) => {
      return i++ + 1;
    });

    dispatch(handleFormat(formatData));
    dispatch(handleValues(valuesData));
    dispatch(handleVictory(victoryData));
  }, [twentyFourHours]);
  //CONDITIONAL RENDERS FOR DIFFERENT DAYS
  const handleClick = (string: string) => {
    dispatch(handleDate(string));
  };

  //DISPLAY MORE DETAILS
  const handleToggle = () => {
    dispatch(toggleState());
  };
  const handleChange = () => {
    console.log('foo');
  };

  return (
    <StyledApp>
      <Navbar />
      {!real && <p className='invalid-address'>Enter Valid Location</p>}

      <div className='detail-parent'>
        <MoreDetails />
      </div>
      {currentData && (
        <div className={`${toggle ? '' : 'active'} current-details`}>
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
          <StyledInformationDisplayed>
            {date === 'yesterday' && yesterdayData != null ? (
              <Yesterday yesterdayData={yesterdayData} />
            ) : (
              ''
            )}
            {date === 'today' ? <Current /> : ''}
            {date === 'tomorrow' && tomorrowData != null ? (
              <Yesterday yesterdayData={tomorrowData} />
            ) : (
              ''
            )}
          </StyledInformationDisplayed>
          <StyledMoreDetail onClick={() => handleToggle()}>
            <button>More Details</button>
          </StyledMoreDetail>
        </div>
      )}
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
  .invalid-address {
    position: relative;
  }
  .current-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    opacity: 0;
    z-index: -1;
    transition: all 0.5s ease-out;
    /* display: none; */
  }
  .active {
    opacity: 1;
    z-index: 2;
  }
  .detail-parent {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }
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
  padding-bottom: 60px;
  button {
    background-color: #fca426;
    padding: 8px 32px;
    border-radius: 3px;
    width: fit-content;
    box-shadow: 0px 2px 60px 5px rgba(252, 164, 38, 0.025);
  }
`;

export default App;
