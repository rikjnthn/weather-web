import React from "react";
import Image from "next/image";

import { Flex, UnorderedList, ListItem, Container } from "@chakra-ui/react";

import { WeatherDailyType } from "@/types/WeatherType";
import WeatherSection from "../WeatherSection";
import { WEATHER_IMAGE } from "@/constants/WeatherImage";

const DailyForecast = ({ daily }: { daily: WeatherDailyType[] }) => {
  return (
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
        marginInline={0}
      >
        {daily.map((val) => {
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
  );
};

export default DailyForecast;
