import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
  filter: "ALL",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook: (state, action) => {
      const updatedBook = action.payload;
      const index = state.books.findIndex(
        (book) => String(book.id) === String(updatedBook.id),
      );
      if (index != -1) {
        state.books[index] = updatedBook;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { addBook, deleteBook, updateBook, setFilter, setBooks } =
  bookSlice.actions;
export default bookSlice.reducer;
