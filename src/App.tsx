import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';

//WEATHER API
import { useFetchCurrentQuery } from './features/weather/Weather-Api-slice';
import logo from './logo.svg';
import './App.css';

function App() {
  //COUNTER STATE
  const count = useAppSelector((state) => state.counter.value);
  //LOCATION STATE
  const real = useAppSelector((state) => state.location.real);
  const dispatch = useAppDispatch();
  //states
  const [location, setCity]: any = useState('');
  //fetch API data
  const { data, error, isFetching } = useFetchCurrentQuery(location);

  useEffect(() => {
    // console.log(real);
  }, [real]);

  const updateCity = (e: any) => {
    e.preventDefault();
    setCity(e.target[0].value);
  };

  // const handlePlusTen = () => {
  //   dispatch(amountAdded(10));
  // };

  // const handleIncrement = () => {
  //   dispatch(incremented());
  // };

  return (
    <div className='App'>
      <header className='App-header'>
        {!real && <p>Enter Valid Location</p>}
        <form action='' onSubmit={updateCity}>
          <input type='text' placeholder='City or PostalCode' />{' '}
          <input type='submit' value='Submit' />
        </form>
        {data && (
          <div>
            <img src={data.current.condition.icon} alt='' />
            <h2>
              {data.current.temp_c} C / {data.current.temp_f} F
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
