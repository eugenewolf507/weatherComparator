// import { LOCATION_IQ_AUTO_COMPLETE_URL } from './constant/index';
// import { WeatherApp } from '@/components/weather-app';
import { fetchWeatherApi } from 'openmeteo';

function App() {
  // const locationKey = import.meta.env.VITE_LOCATIONIQ_KEY;
  // const weatherKey = import.meta.env.VITE_TOMORROW_WEATHER_KEY;
  // const options = { method: 'GET', headers: { accept: 'application/json' } };

  // fetch(
  //   `${LOCATION_IQ_AUTO_COMPLETE_URL}?q=lisbon&tag=place:city,place:town,place:village&key=${locationKey}`,
  //   options,
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log('location', response))
  //   .catch((err) => console.error(err));

  // const weatherUrl = `https://api.tomorrow.io/v4/timelines?location=42.3478,-71.0466&fields=temperature,humidity,windSpeed,pollenTree,pollenGrass,pollenWeed&timesteps=current&apikey=${weatherKey}`;
  // const weatherUrl = `https://api.tomorrow.io/v4/timelines?location=42.3478,-71.0466&location=34.0522,-118.2437&location=40.7128,-74.0060&fields=temperature,humidity,windSpeed&timesteps=current&apikey=${weatherKey}`;
  // const weatherUrl =
  //   'https://api.tomorrow.io/v4/weather/forecast?location=34.0522,-118.2437&location=42.3478,-71.0466&apikey=1BioDKnkHop6n0kQqPM4O9puFf5v2YOh';

  // const API_KEY = '777af4cdd3fc4fb54dc3e102fea5c980';
  // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`;

  // fetch(weatherUrl, options)
  //   .then((response) => response.json())
  //   .then((response) => console.log('weather', response))
  //   .catch((err) => console.error('weather error ', err));
  const getWeatherData = async () => {
    const params = {
      latitude: [50.45, 48.62, 50.88, 41.15, 42.23, 43.37],
      longitude: [30.52, 22.3, 12.08, -8.61, -8.72, -8.4],
      daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'],
      forecast_days: 1,
    };
    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);

    console.log('responses', responses);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval(),
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
        precipitationSum: daily.variables(2)!.valuesArray()!,
      },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      console.log(
        weatherData.daily.time[i].toISOString(),
        weatherData.daily.temperature2mMax[i],
        weatherData.daily.temperature2mMin[i],
        weatherData.daily.precipitationSum[i],
      );
    }
  };

  getWeatherData();

  return <>{/* <WeatherApp /> */}</>;
}

export default App;
