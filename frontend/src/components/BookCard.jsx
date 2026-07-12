// src/components/BookCard.jsx
import React, { useState } from 'react';
import BorrowModal from './BorrowModal';

const BookCard = ({ book, onBorrowSuccess }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-[#1E2937] rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-[#22C55E]">
        <div className="h-52 bg-gray-800 flex items-center justify-center text-6xl border-b border-gray-700">
          📖
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-gray-400 text-sm mb-3">by {book.author}</p>
          
          <p className="text-gray-300 text-sm line-clamp-3 mb-6 min-h-[60px]">
            {book.description || "No description available."}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-black font-semibold py-3.5 rounded-2xl transition-all"
          >
            Borrow Book
          </button>
        </div>
      </div>

      {showModal && (
        <BorrowModal 
          book={book} 
          onClose={() => setShowModal(false)} 
          onSuccess={onBorrowSuccess}
        />
      )}
    </>
  );
};

export default BookCard;