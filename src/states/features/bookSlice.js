import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        bookId: '',
        books: [],
        bookCover: ''
    },
    reducers: {
        setBookId: (state, { payload }) => {
            state.bookId = payload;
        },
        setBooks: (state, { payload }) => {
            state.books = payload
        },
        setBookCover: (state, { payload }) => {
            state.bookCover = payload
        }
    }
})

export default bookSlice.reducer;

export const {
    setBookId, setBooks, setBookCover
} = bookSlice.actions;