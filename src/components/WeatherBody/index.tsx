import React from "react";
import Image from "next/image";

import { Flex, Container, UnorderedList, ListItem } from "@chakra-ui/react";

import WeatherSection from "./WeatherSection";
import WeatherInformation from "./WeatherInformation";
import IconComponent from "./IconComponent";

import { WEATHER_IMAGE } from "@/constants/WeatherImage";
import { WeatherAndForecastType } from "@/types/WeatherType";

const WeatherBody = ({
  badResponse,
  weather,
}: {
  badResponse: boolean;
  weather: WeatherAndForecastType;
}) => {
  return badResponse ? (
    <Flex
      as="section"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 6rem)"
      fontSize="2xl"
      fontWeight="bold"
    >
      Can&lsquo;t find the place that you looking for
    </Flex>
  ) : (
    <Flex
      as="main"
      flexDirection="column"
      alignItems="center"
      width={{ lg: "calc(100% - 15rem)" }}
      minHeight="calc(100vh - 6rem)"
      gap="14"
      paddingInline={{ base: "5", md: "20" }}
      paddingBottom="20"
      marginLeft={{ lg: "auto" }}
    >
      <Flex
        as="section"
        flexDirection={{ base: "column", md: "row-reverse" }}
        gap="20"
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        paddingInline={{ md: "10%" }}
        width={{ base: "48", md: "full" }}
        height={{ base: "sm", md: "52" }}
      >
        <Image
          src={`/${
            WEATHER_IMAGE[
              weather.weatherDatas?.main.toLowerCase() as keyof typeof WEATHER_IMAGE
            ]
          }.svg`}
          alt={weather.weatherDatas?.description}
          title={weather.weatherDatas?.description}
          width="150"
          height="150"
          priority
        />
        <Flex
          flexDirection="column"
          textAlign={{ base: "center", md: "start" }}
          gap={{ md: "4" }}
        >
          <Container
            as="span"
            fontSize={{ base: "1.5rem", md: "3rem" }}
            paddingInline="0"
          >
            {weather.weatherDatas?.country}
          </Container>
          <Container as="span" fontSize="3rem" paddingInline="0">
            {weather.weatherDatas?.temperature - 273}&#8451;
          </Container>
          <Flex gap="8">
            <span className="title">{weather.weatherDatas?.description}</span>
            {/* <Flex gap="3">
              <Image
                src="/precipitation.svg"
                alt="Precipitation"
                title="Precipitation"
                width="25"
                height="25"
              />
              <span>10%</span>
           </Flex> */}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        width="full"
        gap="14"
      >
        <WeatherSection>
          <Container
            as="h3"
            marginInline="auto"
            paddingInline="0"
            width="fit-content"
            fontSize="2xl"
          >
            Hourly Forecast
          </Container>
          <UnorderedList
            display="flex"
            justifyContent="start"
            alignItems="end"
            height="80%"
            marginTop="auto"
            overflowX="scroll"
            listStyleType="none"
          >
            {weather.weatherForecast?.hourly.map((val) => {
              return (
                <ListItem key={val.id}>
                  <Flex
                    flexDirection="column"
                    gap="10"
                    alignItems="center"
                    width="24"
                  >
                    <Flex flexDirection="column" alignItems="center" gap="5">
                      <Image
                        src={`/light/${
                          WEATHER_IMAGE[
                            val.main.toLowerCase() as keyof typeof WEATHER_IMAGE
                          ]
                        }.svg`}
                        alt={val.description}
                        title={val.description}
                        width="30"
                        height="30"
                      />
                      <span>{val.temperature - 273}&#8451;</span>
                    </Flex>
                    <span>{val.time} : 00</span>
                  </Flex>
                </ListItem>
              );
            })}
          </UnorderedList>
        </WeatherSection>
        <WeatherSection>
          <Container
            as="h3"
            marginInline="auto"
            paddingInline="0"
            width="fit-content"
            fontSize="2xl"
          >
            Daily Forecast
          </Container>
          <UnorderedList
            display="flex"
            height="80%"
            flexDirection="row"
            alignItems="end"
            marginTop="auto"
            overflowX="scroll"
            listStyleType="none"
          >
            {weather.weatherForecast?.daily.map((val) => {
              return (
                <ListItem key={val.id}>
                  <Flex
                    flexDirection="column"
                    gap="10"
                    alignItems="center"
                    width="24"
                  >
                    <Flex flexDirection="column" alignItems="center" gap="5">
                      <Image
                        src={`/light/${
                          WEATHER_IMAGE[
                            val.main.toLowerCase() as keyof typeof WEATHER_IMAGE
                          ]
                        }.svg`}
                        alt={val.description}
                        title={val.description}
                        width="30"
                        height="30"
                      />
                      <span>{val.temperature - 273}&#8451;</span>
                    </Flex>
                    <span>{val.time}</span>
                  </Flex>
                </ListItem>
              );
            })}
          </UnorderedList>
        </WeatherSection>
      </Flex>

      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        width="full"
        gap="14"
      >
        <WeatherSection>
          <UnorderedList
            display="flex"
            flexDirection="column"
            gap="8"
            marginLeft="0"
          >
            <WeatherInformation title="Temperature High/Low">
              <IconComponent src="/temperature.svg" alt="Temperature" />
              <span>
                {weather.weatherDatas?.temperature_max - 273}&#8451; /{" "}
                {weather.weatherDatas?.temperature_min - 273}&#8451;
              </span>
            </WeatherInformation>
            <WeatherInformation title="Wind">
              <IconComponent src="/wind.svg" alt="Wind" />
              <span>
                {(weather.weatherDatas?.wind_speed * 3.6).toFixed(2)} km/h
              </span>
            </WeatherInformation>
            <WeatherInformation title="Humidity">
              <IconComponent src="/humidity.svg" alt="Humidity" />
              <span>{weather.weatherDatas?.humidity} &#37;</span>
            </WeatherInformation>
            <WeatherInformation title="Pressure">
              <IconComponent src="/pressure.svg" alt="Pressure" />
              <span>{weather.weatherDatas?.pressure} hPa</span>
            </WeatherInformation>
            <WeatherInformation title="Visibility">
              <IconComponent src="/visibility.svg" alt="Wind Direction" />
              <span>{weather.weatherDatas?.visibility} km</span>
            </WeatherInformation>
            {/* <WeatherInformation title="UV">
              <span>UV</span>
              <span>30&#8451; / 10&#8451;</span>
            </WeatherInformation> */}
          </UnorderedList>
        </WeatherSection>

        {/* <WeatherSection>
          <Container
            as="h3"
            marginInline="auto"
            paddingInline="0"
            width="fit-content"
            fontSize="2xl"
          >
            Precipitation
          </Container>
          <Stack
            height="80%"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="end"
            marginTop="auto"
            overflowX="scroll"
          >
            {weather.weatherForecast?.}
          </Stack>
        </WeatherSection> */}
      </Flex>
    </Flex>
  );
};

export default WeatherBody;
