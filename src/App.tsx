import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
//WEATHER API
import { useFetchCurrentQuery } from './features/weather/Weather-Api-slice';
import logo from './logo.svg';
import './App.css';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  //fetch API data
  const { data, error, isFetching } = useFetchCurrentQuery();

  // const [location, setLocation]: any = useState('toronto');

  // const updateLocation = (e: any) => {
  //   e.preventDefault();
  //   setLocation(e.target[0].value);
  //   console.log(location);
  // };

  // const handlePlusTen = () => {
  //   dispatch(amountAdded(10));
  // };

  // const handleIncrement = () => {
  //   dispatch(incremented());
  // };

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <form action='' onSubmit={updateLocation}>
          <input type='text' /> <input type='submit' value='Submit' />
        </form> */}
        {data && (
          <div>
            <img src={data.current.condition.icon} alt='' />
            <h2>
              {count ? `${data.current.temp_c} C` : `${data.current.temp_f} F`}
            </h2>
            <p>{data.location.name}</p>
            <p>{data.location.country}</p>
          </div>
        )}
        {/* <p>
          <button type='button' onClick={handleIncrement}>
            count is: {count}
          </button>
          <button type='button' onClick={handlePlusTen}>
            Count + 10: {count}
          </button>
        </p> */}
      </header>
      <div></div>
    </div>
  );
}

export default App;
