import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getBooks } from '../services/bookService';
import toast, { Toaster } from 'react-hot-toast'; // <-- Toast notification lagayi

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getBooks();
      
      
      console.log("Dashboard fetched books data:", data);

      if (data && Array.isArray(data)) {
        setBooks(data);
      } else if (data && data.books && Array.isArray(data.books)) {
        setBooks(data.books);
      } else if (data && data.data && Array.isArray(data.data)) {
        setBooks(data.data); // Agar nested data object hai
      } else {
        console.warn("Received data is not an array. Check structure!");
        setBooks([]);
      }

    } catch (err) {
      console.error("Dashboard Fetch Error Object:", err);
      console.error("Backend Error Message:", err.response?.data);
      
      const errorMsg = err.response?.data?.message || 'Failed to load books. Check Auth Token!';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrowSuccess = () => {
    toast.success("Book borrowed successfully!");
    fetchBooks(); // Refresh list after borrowing
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="text-2xl text-gray-400 animate-pulse">Loading Books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Library Books</h1>
            <p className="text-gray-400 mt-2">Browse and borrow available books</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {books.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-3xl">
            <p className="text-gray-400 text-xl mb-2">No books available</p>
            <p className="text-sm text-gray-500">Database is empty or connection failed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard 
                key={book._id || book.id} 
                book={book} 
                onBorrowSuccess={handleBorrowSuccess}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;