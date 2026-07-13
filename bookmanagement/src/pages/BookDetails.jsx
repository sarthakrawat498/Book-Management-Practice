import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, setBooks, updateBook } from "../features/books/bookSlice";
import {
  deleteBookApi,
  getBookById,
  updateBookApi,
  getBooks,
} from "../services/bookService";

function BookDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const books = useSelector((state) => state.books.books);
  const bookFromStore = books.find((book) => String(book.id) === id);
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
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (!book && notFound) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Book not found</div>
      </div>
    );
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete "${book.title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmDelete) {
      return;
    }
    try {
      await deleteBookApi(book.id);
      dispatch(deleteBook(book.id));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete Book");
    }
  };
  const handleToggle = async () => {
    const updatedBook = {
      ...book,
      read: !book.read,
    };
    try {
      const updateResponse = await updateBookApi(updatedBook);
      setFetchedBook(updateResponse.data);
      dispatch(updateBook(updateResponse.data));
      const response = await getBooks();
      dispatch(setBooks(response.data));
    } catch (error) {
      console.error(error);
      alert("Failed to update book status");
    }
  };
  return (
    <>
      <div className="card shadow">
        <Link to="/" className="btn btn-outline-secondary mb-3">
          ← Back to Library
        </Link>
        <div className="card-header d-flex justify-content-content-center align-items-center">
          <h3 className="m-0">{book.title}</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong>
            <span className="badge bg-secondary ms-2">{book.genre}</span>
          </p>
          <hr />
          <h5>Description</h5>
          <p>{book.description}</p>
          <p>
            <strong>Status:</strong>{" "}
            {book.read ? (
              <span className="badge bg-success ms-2">Read</span>
            ) : (
              <span className="badge bg-warning text-dark ms-2">Unread</span>
            )}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Link to={`/edit/${book.id}`} className="btn btn-warning">
            Edit
          </Link>

          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>

          <button
            className={`btn ${book.read ? "btn-secondary" : "btn-success"}`}
            onClick={handleToggle}
          >
            {book.read ? "Mark Unread" : "Mark Read"}
          </button>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
