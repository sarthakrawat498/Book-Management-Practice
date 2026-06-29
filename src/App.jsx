import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar";
import AddBook from "./pages/AddBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/add" element={<AddBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
