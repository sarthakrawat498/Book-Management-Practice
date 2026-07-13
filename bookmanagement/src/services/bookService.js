import axios from "axios";

const API = "http://localhost:8081/api/books";

export const getBooks = () => axios.get(API);
export const getBookById = (id) => axios.get(`${API}/${id}`);
export const createBook = (book) => axios.post(API, book);
export const updateBookApi = (book) => axios.put(`${API}/${book.id}`, book);
export const deleteBookApi = (id) => axios.delete(`${API}/${id}`);
