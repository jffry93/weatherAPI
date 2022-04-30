import { useEffect } from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
//APIS
import { useFetchThreeDaysQuery } from '../features/weather/Weather-Api-slice';
//REDUCERS
import { MdArrowBack } from 'react-icons/md';

const MoreDetails = ({ city }: any) => {
  const place: string = useAppSelector((state) => state.location.city);
  const { data: forecastData } = useFetchThreeDaysQuery(place);
  const forecasts = forecastData?.forecast.forecastday;

  const weekday = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const dispatch: object = useAppDispatch();

  useEffect(() => {
    console.log('hour');
  }, [MoreDetails]);

  return (
    <StyledMoreDetails>
      <div>
        <MdArrowBack size={25} />
      </div>
      <div>
        <h3>Next 24 hours</h3>
        {/* <div>
          {twentyFourHours.map((hour, i) => (
            <div key={i}>
              <h1>poo</h1>
            </div>
          ))}
        </div> */}
      </div>
      <h3>Next 3 days</h3>
      <div className='three-days'>
        {forecasts?.map((forecast, i) => (
          <div className='forecast' key={i}>
            <div className='text-icon'>
              <p>{weekday[new Date(forecast.date).getDay()]}</p>
              <img src={forecast.day.condition.icon}></img>
            </div>
            <h4>{forecast.day.maxtemp_c}</h4>
          </div>
        ))}
      </div>
    </StyledMoreDetails>
  );
};

const StyledMoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 22px;
  border: 1px solid white;
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
  }
`;

export default MoreDetails;
