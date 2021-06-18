import {createMuiTheme} from '@material-ui/core/styles';

const arcBlue = '#0B73B0';
const arcOrange = '#FFBA60';


export default createMuiTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontSize: '1rem',
      fontFamily: 'Pacifico',
      textTransform: 'none',
      color: 'white'
    }
  }
});
