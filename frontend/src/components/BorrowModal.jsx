import React, { useState, useContext } from 'react';
import { issueBook } from '../services/issueService';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BorrowModal = ({ book, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  if (!book) {
    return null;
  }

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    setLoading(true);
    setError('');

    // Automatic due date create ki (7 days from now)
    const today = new Date();
    today.setDate(today.getDate() + 7); 
    const autoDueDate = today.toISOString().split('T')[0];

    // MEGA PAYLOAD: Tamam possible formats
    const payload = {
      BookId: book._id || book.id,
      UserID: user._id || user.id,
      dueDate: autoDueDate,
      bookId: book._id || book.id,
      userId: user._id || user.id,
      duedate: autoDueDate,
      BookID: book._id || book.id,
      userid: user._id || user.id,
    };

    console.log("🚀 Submitting request with payload:", payload);

    try {
      const response = await issueBook(payload);
      console.log("✅ Success Response from Server:", response);
      
      toast.success("Book issued successfully!");
      
     
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      
      if (typeof onClose === 'function') {
        onClose();
      }

    } catch (err) {
      console.error("❌ Catch Block Triggered. Error details:", err);
      console.error("📄 Backend Exact Error Response:", err?.response?.data);

      const errorMsg = err?.response?.data?.message || "Failed to borrow book. Check backend connection.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-white p-4">
      <div className="bg-[#1E2937] border border-gray-700 w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Borrow Book</h2>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-gray-400 text-sm">Book</p>
            <p className="font-medium text-lg">{book?.title || "Untitled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Author</p>
            <p className="text-gray-300">{book?.author || "Unknown"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Borrower</p>
            <p className="font-medium text-[#22C55E]">{user?.name || "Loading..."}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => { if (typeof onClose === 'function') onClose(); }}
            disabled={loading}
            className="flex-1 py-4 border border-gray-600 rounded-2xl font-medium hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleBorrow}
            disabled={loading}
            className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-black font-semibold py-4 rounded-2xl transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Borrow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;