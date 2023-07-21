import React from "react";

import { ListItem } from "@chakra-ui/react";

const WeatherInformation = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <ListItem
      display='flex'
      title={title}
      justifyContent='space-between'
      alignItems="center"
      width='full'
    >
      {children}
    </ListItem>
  );
};

export default WeatherInformation;
