import styled from 'styled-components';
//icons
import { FaWater } from 'react-icons/fa';
import { BsFillSunFill, BsFillCloudRainFill } from 'react-icons/bs';
import { RiWindyFill } from 'react-icons/ri';
import React, { FC } from 'react';
import { ForecastDay } from '../features/weather/Weather-Api-slice';

interface yesterdayInterface {
  detailData: {
    forecast: {
      forecastday: ForecastDay[];
    };
  };
}

// interface ForecastDay {
//   day: {
//     avgtemp_c: number;
//     avghumidity: number;
//     uv: number;
//     maxwind_kph: number;
//     totalprecip_in: number;
//   };
// }

const YesterdayDetails = ({ detailData }: yesterdayInterface): JSX.Element => {
  // console.log(detailData);
  return (
    <StyledCurrentDetails>
      <h4>Details</h4>
      <div className='grid-container'>
        <div className='humidity card'>
          <div className='line'></div>
          <div className='icon-container'>
            <FaWater />
            <p>Humidity</p>
          </div>
          <h4>{detailData?.forecast.forecastday[0].day.avghumidity}%</h4>
        </div>
        <div className='uv-index card'>
          <div className='line'></div>
          <div className='icon-container'>
            <BsFillSunFill />
            <p>UV index</p>
          </div>
          <h4>{detailData?.forecast.forecastday[0].day.uv}</h4>
        </div>
        <div className='wind card'>
          <div className='line'></div>
          <div className='icon-container'>
            <RiWindyFill />
            <p>Wind</p>
          </div>
          <h4>{detailData?.forecast.forecastday[0].day.maxwind_kph} km/h</h4>
        </div>
        <div className='pressure card'>
          <div className='line'></div>
          <div className='icon-container'>
            <BsFillCloudRainFill />
            <p>Preciptation</p>
          </div>
          <h4>{detailData?.forecast.forecastday[0].day.totalprecip_in} inch</h4>
        </div>
      </div>
    </StyledCurrentDetails>
  );
};

const StyledCurrentDetails = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 20px;
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    grid-auto-rows: auto;

    grid-gap: 1rem;
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px 16px;

      background-color: #e9e9e9;
      box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.4);
      h4,
      p {
        color: #121212;
      }
      .line {
        height: 5px;
        width: 80%;
        border-radius: 5px;
        background-color: white;
        margin-bottom: 8px;
      }
      .icon-container {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
    .humidity {
      .line {
        background-color: #b4ebf6;
      }
      .icon-container {
        svg {
          path {
            fill: #b4ebf6;
          }
        }
      }
    }
    .uv-index {
      .line {
        background-color: #f5bc69;
      }
      .icon-container {
        svg {
          path {
            fill: #f5bc69;
          }
        }
      }
    }
    .wind {
      .line {
        background-color: #cab1f5;
      }
      .icon-container {
        svg {
          path:last-child {
            fill: #cab1f5;
          }
        }
      }
    }
    .pressure {
      .line {
        background-color: #e67ea1;
      }
      .icon-container {
        svg {
          path {
            fill: #e67ea1;
          }
        }
      }
    }
  }
`;

export default YesterdayDetails;
