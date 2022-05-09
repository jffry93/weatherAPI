import { VictoryBar, VictoryChart } from 'victory';
import { useFetchThreeDaysQuery } from '../features/weather/Weather-Api-slice';
import { useAppSelector } from '../app/hooks';

import styled from 'styled-components';

const ThreeDays = () => {
  const location = useAppSelector((state) => state.location.city);
  const { data: forecastData } = useFetchThreeDaysQuery(location);
  const forecast = forecastData?.forecast.forecastday;

  const forecastDay = forecast?.map((day, i) => ({
    value: day.day.avgtemp_c,
    earnings: i + 1,
  }));

  const label = forecastDay?.map((day) => `${day.value}°`);

  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id='myGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#fca426' />
            <stop offset='92%' stopColor='#2d313a' />
            <stop offset='100%' stopColor='#282c34' />
          </linearGradient>
        </defs>
      </svg>
      <StyledThreeDays>
        <VictoryBar
          barRatio={0.35}
          style={{
            data: { fill: 'url(#myGradient)' },
            labels: { fontSize: 13, fill: 'white' },
          }}
          horizontal
          data={forecastDay}
          // data accessor for x values
          x='earnings'
          // data accessor for y values
          y='value'
          width={360}
          height={214}
          alignment='middle'
          labels={label}
        />
      </StyledThreeDays>
    </>
  );
};

const StyledThreeDays = styled.div`
  /* display: none; */

  .VictoryContainer {
    overflow: hidden;
    user-select: auto !important;
    pointer-events: auto !important;
    touch-action: auto !important;

    svg {
      width: 400px !important;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }
    :first-child {
      position: relative;
      right: 20px;
    }
  }
`;

export default ThreeDays;
