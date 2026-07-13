# 📚 Library Management System

A full-stack **Library Management System** built with **React**, **Node.js**, **Express.js**, and **MongoDB**. The application allows users to browse and borrow books while providing administrators with tools to manage the library catalog through a secure role-based authentication system.

---

# 🚀 Tech Stack

### Frontend
* React
* Tailwind Css


### Backend
* Node.js
* Express.js

### Database
* MongoDB
* Mongoose ODM

### Authentication & Security
* JWT (JSON Web Tokens)
* bcrypt (Password Hashing)

### Development Tools
* Git
* GitHub
* ChatGPT
* Claude

---

# ✨ Features

## 1. Authentication

### User Registration
* Create a new account using name, email, and password.
* Passwords are securely hashed using **bcrypt** before being stored in the database.

### User Login
* Login using registered email and password.
* Generates a **JWT access token** containing the user's ID and role.
* Protected routes require a valid JWT token.

---

## 2. Book Management

### View Books
* All authenticated users can browse the available books.
* Displays information such as:
  * Title
  * Author
  * Availability Status

### Add Book *(Admin Only)*
* Administrators can add new books to the library.

### Remove Book *(Admin Only)*
* Administrators can delete books from the library catalog.

---

## 3. Book Borrowing System

The project separates **Book** and **IssueBook** into different collections.

### Book Collection
Stores only library inventory information.

Example:
* Title
* Author
* Availability Status

### IssueBook Collection
Stores borrowing history.

Example:
* Borrowed Book
* Borrowed By
* Issue Date
* Return Date
* Borrow Status

This design keeps the application scalable and maintains a clean separation between inventory data and transaction history.

---

# 🔐 Role-Based Access Control (RBAC)

The application supports two user roles.

| Role      | Permissions                                     |
| --------- | ------------------------------------------------ |
| **User**  | View books, borrow books, return books           |
| **Admin** | All user permissions + add books + remove books  |

## How Authorization Works

1. Every user document contains a **role** field.
2. During login, the role is embedded inside the JWT payload.
3. Protected routes first verify the JWT.
4. Authorization middleware checks whether the authenticated user has permission to access the requested route.
5. Unauthorized requests receive a **403 Forbidden** response.



---

# 📁 Project Structure

Library-Management-System/
│
├── frontend/
|    ├── src/
|   ├── public/ 
|   ├──package.json
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── config/
│   
│
└── README.md


# 📌 API Endpoints

## Authentication

| Method | Endpoint               | Description            |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/users/register`   | Register a new user   |
| POST   | `/api/users/login`      | Login user            |

---

## Books

| Method | Endpoint           | Description                               |
| ------ | ------------------ | --------------------------------          |
| GET    | `/api/books`                | Get all books                    |
| POST   | `/api/books/addbook`        | Add a new book *(Admin Only)*    |
| DELETE | `/api/books/:id`            | Delete a book *(Admin Only)*     |

---

## Issue Books

| Method | Endpoint                  | Description                             |
| ------ | --------------------------| --------------------------------------  |
| POST   | `/api/issue/borrow`         | Borrow a book                         |
| PUT    | `/api/issue/return/:id`     | Return a borrowed book                |
| GET    | `/api/issue/my-books`       | Get logged-in user's borrowed books   |
| GET    | `/api/issue/`            | Get all issued books *(Admin)*           |

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key
```

# 🛠️ Installation

## Clone the Repository

```bash
git clone <repository-url>
```

## Backend Setup

```bash
cd backend

npm install

npm start
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📷 Screenshots
# Register
![Register Page](screenshots/Register.PNG)
# Login
![login Page](screenshots/login.PNG)
# Dashboard
![Dashboard Page](screenshots/Dashboard.PNG)
# Borrowedbook 
![borrowBook Page](screenshots/borrowBook.PNG)
# BorrowedBookHistory
![borrowBookHistory Page](screenshots/borrowedBookHistory.PNG)
# ManageBook
![ManageBook Page](screenshots/ManageBook.PNG)
# AddBook
![AddBook Page](screenshots/AddBook.PNG)
# DeleteBook
![deleteBook Page](screenshots/deleteBook.PNG)




# 📄 License

This project was built for educational and learning purposes.