import React from "react";

import { UnorderedList } from "@chakra-ui/react";

import { WeatherInformationType } from "@/types/WeatherType";

import WeatherSection from "../WeatherSection";
import WeatherInformation from "../WeatherInformation";
import IconComponent from "../IconComponent";

const WeatherData = ({ weather }: { weather: WeatherInformationType }) => {
  return (
    <WeatherSection>
      <UnorderedList
        display="flex"
        flexDirection="column"
        gap="8"
        marginLeft="0"
      >
        <WeatherInformation title="Temperature High/Low">
          <IconComponent src="/temperature.svg" alt="Temperature" />
          <div>
            <span>{weather.temperature_max - 273}&#8451; / </span>
            <span>{weather.temperature_min - 273}&#8451;</span>
          </div>
        </WeatherInformation>
        <WeatherInformation title="Wind">
          <IconComponent src="/wind.svg" alt="Wind" />
          <span>{(weather.wind_speed * 3.6).toFixed(2)} km/h</span>
        </WeatherInformation>
        <WeatherInformation title="Humidity">
          <IconComponent src="/humidity.svg" alt="Humidity" />
          <span>{weather.humidity} &#37;</span>
        </WeatherInformation>
        <WeatherInformation title="Pressure">
          <IconComponent src="/pressure.svg" alt="Pressure" />
          <span>{weather.pressure} hPa</span>
        </WeatherInformation>
        <WeatherInformation title="Visibility">
          <IconComponent src="/visibility.svg" alt="Visibility" />
          <span>{weather.visibility} km</span>
        </WeatherInformation>
      </UnorderedList>
    </WeatherSection>
  );
};

export default WeatherData;
