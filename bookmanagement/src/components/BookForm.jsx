import { useState } from "react";
import { genres } from "../utils/genres";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBook, getBooks, updateBookApi } from "../services/bookService";
import { addBook, setBooks } from "../features/books/bookSlice";

function BookForm({ mode = "add", book = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [description, setDescription] = useState(book?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !genre || !description) {
      alert("Please fill all fields");
      return;
    }
    if (mode === "add") {
      const newBook = {
        title,
        author,
        genre,
        description,
        read: false,
      };
      try {
        const response = await createBook(newBook);
        dispatch(addBook(response.data));
        setTitle("");
        setAuthor("");
        setGenre("");
        setDescription("");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Failed to add book.");
      }
    } else {
      const updatedBook = {
        id: book.id,
        title,
        author,
        genre,
        description,
        read: book.read,
      };
      try {
        await updateBookApi(updatedBook);
        const response = await getBooks();
        dispatch(setBooks(response.data));
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Failed to update book");
      }
    }
  };
  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h4>{mode === "add" ? "Add New Book" : "Edit Book"}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Genre</label>
            <select
              className="form-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please enter book description"
            />
          </div>
          <button type="submit" className="btn btn-success">
            {mode === "add" ? "Add Book" : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
