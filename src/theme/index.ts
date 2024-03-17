import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { styles } from "./styles";
import { fontSizes } from "./fontSizes";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  sizes: {
    container: {
      lg: "1280px",
      xl: "1448px",
    },
  },
  fontSizes,
  colors,
});

export default theme;
