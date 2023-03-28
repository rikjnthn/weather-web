export interface WeatherTypeApi {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  name: string;
}

export interface WeatherImageType {
  "clear sky": string;
  "few clouds": string;
  "scattered clouds": string;
  "broken clouds": string;
  "shower rain": string;
  rain: string;
  thunderstorm: string;
  snow: string;
  mist: string;
}

export interface WeatherType {
  main: string;
  description: string;
  temperature: number;
  temperature_max: number;
  temperature_min: number;
  pressure: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  country: string;
}

export interface WeatherForecastApiType {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: [
      {
        main: string;
        description: string;
      }
    ];
  }>;
}

export interface WeatherForecastType {
  hourly: Array<{
    id: number;
    time: string;
    main: string;
    description: string;
    temperature: number;
  }>;
  daily: Array<{
    id: number;
    time: string;
    main: string;
    description: string;
    temperature: number;
  }>;
}

export interface WeatherAndForecastType {
  weatherDatas: WeatherType;
  weatherForecast: WeatherForecastType;
}

