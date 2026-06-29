import axios from "axios";

const API = "http://localhost:3001/books";

export const getBooks = () => axios.get(API);
export const createBook = (book) => axios.post(API, book);
export const updateBookApi = (book) => axios.put(`${API}/${book.id}`, book);
export const deleteBookApi = (id) => axios.delete(`${API}/${id}`);
