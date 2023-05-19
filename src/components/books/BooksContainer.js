import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { env } from '../../constants';
import Image from 'mui-image';

/**
 * @return BOOKS CONTAINER COMPONENT CLASSES
 */
const booksContainer = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '3rem',
    padding: '1rem',
    flexWrap: 'wrap',
    margin: '0 auto 3rem auto',
    height: 'auto',
  },
  containerHeading: {
    fontSize: '3rem',
    fontWeight: '500',
    textAlign: 'center',
  },
  booksBox: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '30rem',
    gap: '1.5rem',
  },
  booksCard: {
    height: 'auto',
    width: '15rem',
    padding: '2rem',
    display: 'grid',
    gridTemplateRows: '70% 25%',
    textDecoration: 'none',
    gap: '1rem',
    cursor: 'pointer',
    boxShadow: '0 0 5px 0 rgba(0,0,0,0.2)',
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      transform: 'scale(1.01)',
      transition: 'all 0.4s ease-in-out',
    },
    backgroundColor: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
  },
  booksCardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    color: 'primary',
    height: '100%',
  },
  booksCardImage: {
    margin: '0 auto',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
    maxHeight: '100%',
    width: '100%',
  },
};

const BooksContainer = () => {

  // REACT NAVIGATE
  const navigate = useNavigate();

  /**
   *
   * @returns BOOKS CONTAINER COMPONENT
   */
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // GET BOOKS
  const getBooks = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}:${env.port}/api/books`);
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    getBooks();
  }, []);

  // HANDLE ASYNC LOADING
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container sx={booksContainer.container}>
        {/* HEADING */}
        <Typography
          variant="h2"
          color="primary"
          sx={booksContainer.containerHeading}
        >
          Top Reads
        </Typography>
        {/* BOOKS CARDS */}
        <Box sx={booksContainer.booksBox}>
          {books.map((book, index) => {
            return (
              <Typography variant='a' sx={booksContainer.booksCard} target="_blank" onClick={() => {
                localStorage.setItem('bookId', book.id)
                navigate(`/book/${book.slug}`)
              }} key={book.id}>
                <Image
                  style={booksContainer.booksCardImage}
                  src={book.cover}
                  alt={book.title}
                />
                <Box sx={booksContainer.booksCardDetails}>
                  <Typography
                    variant="p"
                    color="primary"
                    sx={{
                      fontSize: '1.3rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {book.genre.name}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: '1.5rem',
                      maxWidth: '80%',
                      marginBottom: '.5rem',
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="p"
                    color="primary"
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: '500',
                    }}
                  >
                    {book.author.name}
                  </Typography>
                </Box>
              </Typography>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default BooksContainer;
