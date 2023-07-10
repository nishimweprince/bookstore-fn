import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoggedIn = ({ LoggedIn }) => {
  // HANDLE NAVIGATION
  const navigate = useNavigate();

  // HANDLE COOKIES
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <>
      <Container
        sx={
          !LoggedIn
            ? {
                display: 'none',
              }
            : null
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
            }}
          >
            You are already authenticated into{' '}
            <span
              style={{
                color: '#1E7A84',
              }}
            >
              Readr
            </span>
          </Typography>
          <Button
            sx={{
              margin: '1rem auto',
              fontWeight: '500',
              transition: 'all .2s ease-in-out',
              backgroundColor: '#1E7A84',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1E7A84',
                color: '#fff',
                transform: 'scale(1.05)',
                transition: 'all .2s ease-in-out',
              },
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Go to home screen
          </Button>
          <Button
            sx={{
              margin: '1rem auto',
              fontWeight: '500',
              transition: 'all .2s ease-in-out',
              backgroundColor: '#1E7A84',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1E7A84',
                color: '#fff',
                transform: 'scale(1.05)',
                transition: 'all .2s ease-in-out',
              },
            }}
            onClick={() => {
              localStorage.removeItem('token');
              removeCookie('user');
              navigate('/');
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoggedIn;
