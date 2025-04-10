import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      ...blue,
      main: "#435490",
    },
    background: {
      default: "#ebebeb",
      paper: "#ffffff",
    },
  },
  defaultColorScheme: "light",
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 20,
          "--mui-shape-borderRadius": 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          marginTop: "1px",
          border: "1px solid black",
          boxShadow: "none",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          boxShadow: 1,
        },
      },
      styleOverrides: {
        textPrimary: "#ffffff",
        containedPrimary: {
          backgroundColor: "#435490",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#3b4a8c",
          },
        },
      },
    },
  },
});

export default theme;
