import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBooks } from "../features/books/bookSlice";
import { getBooks } from "../services/bookService";
import BookList from "../components/BookList";
import FilterBar from "../components/FilterBar";
import DashboardStats from "../components/DashboardStats";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        dispatch(setBooks(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      <DashboardStats />
      <FilterBar />
      <BookList />
    </>
  );
}

export default Home;
