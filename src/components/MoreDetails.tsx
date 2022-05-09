import { useEffect } from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
//APIS
import { useFetchThreeDaysQuery } from '../features/weather/Weather-Api-slice';
//REDUCERS
import { toggleState } from '../features/toggle/toggle-slice';
//ICONS
import { MdKeyboardBackspace } from 'react-icons/md';
//GRAPH
import Graph from './Graph';
import ThreeDays from './ThreeDays';

const MoreDetails = () => {
  //SLICES
  const place: string = useAppSelector((state) => state.location.city);
  const twentyFourHours = useAppSelector((state) => state.hour.nextTwentyFour);
  const detailsActive = useAppSelector((state) => state.toggle.show);

  //APIS
  const { data: forecastData } = useFetchThreeDaysQuery(place);
  const forecasts = forecastData?.forecast.forecastday;

  const weekday = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleState());
  };
  return (
    <StyledMoreDetails>
      <div className={`${detailsActive ? 'active' : ''} detail-container`}>
        <div className='back-button' onClick={() => handleToggle()}>
          <MdKeyboardBackspace size={42.5} />
        </div>
        <div>
          <h4>Next 24 hours</h4>
          {detailsActive && <Graph />}
          {/* <div className='graph'>
            
            {twentyFourHours.map((hour, i) => (
              <div className='container' key={i}>
                <p>{new Date(hour.time).getHours()}:00</p>
                <p>{hour.temp_c}</p>
              </div>
            ))}
          </div> */}
        </div>
        <h4 className='three-days-title'>Next 3 days</h4>
        <div className='three-days-container'>
          <div className='three-days'>
            {forecasts?.map((forecast, i) => (
              <div className='forecast' key={i}>
                <p>{weekday[new Date(forecast.date).getDay()]}</p>
                <img src={forecast.day.condition.icon}></img>
              </div>
            ))}
          </div>
          <ThreeDays />
        </div>
      </div>
    </StyledMoreDetails>
  );
};

const StyledMoreDetails = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 22px;
  overflow: hidden;

  position: absolute;

  opacity: 1;
  z-index: 1;
  .back-button {
    margin: 12px 0 32px 0;
  }
  .detail-container {
    position: relative;
    top: 0;
    transform: translateY(200px);
    opacity: 0;
    width: 100%;
    transition: all 0.5s ease-out;
  }
  .active {
    opacity: 1;
    position: relative;
    transform: translateY(0px);
    transition: all 0.5s ease-out;
  }
  .graph {
    display: flex;
    gap: 16px;

    overflow-x: scroll;
    width: 100%;
    max-width: 500px;
    padding: 32px 0 24px;
    .container {
      display: flex;
      align-items: center;
      flex-direction: column-reverse;
      justify-content: space-between;

      height: 300px;
      border: 1px solid red;
    }
  }
  .three-days-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    overflow: hidden;
    .three-days {
      position: absolute;
      left: 0;
      background-color: #282c34;
      z-index: 1;
      .forecast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
    }
  }
  /* .three-days-title {
    margin-top: 8px;
  }
  .three-days {
    width: 100%;
    padding: 32px 0;
    .forecast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        width: 110px;
        p,
        img {
          width: 60%;
        }
      }
    }
  } */
`;

export default MoreDetails;
