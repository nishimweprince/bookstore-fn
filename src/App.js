import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { Container, ThemeProvider, createTheme } from '@mui/material';
// IMPORT FONTS
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import SingleBook from './components/books/SingleBook';
import Auth from './pages/Auth';
import Register from './components/authentication/Register';
import CreateBook from './components/books/CreateBook';

/**
 *
 * CONFIGURE CUSTOM THEME
 */

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E7A84',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.6rem',
        },
      },
    },
   Typography: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.6rem',
        },
      },
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth={false}>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route path="/book/:slug" element={<SingleBook />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/create" element={<CreateBook />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
