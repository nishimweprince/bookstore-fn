import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { getBase64 } from '../helpers/uploads';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { env } from '../../constants';
import axios from 'axios';

/**
 *
 * @returns REGISTER COMPONENT CLASSES
 */

const register = {
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
    transform: 'translateY(200%)',
    transition: 'all .4s ease-in-out',
  },
  registrationHeader: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '2rem 0 2rem 0',
  },
  registrationBox: {
    alignSelf: 'center',
    justifySelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  registerInputs: {
    padding: '0',
    fontSize: '1.5rem',
    outline: 'none',
    width: '85%',
    textAlign: 'center',
    margin: '1rem auto',
  },
};

const Register = ({ registrationForm }) => {
  // DEFINE STATES
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 2,
    photo: '',
  });
  const [loading, setLoading] = useState(false);

  // HANDLE FORM DATA
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    await axios
      .post(`${env.apiUrl}/users/signup`, formData)
      .then(({ data }) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container
        sx={registrationForm ? register.container : register.hideContainer}
      >
        <Box sx={register.registrationBox}>
          <Typography variant="h3" sx={register.registrationHeader}>
            Register with email
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            alignItems: 'center',
            width: '100%',
          }}
          onChange={handleFormData}
        >
          <TextField
            label="Name"
            sx={register.registerInputs}
            required
            variant="outlined"
            name="name"
            type="text"
          />
          <TextField
            label="Email"
            sx={register.registerInputs}
            required
            variant="outlined"
            name="email"
            type="email"
          />
          <TextField
            label="Password"
            required
            variant="outlined"
            type="password"
            name="password"
            sx={register.registerInputs}
          />
          <TextField
            label="Confirm Password"
            required
            variant="outlined"
            type="password"
            name="confirmPassword"
            sx={register.registerInputs}
          />
          <FormControl sx={register.registerInputs} required>
            <Select value={formData.role} name="role" onChange={handleFormData}>
              <MenuItem value={2}>Select membership</MenuItem>
              <MenuItem value={0}>I have books to share</MenuItem>
              <MenuItem value={1}>I want to borrow books</MenuItem>
            </Select>
          </FormControl>
          <InputLabel
            sx={{
              fontSize: '1.5rem',
              color: 'black',
            }}
          >
            Upload profile picture
          </InputLabel>
          <TextField
            type="file"
            accept={'image/*'}
            name="photo"
            onChange={(e) => {
              handleFormData(e);
              getBase64(e.target.files[0], (result) => {
                setFormData({
                  ...formData,
                  photo: result,
                });
              });
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '1.5rem auto',
            }}
          >
            <Checkbox size="medium" />
            <Typography
              variant="p"
              sx={{
                fontSize: '1.5rem',
              }}
            >
              I agree to the{' '}
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'var(--primary-main)',
                  '&hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                to="#"
              >
                terms and conditions
              </Link>
            </Typography>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            disableRipple
            sx={
              !loading
                ? {
                    width: '70%',
                    fontSize: '1.5rem',
                    variant: 'contained',
                    margin: '1rem auto',
                  }
                : {
                    display: 'none',
                  }
            }
            onClick={handleFormSubmit}
          >
            Register
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
        </Box>
      </Container>
    </>
  );
};

export default Register;
