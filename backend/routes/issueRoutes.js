const express = require("express");
const {
  borrowBook,
  returnBook,
  getMyBorrowedBooks,
  getAllIssuedBooks,
} = require("../controllers/issueBookController");

const router = express.Router();

// User
router.post("/borrow", borrowBook);
router.put("/return/:id", returnBook);
router.get("/myBooks", getMyBorrowedBooks);

// Admin
router.get("/", getAllIssuedBooks);

module.exports = router;