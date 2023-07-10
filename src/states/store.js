import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import bookReducer from './features/bookSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    book: bookReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
