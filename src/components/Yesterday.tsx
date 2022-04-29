import { Obj } from 'reselect/es/types';
import styled from 'styled-components';
import YesterdayDetails from './YesterdayDetails';

const Yesterday = ({ yesterdayData }) => {
  return (
    <StyledYesterday>
      <div className='current-info'>
        <h2>{yesterdayData?.location.name}</h2>
        <h3>{yesterdayData?.location.country}</h3>
        <h1 className='temperature'>
          {yesterdayData?.forecast.forecastday[0].day.avgtemp_c} °C
        </h1>
        <div className='container'>
          <img
            src={yesterdayData?.forecast.forecastday[0].day.condition.icon}
            alt=''
          />
          <h3>{yesterdayData?.forecast.forecastday[0].day.condition.text}</h3>
        </div>
        <YesterdayDetails yesterdayData={yesterdayData} />
      </div>
      {/* {yesterday?.map((hour) => (
        <div>
          <p>{hour.temp_c}</p>
        </div>
      ))} */}
    </StyledYesterday>
  );
};

const StyledYesterday = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0px 22px 60px;
  .current-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin: 40px;
    .temperature {
      margin-top: 16px;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Yesterday;
