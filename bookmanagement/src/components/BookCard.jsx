import { useDispatch } from "react-redux";
import { deleteBook, setBooks } from "../features/books/bookSlice";
import {
  deleteBookApi,
  updateBookApi,
  getBooks,
} from "../services/bookService";
import { Link, useNavigate } from "react-router-dom";
function BookCard({ book }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?\n\nThis action cannot be undone`,
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteBookApi(book.id);
      dispatch(deleteBook(book.id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  };

  const handleToggleRead = async (e) => {
    e.stopPropagation();
    const updatedBook = {
      ...book,
      read: !book.read,
    };
    try {
      await updateBookApi(updatedBook);
      const response = await getBooks();
      dispatch(setBooks(response.data));
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };
  return (
    <div
      className="card h-100 shadow-sm book-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>

        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>

        <p className="card-text text-muted">
          {book.description
            ? book.description.length > 90
              ? book.description.substring(0, 90) + "..."
              : book.description
            : "No description available"}
        </p>

        <p className="card-text">
          <strong>Genre:</strong> {book.genre}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <button
            className={`btn ${
              book.read ? "btn-secondary" : "btn-success"
            } btn-sm`}
            onClick={handleToggleRead}
          >
            {book.read ? "Mark Unread" : "Mark Read"}
          </button>
        </p>
      </div>

      <div className="card-footer bg-tertiary d-flex justify-content-between">
        <Link
          to={`/edit/${book.id}`}
          className="btn btn-warning btn-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>

        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
