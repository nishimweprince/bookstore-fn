import { Box, Button, Container, Typography } from '@mui/material';
import Login from '../components/authentication/Login';
import { useEffect, useState } from 'react';
import Register from '../components/authentication/Register';
import { cookies, env } from '../constants';
import axios from 'axios';
import LoggedIn from '../components/authentication/LoggedIn';
import { useCookies } from 'react-cookie';

const Auth = () => {
  // DEFINE STATES
  const [loginForm, setLoginForm] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userCookie, setuserCookie] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  // SET USER DETAILS STATE
  const [userDetails, setUserDetails] = useState({});

  // FETCH USER DETAILS
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${env.apiUrl}/users/${userCookie.id}`,
        {
          headers: {
            Authorization: `Authorization=${userCookie.token}`,
          },
        }
      );
      setUserDetails(response.data.user);
    } catch (error) {
    }
  };

  // HANDLE LOGIN FORM
  const toggleForms = () => {
    setLoginForm(!loginForm);
    setRegistrationForm(!registrationForm);
  };

  const getUserCookie = async () => {
    if (cookie.user) {
      setLoggedIn(true);
      setRegistrationForm(false);
      setLoginForm(false);
      setuserCookie(userCookie);
    }
  };

  useEffect(() => {
    getUserCookie();
  }, []);

  useEffect(() => {
    if (userCookie) {
      fetchUserDetails();
    }
  }, [userCookie]);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '65vh',
          padding: '1rem',
          margin: 'auto',
          boxShadow: '0 0 5px 1px rgba(0,0,0,.2)',
          width: '50%',
        }}
      >
        <Login loginForm={loginForm} />
        <Register registrationForm={registrationForm} />
        <LoggedIn LoggedIn={loggedIn} />
        <hr
          style={{
            width: '90%',
            border: 'none',
            height: '0.15rem',
            margin: '1rem auto',
            backgroundImage: ' linear-gradient(to right, #ccc, #1E7A84, #ccc)',
          }}
        ></hr>
        <Box
          sx={
            loginForm
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 auto',
                }
              : {
                  display: 'none',
                }
          }
        >
          <Typography
            variant="p"
            sx={{
              fontSize: '1.4rem',
            }}
          >
            New to Readr?{' '}
          </Typography>
          <Button
            variant="text"
            disableElevation
            disableRipple
            disableTouchRipple
            disableFocusRipple
            value={'Register'}
            sx={{
              fontSize: '1.5rem',
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'scale(1.02)',
              },
            }}
            onClick={toggleForms}
          >
            Register
          </Button>
        </Box>
        <Box
          sx={
            registrationForm
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 auto',
                }
              : {
                  display: 'none',
                }
          }
        >
          <Typography
            variant="p"
            sx={{
              fontSize: '1.4rem',
            }}
          >
            Already have an Account?{' '}
          </Typography>
          <Button
            variant="text"
            disableElevation
            disableRipple
            disableTouchRipple
            disableFocusRipple
            value={'Register'}
            sx={{
              fontSize: '1.5rem',
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'scale(1.02)',
              },
            }}
            onClick={toggleForms}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
