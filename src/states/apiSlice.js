import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `authorization=${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => {
        return `/books`;
      },
    }),
    addToFavorites: builder.mutation({
      query: ({ bookId }) => ({
        url: `/users/favorites/${bookId}`,
        method: 'POST',
      }),
    }),
    getSingleBook: builder.query({
      query: ({ bookId }) => {
        return `books/${bookId}`;
      },
    }),
    removeFromFavorites: builder.mutation({
      query: ({ bookId }) => ({
        url: `/users/favorites/${bookId}`,
        method: 'DELETE',
      }),
    }),
    checkIsFavorite: builder.query({
      query: ({ bookId }) => ({
        url: `users/favorites/${bookId}`
      })
    }),
    addBook: builder.mutation({
      query: ({ book }) => ({
        url: `/books`,
        method: 'POST',
        body: {...book}
      }),
    }),
    deleteBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useLazyGetSingleBookQuery,
  useLazyCheckIsFavoriteQuery,
  useAddBookMutation,
  useDeleteBookMutation,
} = apiSlice;
