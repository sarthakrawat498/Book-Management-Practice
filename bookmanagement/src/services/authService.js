import axios from "axios";

const API = "https://dummyjson.com/auth";

export const loginUser = (credentials) => {
  axios.post(`${API}/login`, credentials);
};

export const getCurrentUser = (token) => {
  axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
