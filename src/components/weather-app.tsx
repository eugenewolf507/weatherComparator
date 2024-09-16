'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XIcon, WindIcon, ThermometerIcon, CloudRainIcon } from 'lucide-react';

const API_KEY = '777af4cdd3fc4fb54dc3e102fea5c980';

interface WeatherData {
  name: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h': number;
  };
}

export function WeatherApp() {
  const [cities, setCities] = useState<string[]>([]);
  const [newCity, setNewCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (cities.length > 0) {
      fetchWeatherData();
    }
  }, [cities]);

  const fetchWeatherData = async () => {
    const cityNames = cities.join(',');
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=${API_KEY}`,
    );
    const data = await response.json();
    console.log('data', data);
    setWeatherData(data);
  };

  const addCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  const removeCity = (city: string) => {
    setCities(cities.filter((c) => c !== city));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <form onSubmit={addCity} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow"
        />
        <Button type="submit">Add City</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData && (
          <Card key={weatherData.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {weatherData.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCity(weatherData.name)}
                aria-label={`Remove ${weatherData.name}`}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {weatherData.main.temp_min.toFixed(1)}°C -{' '}
                  {weatherData.main.temp_max.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <WindIcon className="h-4 w-4 text-muted-foreground" />
                <span>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CloudRainIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {weatherData.rain ? weatherData.rain['1h'].toFixed(1) : '0'}{' '}
                  mm
                </span>
              </div>
            </CardContent>
          </Card>
        )}
        {/* {weatherData.map((city) => (
          <Card key={city.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{city.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCity(city.name)}
                aria-label={`Remove ${city.name}`}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {city.main.temp_min.toFixed(1)}°C -{' '}
                  {city.main.temp_max.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <WindIcon className="h-4 w-4 text-muted-foreground" />
                <span>{(city.wind.speed * 3.6).toFixed(1)} km/h</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CloudRainIcon className="h-4 w-4 text-muted-foreground" />
                <span>{city.rain ? city.rain['1h'].toFixed(1) : '0'} mm</span>
              </div>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
