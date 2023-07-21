import React from "react";

import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      className="full-height"
      justifyContent="center"
      alignItems="center"
      width="full"
    >
      <Spinner thickness="10px" speed="1s" width="52" height="52" />
    </Flex>
  );
};

export default Loading;
