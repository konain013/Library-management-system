const Book = require("../models/Book");
const Issue = require("../models/issueBook");

// Borrow Book 
const borrowBook = async (req, res) => {
   
  try {
    const { bookId, userId, dueDate } = req.body;

    if (!bookId || !userId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Book ID, User ID and Due Date are required.",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    if (book.status === "borrowed") {
      return res.status(400).json({
        success: false,
        message: "Book is already borrowed.",
      });
    }

    const issue = await Issue.create({
      book: bookId,
      user: userId ,
      dueDate,
    });

    book.status = "borrowed";
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully.",
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Return Book 
const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: " book Issue record not found.",
      });
    }

    if (issue.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Book has already been returned.",
      });
    }

    issue.status = "returned";
    issue.returnDate = new Date();

    await issue.save();

    const book = await Book.findById(issue.book);

    if (book) {
      book.status = "available";
      await book.save();
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully.",
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Issued Books 
const getAllIssuedBooks = async (req, res) => {
  try {
    const issues = await Issue.find();

    return res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getAllIssuedBooks,
};