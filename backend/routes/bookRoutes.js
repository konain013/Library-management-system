const express = require("express");
const {
  addBook,
  getAllBooks,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/add", addBook);

router.get("/allbooks", getAllBooks);

router.delete("/:id", deleteBook);

module.exports = router;