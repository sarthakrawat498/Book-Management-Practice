import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const books = useSelector((state) => state.books.books);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📚 Book Library
        </Link>
        <div className="navbar-nav">
          <Link className="btn btn-success m-1" to="/">
            Home
          </Link>
          <Link className="btn btn-success m-1" to="/add">
            Add Book
          </Link>
        </div>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="badge bg-primary fs-6">
            Total Books: {books.length}
          </span>
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <div className="d-flex align-items-center gap-3">
            <span className="fw-semibold">Welcome, {user.username}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
