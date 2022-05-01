// import * as V from 'victory';
import { useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import styled from 'styled-components';
//API SLICES
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  handleFormat,
  handleValues,
  handleVictory,
} from '../features/date/next-hours-slice';
//REDUX ACTIONS

const Graph = () => {
  const dispatch = useAppDispatch();
  //REDUX SLICES
  const twentyFourHours = useAppSelector((state) => state.hour.nextTwentyFour);
  const victoryTickFormat = useAppSelector((state) => state.nextHours.format);
  const victoryTickValues = useAppSelector((state) => state.nextHours.value);
  const victoryTickData = useAppSelector((state) => state.nextHours.victory);

  useEffect(() => {
    const victoryData = twentyFourHours.map((hour) => {
      return { time: hour.time, temp: hour.temp_c };
    });
    const formatData = twentyFourHours.map((hour) => {
      const hourOnly = hour.time.split(' ');
      console.log(hourOnly[1]);
      return hourOnly[1];
    });
    const valuesData = twentyFourHours.map((_, i) => {
      return i++ + 1;
    });

    dispatch(handleFormat(formatData));
    dispatch(handleValues(valuesData));
    dispatch(handleVictory(victoryData));
  }, [twentyFourHours]);

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        animate={{
          duration: 1000,
          onLoad: { duration: 100 },
        }}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={victoryTickValues}
          tickFormat={victoryTickFormat}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `$${x / 1000}k`}
        />
        <VictoryBar data={victoryTickData} x='time' y='temp' />
      </VictoryChart>
    </div>
  );
};

export default Graph;
