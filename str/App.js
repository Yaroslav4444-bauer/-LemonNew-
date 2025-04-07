import logo from './logo.svg';
import './App.css';
import { makeStyles, createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {AppBar, Container, Toolbar, IconButton, Typography, Box, Stack} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { indigo } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight : theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}))

const themes1 = createTheme({
  palette: {
    theme1: {
      main: '#a9231a',
      light: '#e7bfc3',
      dark: '#700505',
      contrastText: '#f5e5e7',
    },
    theme2: {
      main: '#e7bfc3',
      light: '#E9DB5D',
      dark: '#a9231a',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

function App() {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar>
          <ThemeProvider theme={themes1}>
            <IconButton edge="start"
            color='inherit' aria-laabel="menu" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h7' className={classes.title}>Юмористические приключения по России</Typography>
            <Box mr={3}>
                <Button color='theme1' variant='contained'>Вход</Button>
            </Box>
              <Button color='theme2' variant='outlined'>Регистрация</Button>
          </ThemeProvider>
        </Toolbar>
      </Container>
    </AppBar> 

  );
}

export default App;
