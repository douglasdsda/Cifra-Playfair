import {
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

import { RiChatSettingsLine, RiMenuLine } from "react-icons/ri";

export function Footer() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="footer"
      w="100%"
       
      h="15"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      flexDir="row"
       justify="center"
    >
      <Text
        fontSize={["smal", "md"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="30"
      >
        Douglas Souza dos Anjos - 2021
      </Text>

      <Image w="25" h="30" src="/iftm.png" alt="IFTM" />
    </Flex>
  );
}
