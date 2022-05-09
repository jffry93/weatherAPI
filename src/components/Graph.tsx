// import * as V from 'victory';
import { useEffect } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryArea,
  VictoryScatter,
} from 'victory';
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

  const scatterData = victoryTickData.map((scatter, i) => {
    return { x: i + 1, y: scatter.temp };
  });
  console.log(scatterData);

  const test = Object.values(victoryTickData);
  const test1 = Object.entries(victoryTickData);

  const victoryTemp = test1.map((test) => `${test[1].temp}°`);

  useEffect(() => {
    const victoryData = twentyFourHours.map((hour) => {
      return { time: hour.time, temp: hour.temp_c };
    });
    const formatData = twentyFourHours.map((hour) => {
      const hourOnly = hour.time.split(' ');
      // console.log(hourOnly[1]);
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
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id='Graph' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='5%' stopColor='#F06C99' />

            <stop offset='98%' stopColor='#282c34' />
          </linearGradient>
        </defs>
      </svg>
      <StyledGraph>
        <VictoryChart
          // horizontal
          style={{
            parent: {
              width: 'unset',
              // border: '1px solid #ccc',
            },

            background: {
              fill: '#282c34',
            },
          }}
          height={300}
          width={1800}
          theme={VictoryTheme.material}
          // domainPadding={16}
          animate={{
            duration: 1000,
            onLoad: { duration: 100 },
            // easing: 'bounce',
          }}
        >
          <VictoryAxis
            dependentAxis
            offsetX={45}
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => `${x}°C`}
            style={{
              grid: { stroke: '#282c34' },
              tickLabels: { fontSize: 13, fill: 'white' },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
            }}
          />
          <VictoryArea
            animate={{
              duration: 1000,
              onLoad: { duration: 100 },
              // easing: 'bounce',
            }}
            interpolation='natural'
            // barRatio={0.6}
            style={{
              data: { fill: 'url(#Graph)' },
              labels: { fontSize: 11, fill: 'white' },
            }}
            // alignment='middle'

            data={victoryTickData}
            x='time'
            y='temp'
          />

          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={victoryTickValues}
            tickFormat={victoryTickFormat}
            style={{
              grid: {
                stroke: '#282c34',
                strokeDasharray: '4, 3',
                strokeWidth: 0.9,
              },
              tickLabels: {
                fontSize: 13,
                fill: 'white',
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
            }}
            fixLabelOverlap
          />
          <VictoryScatter
            style={{
              data: { fill: '#fff', strokeWidth: 3, stroke: '#F06C99' },
              labels: { fontSize: 11, fill: 'white', padding: 12 },
              border: { fill: 'white' },
            }}
            size={5}
            data={scatterData}
            labels={victoryTemp}
          />
        </VictoryChart>
      </StyledGraph>
    </>
  );
};

const StyledGraph = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  .VictoryContainer {
    user-select: auto !important;
    pointer-events: auto !important;
    touch-action: auto !important;
  }

  * {
    &:first-child {
      svg {
        width: unset !important;
        max-width: 1500px;
      }
    }
  }
`;

export default Graph;
