const Book = require("../models/Book");

// Add Book (Admin)
const addBook = async (req, res) => {
  try {
    let { title, author, isbn } = req.body;
    // console.log("body recieve",req.body)

    if (!title || !author || !isbn) {
      return res.status(400).json({
        success: false,
        message: "Title, author and ISBN are required.",
      });
    }

    // Format Title
    title = title
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Format Author
    author = author
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    isbn = isbn.trim();

    const existingBook = await Book.findOne({
      title,
      author,
    });

    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "Book already exists.",
      });
    }

    const existingISBN = await Book.findOne({ isbn });

    if (existingISBN) {
      return res.status(409).json({
        success: false,
        message: "ISBN already exists.",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully.",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Books (User & Admin)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Book (Admin)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  deleteBook,
};