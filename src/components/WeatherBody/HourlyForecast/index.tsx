import React from "react";
import Image from "next/image";

import { Container, UnorderedList, ListItem, Flex } from "@chakra-ui/react";

import WeatherSection from "../WeatherSection";

import getParam from "@/helper/getParam";
import useWeatherData from "@/hooks/useWeatherQuery";

import { WEATHER_IMAGE } from "@/constants/WeatherImage";
import type { WeatherHourlyType } from "@/types/WeatherType";

const HourlyForecast = ({hourly}: {hourly: WeatherHourlyType[]}) => {

  return (
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
        marginInline={0}
      >
        {hourly.map((val) => {
          return (
            <ListItem key={val.id}>
              <Flex
                flexDirection="column"
                gap="10"
                alignItems="center"
                width="28"
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
  );
};

export default HourlyForecast;
