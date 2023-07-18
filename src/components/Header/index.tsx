import React, { useRef } from "react";
import Image from "next/image";

import { Flex, Button, Input } from "@chakra-ui/react";
import DOMPurify from "dompurify";

const Header = () => {

  const inpRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const inp = DOMPurify.sanitize(inpRef.current?.value ?? "", {
      ALLOWED_TAGS: [],
    });

    const param = new URL(window.location.href);
    param.searchParams.set("city", inp);
    window.location.href = param.toString();
  };
  return (
    <Flex
      as="header"
      width="full"
      height="24"
      alignItems="center"
      paddingInline={{ base: "5", sm: "14" }}
    >
      <Flex
        as="form"
        onSubmit={handleSubmit}
        width={{ base: "75%", sm: "auto" }}
        alignItems="center"
        borderRadius="full"
        marginLeft="auto"
        border="2px solid"
        paddingInline="0"
        background="transparent"
      >
        <Input
          ref={inpRef}
          variant="unstyled"
          type="text"
          name="city"
          autoFocus
          placeholder="City"
          width="full"
          height="full"
          paddingInline="0"
          paddingLeft="4"
          borderStartRadius="full"
          required
          autoComplete="off"
        />
        <Button
          type="submit"
          backgroundColor="gray.100"
          borderEndRadius="full"
          paddingInline="0"
          transition="none"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          <Image src="/search.svg" alt="search icon" width="20" height="25" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
