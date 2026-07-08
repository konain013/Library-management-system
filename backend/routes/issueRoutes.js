
const express = require("express");
const {
  borrowBook,
  returnBook,
  getAllIssuedBooks,
} = require("../controllers/issueBookController");

const router = express.Router();

// User
router.post("/borrow", borrowBook);
router.put("/return/:id", returnBook);

// Admin
router.get("/", getAllIssuedBooks);

module.exports = router;