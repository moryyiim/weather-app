import { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(
        `${api.base}weather?q=${query}&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 75
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            className='search-bar'
            placeholder='Search Location...'
            type='text'
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}ºF</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ''
        )}
        <div className='container'>
          {weather.name !== undefined && (
            <div className='bottom'>
              <div className='feels'>
                {weather.main ? (
                  <p className='bold'>{weather.main.feels_like}</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {weather.main ? (
                  <p className='bold'>{weather.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {weather.wind ? (
                  <p className='bold'>{weather.wind.speed} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
