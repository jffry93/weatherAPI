import React from 'react';
import styled from 'styled-components';
//icons
import { FaWater, FaWeightHanging } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import { RiWindyFill } from 'react-icons/ri';

const CurrentDetails = ({ data }) => {
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
          <h4>{data.current.humidity}%</h4>
        </div>
        <div className='uv-index card'>
          <div className='line'></div>
          <div className='icon-container'>
            <BsFillSunFill />
            <p>UV index</p>
          </div>

          <h4>{data.current.uv}</h4>
        </div>
        <div className='wind card'>
          <div className='line'></div>
          <div className='icon-container'>
            <RiWindyFill />
            <p>Wind</p>
          </div>
          <h4>{data.current.wind_kph} km/h</h4>
        </div>
        <div className='pressure card'>
          <div className='line'></div>
          <div className='icon-container'>
            <FaWeightHanging />
            <p>Pressure</p>
          </div>
          <h4>{data.current.pressure_mb} mbar</h4>
        </div>
      </div>
      <div className='container'>
        <button>More Details</button>
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
  button {
    margin-top: 32px;
    font-size: 18px;
    padding: 8px 32px;
    border-radius: 3px;
    width: fit-content;
    box-shadow: 0px 2px 60px 5px rgba(252, 164, 38, 0.1);
  }
`;

export default CurrentDetails;
