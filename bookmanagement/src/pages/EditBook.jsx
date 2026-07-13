import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookForm from "../components/BookForm";
import { getBookById } from "../services/bookService";

function EditBook() {
  const { id } = useParams();
  const bookFromStore = useSelector((state) =>
    state.books.books.find((book) => String(book.id) === id),
  );
  const [fetchedBook, setFetchedBook] = useState(null);
  const [loading, setLoading] = useState(!bookFromStore);
  const [notFound, setNotFound] = useState(false);
  const book = bookFromStore || fetchedBook;

  useEffect(() => {
    if (bookFromStore) {
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await getBookById(id);
        setFetchedBook(response.data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookFromStore, id]);

  if (loading && !book) {
    return <div className="alert alert-info">Loading book...</div>;
  }

  if (!book && notFound) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <BookForm mode="edit" book={book} />
        </div>
      </div>
    </>
  );
}

export default EditBook;
