import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/books/bookSlice";

function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.books.filter);
  return (
    <div className="d-flex justify-content-center my-4">
      <div className="btn-group">
        <button
          className={`btn ${
            filter === "ALL" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => dispatch(setFilter("ALL"))}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === "READ" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => dispatch(setFilter("READ"))}
        >
          Read
        </button>
        <button
          className={`btn ${
            filter === "UNREAD" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => dispatch(setFilter("UNREAD"))}
        >
          Unread
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
