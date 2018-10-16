import { createMuiTheme } from '@material-ui/core/styles';

export const engTheme = createMuiTheme({
  palette: {
    primary: {
        main: '#6200EE'
    },
    secondary: {
        main: '#03DAC5'
    }
  },
});

export const korTheme = createMuiTheme({
  palette: {
    primary: {
        main: '#6200EE'
    },
    secondary: {
        main: '#03DAC5'
    }
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif'
  }
});