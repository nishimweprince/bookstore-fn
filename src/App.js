import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Container, ThemeProvider, createTheme } from '@mui/material';
// IMPORT FONTS
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import SingleBook from './components/book/SingleBook';

/**
 *
 * CONFIGURE CUSTOM THEME
 */

const theme = createTheme({
  palette: {
    primary: {
      main: '#19575a',
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
          <Route path='/book/:slug' element={<SingleBook />} />
        </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
