import React from "react";
import { useSelector } from "react-redux";
function DashboardStats() {
  const books = useSelector((state) => state.books.books);
  const totalBooks = books.length;
  const readBooks = books.filter((book) => book.read).length;
  const unreadBooks = totalBooks - readBooks;
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-bg-primary shadow">
          <div className="card-body text-center">
            <h5>Total Books</h5>
            <h2>{totalBooks}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-bg-success shadow">
          <div className="card-body text-center">
            <h5>Read Books</h5>
            <h2>{readBooks}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-bg-warning shadow">
          <div className="card-body text-center">
            <h5>Unread Books</h5>
            <h2>{unreadBooks}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
