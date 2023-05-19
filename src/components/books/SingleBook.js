import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cookies, env } from '../../constants';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SingleBook = () => {
  // FETCH BOOK ID FROM LOCAL STORAGE
  const bookId = localStorage.getItem('bookId');

  // INITIALIZE STATES
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // CATCH USER COOKIE
  const userCookie = cookies.get('user');

  /**
   * SINGLE BOOK COMPONENT CLASSES
   */

  const singleBook = {
    // MAIN CONTAINER
    container: {
      display: 'grid',
      gridTemplateColumns: '60% 35%',
      gridGap: '2%',
      width: '90%',
      margin: 'auto',
      minHeight: '90vh',
      padding: '4rem 1rem',
    },
    // BOOK DETAILS
    bookDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      height: '100%',
      margin: '0 auto',
    },
    bookDetailsImageContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center',
      padding: '2rem 0',
      minHeight: '50&',
      boxShadow: '0 2px 10px 2px rgba(0,0,0,0.2)',
    },
    bookDetailsImage: {
      maxWidth: '90%',
      height: 'auto',
      maxHeight: '100%',
      margin: '0 auto',
      objectFit: 'contain',
      borderRadius: '.3rem',
      padding: '0',
      boxShadow: '0 5px 10px 2px rgba(0,0,0,0.2)',
    },
    // BOOK SYNOPSIS
    bookSynposis: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      height: '100%',
      borderRadius: '.3rem',
      margin: '0 auto',
      padding: '2rem 0',
    },
    bookCategory: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    bookSynopsisDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.1rem',
    },
    bookSynopsisList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.01rem',
    },
    bookSynopsisListItem: {
      display: 'flex',
      gap: '.3rem',
      fontSize: '1.3rem',
      padding: '.5rem 0',
    },
    linkButton: {
      color: '#17583a',
      textDecoration: 'none',
    },
  };
  const getBookDetails = async () => {
    /**
     * @description - FETCH BOOK DETAILS FROM API
     */

    try {
      const response = await axios.get(
        `${env.apiUrl}:${env.port}/api/books/${bookId}`
      );
      const { data } = response;
      setBookDetails(data.book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  const { author, genre, user } = bookDetails;

  /**
   * @description HANDLE FAVORITE BOOK
   */

  // ADD BOOK TO FAVORITES
  const addBookToFavorites = async () => {
    try {
      const response = await axios.post(
        `${env.apiUrl}:${env.port}/api/users/favorites/${bookDetails.id}`,
        null,
        {
          headers: {
            authorization: `Authorization=${userCookie.token}`,
          },
        }
      );
      console.log(response.data);
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
      setIsFavorite(false);
    }
  };

  // REMOVE BOOK FROM FAVORITES
  const removeBookFromFavorites = async () => {
    try {
      const response = await axios.delete(
        `${env.apiUrl}:${env.port}/api/users/favorites/${bookDetails.id}`,
        {
          headers: {
            authorization: `Authorization=${userCookie.token}`,
          },
        }
      );
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
      setIsFavorite(true);
    }
  };

  // CHECK IF BOOK IS IN FAVORITES
  const checkIfBookIsInFavorites = async () => {
    try {
      const response = await axios.get(
        `${env.apiUrl}:${env.port}/api/users/favorites/${bookId}`,
        {
          headers: {
            authorization: `Authorization=${userCookie.token}`,
          },
        }
      );
      const { data } = response;
      if (!data.status) {
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(error);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkIfBookIsInFavorites();
  }, []);

  return (
    <>
      <Container sx={singleBook.container}>
        {/* BOOK SYNOPSIS */}
        <Container sx={singleBook.bookSynposis}>
          {/* BOOK CATEGORY */}
          <Box sx={singleBook.bookCategory}>
            <Typography
              variant="p"
              sx={{
                fontSize: '1.5rem',
                color: '#1E7A84',
              }}
            >
              E-Book
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                color: 'black',
              }}
            >
              {genre && genre.name}
            </Typography>
          </Box>
          {/* BOOK DETAILS (TITLE AND AUTHOR) */}
          <Box sx={singleBook.bookSynopsisDetails}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '4rem',
                fontWeight: '500',
                maxWidth: '70%',
              }}
            >
              {bookDetails.title}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: '500',
                margin: '.1rem 0',
              }}
            >
              By {author && author.name}
            </Typography>
          </Box>
          {/* BORROW BOOK */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Button
              sx={{
                backgroundColor: '#1E7A84',
                color: '#fff',
                padding: '.5rem 1rem',
                width: '50%',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#1E7A84',
                  color: '#fff',
                  transform: 'scale(.95)',
                  transition: 'all .2s ease-in-out',
                },
              }}
            >
              Borrow this book
            </Button>
            <Typography sx={singleBook.bookSynopsisListItem}>
              Added by
              <Link
                to={`/users/${user && user.slug}`}
                style={singleBook.linkButton}
              >
                {user && user.name}
              </Link>
            </Typography>
          </Box>
          {/* BOOK DETAILS (ISBN, PUBLISHED, AUTHOR, GENRE, COPIES) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '2rem',
              }}
            >
              About this edition
            </Typography>
            <Paper
              elevation={1}
              sx={{
                padding: '0 1rem',
              }}
            >
              <List sx={singleBook.bookSynopsisList}>
                <ListItem sx={singleBook.bookSynopsisListItem}>
                  {' '}
                  ISBN: {bookDetails.isbn}
                </ListItem>
                <ListItem sx={singleBook.bookSynopsisListItem}>
                  {' '}
                  Published: {bookDetails.releaseYear}
                </ListItem>
                <ListItem sx={singleBook.bookSynopsisListItem}>
                  Author:
                  <Link
                    to={`/authors/${author && author.slug}`}
                    style={singleBook.linkButton}
                  >
                    {' '}
                    {author && author.name}
                  </Link>
                </ListItem>
                <ListItem sx={singleBook.bookSynopsisListItem}>
                  Genre: {genre && genre.name}
                </ListItem>
                <ListItem sx={singleBook.bookSynopsisListItem}>
                  Copies Available: {bookDetails.copies}
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Container>
        {/* BOOK DETAILS */}
        <Container sx={singleBook.bookDetails}>
          <Box sx={singleBook.bookDetailsImageContainer}>
            <Image
              src={bookDetails && bookDetails.cover}
              style={singleBook.bookDetailsImage}
              fit="contain"
              wrapperStyle={{ width: 'auto', height: '80%', margin: '0' }}
            />
            <Button
              disableFocusRipple
              disableTouchRipple
              disableElevation
              sx={{
                backgroundColor: '#1E7A84',
                color: 'white',
                margin: '0 auto',
                borderRadius: '.3rem',
                boxShadow: '0 0 10px 2px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#1E7A84',
                  color: 'white',
                  transform: 'scale(1.02)',
                },
                fontSize: '1.5rem',
              }}
              startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={
                isFavorite ? removeBookFromFavorites : addBookToFavorites
              }
            >
              Add to favorites
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default SingleBook;
