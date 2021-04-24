import {
  Flex,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

import { RiChatSettingsLine, RiMenuLine } from "react-icons/ri";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        Playfair Cipher
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

       
    </Flex>
  );
}
