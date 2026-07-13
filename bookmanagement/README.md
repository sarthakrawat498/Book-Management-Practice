# 📚 Book Library Management System

A modern React application for managing a personal book library. Users can add, edit, delete, and organize books, mark them as read or unread, and view detailed information about each book. The project uses **React, Redux Toolkit, React Router, Context API, Axios, JSON Server, and Bootstrap**.

---

## 🚀 Features

- 🔐 Fake JWT Authentication
- 🛡 Protected Routes
- ➕ Add New Books
- ✏ Edit Existing Books
- 🗑 Delete Books with Confirmation
- 📖 View Book Details
- 📚 Mark Books as Read / Unread
- 🔍 Filter Books
  - All
  - Read
  - Unread
- 🌙 Dark / Light Theme Toggle
- 💾 Data Persistence using JSON Server
- 📱 Responsive UI with Bootstrap

---

## 🛠 Tech Stack

- React (Vite)
- Redux Toolkit
- React Router DOM
- Context API
- Axios
- Bootstrap
- JSON Server

---

## 📂 Project Structure

```text
src
│
├── app
│   └── store.js
│
├── components
│   ├── Navbar.jsx
│   ├── BookCard.jsx
│   ├── BookForm.jsx
│   ├── BookList.jsx
│   ├── DashboardStats.jsx
│   ├── FilterBar.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
│
├── context
│   └── ThemeContext.jsx
│
├── features
│   ├── auth
│   │   └── authSlice.js
│   └── books
│       └── bookSlice.js
│
├── pages
│   ├── Home.jsx
│   ├── AddBook.jsx
│   ├── EditBook.jsx
│   ├── BookDetails.jsx
│   └── Login.jsx
│
├── services
│   └── bookService.js
│
├── utils
│   └── genres.js
│
└── main.jsx
```

---

## ⚙ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project directory

```bash
cd bookmanagement
```

Install dependencies

```bash
npm install
```

---

## ▶ Running the Application

### Start React Application

```bash
npm run dev
```

### Start JSON Server

```bash
npm run server
```

The React application will run on

```
http://localhost:5173
```

The JSON Server will run on

```
http://localhost:3001
```

---

## 🔑 Demo Login Credentials

```
Username : admin
Password : admin123
```

---

## 📌 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/books`     | Fetch all books |
| POST   | `/books`     | Add a new book  |
| PUT    | `/books/:id` | Update a book   |
| DELETE | `/books/:id` | Delete a book   |

---

## 📷 Application Workflow

1. Login using the demo credentials.
2. Browse all books on the Home page.
3. Add a new book.
4. Edit existing books.
5. Delete books after confirmation.
6. Mark books as Read or Unread.
7. Click a book card to view detailed information.
8. Toggle between Light and Dark themes.

---

## 👨‍💻 Author

**Sarthak Rawat**
