import React from 'react';
import styled from 'styled-components';
import CurrentDetails from './CurrentDetails';

const Current = ({ data }) => {
  return (
    <StyledCurrent>
      <div className='current-info'>
        <h2>{data.location.name}</h2>
        <h3>{data.location.country}</h3>
        <h1 className='temperature'>
          {data.current.temp_c} °C {/* / {data.current.temp_f} °F */}
        </h1>
        <div className='container'>
          <img src={data.current.condition.icon} alt='' />
          <h3>{data.current.condition.text}</h3>
        </div>
      </div>

      <CurrentDetails data={data} />
    </StyledCurrent>
  );
};

const StyledCurrent = styled.div`
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

export default Current;
