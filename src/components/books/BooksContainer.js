import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    height: 'fit-content',
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
    width: '20rem',
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
    gap: '1rem',
    color: 'primary',
    height: '100%',
  },
  booksCardImage: {
    margin: '0 auto',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
    maxHeight: '100%',
    width: '100%',
    objectFit: 'contain',
  },
};

const BooksContainer = () => {
  // REACT NAVIGATE
  const navigate = useNavigate();

  /**
   *
   * @returns BOOKS CONTAINER COMPONENT
   */
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET BOOKS
  const getBooks = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}/books`);
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    getBooks();
  }, []);

  // HANDLE ASYNC LOADING
  if (loading) {
    return <div className='min-h-[80vh] flex items-center justify-center'>
      <h1 className='text-[3rem] font-bold'>Loading...</h1>
    </div>;
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
              <Typography
                variant="a"
                sx={booksContainer.booksCard}
                target="_blank"
                onClick={() => {
                  localStorage.setItem('bookId', book.id);
                  navigate(`/book/${book.slug}`);
                }}
                key={book.id}
              >
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
                      maxWidth: '100%',
                      height: '100%',
                      marginBottom: '.5rem',
                      textOverflow: 'ellipsis',
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
