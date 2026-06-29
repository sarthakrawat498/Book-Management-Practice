import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      dispatch(
        login({
          user: {
            username,
          },
          token: crypto.randomUUID(),
        }),
      );
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  className="form-control mb-3"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
