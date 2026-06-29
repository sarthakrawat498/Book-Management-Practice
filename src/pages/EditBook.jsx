import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookForm from "../components/BookForm";

function EditBook() {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.books.find((book) => String(book.id) === id),
  );
  if (!book) {
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
