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
  console.log(forecastDay);
  const label = forecastDay?.map((day) => `${day.value}°C`);
  console.log(label);

  return (
    <StyledThreeDays>
      <VictoryBar
        barRatio={0.5}
        style={{
          data: { fill: '#fca426' },
          labels: { fontSize: 20, fill: 'white' },
        }}
        horizontal
        data={forecastDay}
        // data accessor for x values
        x='earnings'
        // data accessor for y values
        y='value'
        width={400}
        height={250}
        alignment='middle'
        labels={label}
      />
    </StyledThreeDays>
  );
};

const StyledThreeDays = styled.div`
  /* display: none; */
  display: flex;
  flex-direction: column;
`;

export default ThreeDays;
