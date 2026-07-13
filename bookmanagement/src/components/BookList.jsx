import BookCard from "./BookCard";
import { useSelector } from "react-redux";
function BookList() {
  const { books, filter } = useSelector((state) => state.books);
  const filteredBooks = books.filter((book) => {
    if (filter === "READ") return book.read;
    if (filter === "UNREAD") return !book.read;
    return true;
  });
  if (filteredBooks.length === 0) {
    return (
      <div className="alert alert-warning text-center">No Books Found</div>
    );
  }
  return (
    <div className="row g-4">
      {filteredBooks.map((book) => (
        <div className="col-md-6" key={book.id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}

export default BookList;
