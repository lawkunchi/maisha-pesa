// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import componentsOverrides from "./components";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C2C54",
    },
    secondary: {
      main: "#474787",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#ECECEC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2C54",
      secondary: "#474787",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Young Serif", serif',
    },
    h4: {
      fontFamily: '"Young Serif", serif',
    },
  },
  components: componentsOverrides(createTheme()),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2C2C54",
    },
    secondary: {
      main: "#474787",
    },
    background: {
      default: "#1e1e1e",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#AAABB8",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Young Serif", serif',
    },
    h4: {
      fontFamily: '"Young Serif", serif',
    },
  },
  components: componentsOverrides(createTheme()),
});

export { lightTheme, darkTheme };