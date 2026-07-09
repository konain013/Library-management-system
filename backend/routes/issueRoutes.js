const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
 borrowBook,
  returnBook,
  getAllIssuedBooks,
} = require("../controllers/issueBookController");

const router = express.Router();


router.post("/bookissue", authMiddleware, borrowBook);


router.put("/return/:id", authMiddleware, returnBook);

// Only Admin can view all issues
router.get("/", authMiddleware, authorize("admin"), getAllIssuedBooks);

module.exports = router;