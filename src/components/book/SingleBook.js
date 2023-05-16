import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../constants';

const SingleBook = () => {
  // FETCH BOOK ID FROM LOCAL STORAGE
  const bookId = localStorage.getItem('bookId');

  // INITIALIZE STATES
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @description - FETCH BOOK DETAILS FROM API
   */

  const getBookDetails = async () => {
    try {
      const response = await axios.get(
        `${env.apiUrl}:${env.port}/api/books/${bookId}`
      );
      const { data } = response;
      setBookDetails(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  return <></>;
};

export default SingleBook;
