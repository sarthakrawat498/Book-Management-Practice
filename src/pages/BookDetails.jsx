import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, updateBook } from "../features/books/bookSlice";
import { deleteBookApi, updateBookApi } from "../services/bookService";

function BookDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.books.find((book) => String(book.id) === id),
  );
  if (!book) {
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
      const response = await updateBookApi(updatedBook);
      dispatch(updateBook(response.data));
    } catch (error) {
      console.error(error);
      alert("Failed to update book status");
    }
    dispatch(toggleRead(book.id));
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
