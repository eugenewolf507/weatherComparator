import { LOCATION_IQ_AUTO_COMPLETE_URL } from './constant/index';

function App() {
  const locationKey = import.meta.env.VITE_LOCATIONIQ_KEY;
  const weatherKey = import.meta.env.VITE_TOMORROW_WEATHER_KEY;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch(
    `${LOCATION_IQ_AUTO_COMPLETE_URL}?q=lisbon&tag=place:city,place:town,place:village&key=${locationKey}`,
    options,
  )
    .then((response) => response.json())
    .then((response) => console.log('location', response))
    .catch((err) => console.error(err));

  // const weatherUrl = `https://api.tomorrow.io/v4/timelines?location=42.3478,-71.0466&fields=temperature,humidity,windSpeed,pollenTree,pollenGrass,pollenWeed&timesteps=current&apikey=${weatherKey}`;
  const weatherUrl = `https://api.tomorrow.io/v4/timelines?location=42.3478,-71.0466&location=34.0522,-118.2437&location=40.7128,-74.0060&fields=temperature,humidity,windSpeed&timesteps=current&apikey=${weatherKey}`;
  // const weatherUrl =
  //   'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=1BioDKnkHop6n0kQqPM4O9puFf5v2YOh';

  fetch(weatherUrl, options)
    .then((response) => response.json())
    .then((response) => console.log('weather', response))
    .catch((err) => console.error('weather error ', err));

  return (
    <>
      <h1>Weather Comparator</h1>
    </>
  );
}

export default App;
