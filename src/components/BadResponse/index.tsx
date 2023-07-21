import React from "react";

import { Flex, Container } from "@chakra-ui/react";

const BadResonse = () => {
  return (
    <Flex
      as="section"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 6rem)"
      textAlign="center"
      fontSize="2xl"
      fontWeight="bold"
    >
      <Container as="span">
        Can&#39;t find the place that you looking for
      </Container>
    </Flex>
  );
};

export default BadResonse;
