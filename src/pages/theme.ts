import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const COLOR_CONFIG = {
  PRIMARY: '#435490',
  PRIMARY_HOVER: '#3b4a8c',
  WARNING: '#ee6400',
  WARNING_HOVER: '#d95f00',
  WHITE: '#ffffff',
  BG: '#ebebeb',
};

const theme = createTheme({
  palette: {
    primary: {
      ...blue,
      main: COLOR_CONFIG.PRIMARY,
    },
    background: {
      default: COLOR_CONFIG.BG,
      paper: COLOR_CONFIG.WHITE,
    },
    warning: {
      main: COLOR_CONFIG.WARNING,
    },
  },
  defaultColorScheme: 'light',
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: 'class',
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
          '--mui-shape-borderRadius': 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          marginTop: '1px',
          border: '1px solid black',
          boxShadow: 'none',
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
        textPrimary: COLOR_CONFIG.WHITE,
        containedPrimary: {
          backgroundColor: COLOR_CONFIG.PRIMARY,
          color: COLOR_CONFIG.WHITE,
          '&:hover': {
            backgroundColor: COLOR_CONFIG.PRIMARY_HOVER,
          },
        },
        // containedWarning: {
        //   backgroundColor: COLOR_CONFIG.WARNING,
        //   color: COLOR_CONFIG.WHITE,
        //   "&:hover": {
        //     backgroundColor: COLOR_CONFIG.WARNING_HOVER,
        //   },
        // },
      },
    },
  },
});

export default theme;
