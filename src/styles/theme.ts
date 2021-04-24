import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      color: mode("whiteAlpha.900", "whiteAlpha.900")(props),
      bg: mode("gray.900", "gray.900")(props),
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props) => ({
      dialog: {
        bg: mode("gray.900", "gray.100")(props),
      },
    }),
  },
};

export const theme = extendTheme({
  components,
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5c6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
  },
  
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles,
});
