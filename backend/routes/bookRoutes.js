const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  addBook,
  getAllBooks,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Public
router.get("/", getAllBooks);

// Admin only
router.post("/add", authMiddleware, authorize("admin"), addBook);

router.delete("/:id", authMiddleware, authorize("admin"), deleteBook);

module.exports = router;