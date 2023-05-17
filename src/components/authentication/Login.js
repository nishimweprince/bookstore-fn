import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import axios from 'axios';
import { env, cookies } from '../../constants';
import { useNavigate } from 'react-router-dom';

/**
 * @description LOGIN COMPONENT CLASSES
 */

const login = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '90%',
    margin: '1rem',
    borderRadius: '.5rem',
    transition: 'all .4s ease-in-out',
    transform: 'translateY(0)',
  },
  hideContainer: {
    display: 'none',
    transform: 'translateY(-200%)',
    transition: 'all .4s ease-in-out',
  },
  loginBox: {
    alignSelf: 'center',
    justifySelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  loginHeader: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '0 0 2rem 0',
  },
  loginInputs: {
    padding: '0',
    fontSize: '1.5rem',
    outline: 'none',
    width: '85%',
    textAlign: 'center',
    margin: '1rem auto',
  },
  loginForgotPassword: {
    fontSize: '1.5rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    backgroundImage: 'linear-gradient(#1E7A84, #1E7A84)',
    backgroundSize: '0% 0.1rem',
    backgroundPositionY: ' 103%',
    backgroundPositionX: '50%',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      transition: 'all .2s ease-in-out',
      backgroundSize: '100% 0.2rem',
      transform: 'scale(1.02)',
    },
  },
};

const Login = ({ loginForm }) => {

  // HANDLE NAVIGATION
  const navigate = useNavigate();

  // HANDLE LOADING STATE
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // HANDLE FORM DATA
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${env.apiUrl}:${env.port}/api/users/login`, formData)
      .then(({ data }) => {
        console.log(data);
        cookies.set('user', {
          id: data.user.id,
          token: data.token,
        }, { path: '/', maxAge: 604800 });
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
        navigate('/');
        }, 2000);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
        <Container sx={loginForm ? login.container : {
          ...login.container, ...login.hideContainer
        }}>
          <Box sx={login.loginBox}>
            {/* LOGIN HEADER */}
            <Typography variant="h3" sx={login.loginHeader}>
              Sign in using your Readr Account
            </Typography>
            {/* LOGIN INPUTS */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TextField
                size="normal"
                type="email"
                name="email"
                required
                label="Email or Username"
                variant="outlined"
                sx={login.loginInputs}
                onChange={handleFormData}
              />
              <TextField
                size="normal"
                type="password"
                name="password"
                required
                label="Password"
                variant="outlined"
                sx={login.loginInputs}
                onChange={handleFormData}
              />
            </Box>
            <FormControlLabel
              label="Remember me"
              control={
                <Checkbox
                  sx={{
                    fontSize: '1.6rem',
                  }}
                />
              }
              sx={{
                fontSize: '1.6rem',
                textAlign: 'center',
              }}
            />
            {/* LOGIN BUTTON */}
            <Button
              variant="contained"
              disableElevation
              disableRipple
              sx={
                !loading
                  ? {
                      width: '70%',
                      margin: 'auto',
                    }
                  : {
                      width: '70%',
                      display: 'none',
                    }
              }
              onClick={handleLogin}
            >
              Sign in
            </Button>
            <LoadingButton
              variant="text"
              color="primary"
              loading={loading}
              sx={
                loading
                  ? {
                      margin: '1rem auto',
                      fontWeight: '500',
                      transition: 'all .2s ease-in-out',
                    }
                  : {
                      margin: '0 auto',
                      transition: 'all .2s ease-in-out',
                    }
              }
            ></LoadingButton>
            <Typography
              variant="a"
              color="primary"
              sx={login.loginForgotPassword}
            >
              Forgot password?
            </Typography>
          </Box>
        </Container>
    </>
  );
};

export default Login;
