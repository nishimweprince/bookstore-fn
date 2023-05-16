import React, { useState } from 'react';
import './Navbar.css';
import {
  Toolbar,
  Container,
  AppBar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

/**
 *
 * @returns NAVBAR COMPONENT CLASSES
 */

const navbar = {
  // APPBAR
  appBar: {
    padding: '0 3rem',
    transition: 'all .1s ease-in-out',
    borderRadius: '.3rem',
    elevation: '0',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '90%',
    margin: '0 auto',
  },

  // CONTAINER
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },

  // LOGO
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.6rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(.99)',
    },
    backgroundImage: 'linear-gradient(to right, #19575a, #218e9c, #24a2b5)',
    padding: '1rem 1.5rem',
    color: '#fff',
    borderRadius: '.5rem',
  },

  // MENU BUTTON
  menuButton: {
    outline: 'none',
    elevation: '0',
    padding: '.5rem .5rem',
    textTransform: 'none',
    fontSize: '1.5rem',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#fff',
      transform: 'scale(1.02)',
    },
  },

  // BOX
  box: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: '1rem',
  },

  /* 
    TOOLBAR
  */
  // TOOLBAR LEFT
  toolbarLeft: {
    display: 'flex',
    gap: '4rem',
    alignItems: 'center',
    padding: '0 1rem',
  },

  // TOOLBAR RIGHT
  toolbarRight: {
    display: 'flex',
    gap: '2rem',
  },

  // ICONS
  icons: {
    padding: '0',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
  },

  // UPLOAD BUTTON
  uploadButton: {
    outline: 'none',
    elevation: '0',
    padding: '.5rem 1.5rem',
    textTransform: 'none',
    fontSize: '1.6rem',
    backgroundColor: '#1E7A84',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#19575a',
      color: '#fff',
      transform: 'scale(.99)',
    },
  },
};

/**
 *
 * @returns PAGE NAVIGATION
 */

const pages = [
  {
    title: 'Categories',
    url: '#',
  },
  {
    title: "Editor's Choice",
    url: '/editorial',
  },
];

const Navbar = () => {
  return (
    <>
      <Container maxWidth={false} sx={navbar.container}>
        <AppBar position="static" color='default' sx={navbar.appBar}>
          <Toolbar disableGutters sx={navbar.toolbarLeft}>
            <Typography variant="h6" sx={navbar.logo}>
              Readr
            </Typography>
            <Box sx={navbar.box}>
              {pages.map((page, index) => {
                return (
                  <Button
                    size="small"
                    variant="primary"
                    key={index}
                    sx={navbar.menuButton}
                    endIcon={
                      page.title == 'Categories' ? (
                        <KeyboardArrowDownOutlinedIcon sx={navbar.icons} />
                      ) : null
                    }
                  >
                    {page.title}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
          <Toolbar disableGutters sx={navbar.toolbarRight}>
            <Button
              endIcon={<FileUploadOutlinedIcon />}
              sx={navbar.uploadButton}
            >
              Upload
            </Button>
            <Box>
              <IconButton>
                <Avatar
                  sx={{ width: 25, height: 25 }}
                  src="https://res.cloudinary.com/nishimweprince/image/upload/v1683983573/bookstore/users/default_zqfkfp.png"
                ></Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Navbar;
