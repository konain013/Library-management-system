import React, { useState, useEffect } from 'react';
import { getBooks, addBook, deleteBook } from '../services/bookService';
import toast, { Toaster } from 'react-hot-toast';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Which form is open: 'add' | 'delete' | null
  const [activePanel, setActivePanel] = useState(null);

  // Add form state
  const [addForm, setAddForm] = useState({ title: '', author: '', isbn: '' });
  const [adding, setAdding] = useState(false);

  // Delete form state
  const [selectedBookId, setSelectedBookId] = useState('');
  const [manualId, setManualId] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();

      if (Array.isArray(data)) {
        setBooks(data);
      } else if (data && Array.isArray(data.books)) {
        setBooks(data.books);
      } else if (data && Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("❌ Error loading books:", err);
      toast.error(err.response?.data?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const togglePanel = (panel) => {
    setActivePanel(prev => (prev === panel ? null : panel));
  };

  // ---------------- ADD BOOK ----------------
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!addForm.title.trim() || !addForm.author.trim() || !addForm.isbn.trim()) {
      toast.error("Title, Author aur ISBN teeno fields zaroori hain");
      return;
    }

    try {
      setAdding(true);
      const loadingToast = toast.loading("Adding book...");
      const res = await addBook(addForm);
      toast.dismiss(loadingToast);
      toast.success("Book added successfully!");

      
      const newBook = res?.data || res?.book || res;
      if (newBook && (newBook._id || newBook.id)) {
        setBooks(prev => [newBook, ...prev]);
      } else {
        
        fetchBooks();
      }

      setAddForm({ title: '', author: '', isbn: '' });
      setActivePanel(null);
    } catch (err) {
      toast.dismiss();
      console.error("❌ Add Book Error:", err);
      const serverError = err.response?.data?.message || err.response?.data || "Failed to add book";
      toast.error(typeof serverError === 'string' ? serverError : "Request Error");
    } finally {
      setAdding(false);
    }
  };

  // ---------------- DELETE BOOK ----------------
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const targetId = String(manualId.trim() || selectedBookId).trim();

    if (!targetId) {
      toast.error("Book select karo ya ID daalo");
      return;
    }

    try {
      setDeleting(true);
      const loadingToast = toast.loading("Deleting book...");
      await deleteBook(targetId);
      toast.dismiss(loadingToast);
      toast.success("Book deleted successfully!");

      // List se turant remove kar do
      setBooks(prev => prev.filter(book => String(book._id || book.id) !== targetId));

      setSelectedBookId('');
      setManualId('');
      setActivePanel(null);
    } catch (err) {
      toast.dismiss();
      console.error("❌ Delete Book Error:", err);
      const serverError = err.response?.data?.message || err.response?.data || "Failed to delete book";
      toast.error(typeof serverError === 'string' ? serverError : "Request Error");
    
      fetchBooks();
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="text-2xl text-gray-400 animate-pulse">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <span>📚</span> Manage Books
          </h1>
          <p className="text-gray-400 mt-2">Add new books or remove existing ones</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => togglePanel('add')}
            className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
          >
            + Add Book
          </button>
          <button
            onClick={() => togglePanel('delete')}
            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
          >
            🗑 Delete Book
          </button>
        </div>

        {/* Add Book Form */}
        {activePanel === 'add' && (
          <form
            onSubmit={handleAddSubmit}
            className="bg-[#1E2937] border border-gray-700/60 rounded-2xl p-6 mb-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-2">New Book Details</h2>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={addForm.title}
                onChange={handleAddChange}
                placeholder="e.g. The Alchemist"
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={addForm.author}
                onChange={handleAddChange}
                placeholder="e.g. Paulo Coelho"
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">ISBN Number</label>
              <input
                type="text"
                name="isbn"
                value={addForm.isbn}
                onChange={handleAddChange}
                placeholder="e.g. 978-0061122415"
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={adding}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add Book"}
              </button>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="bg-gray-700/40 hover:bg-gray-700 text-gray-300 font-medium px-5 py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Delete Book Form */}
        {activePanel === 'delete' && (
          <form
            onSubmit={handleDeleteSubmit}
            className="bg-[#1E2937] border border-gray-700/60 rounded-2xl p-6 mb-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-red-400 mb-2">Select Book to Delete</h2>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Choose from list</label>
              <select
                value={selectedBookId}
                onChange={(e) => { setSelectedBookId(e.target.value); setManualId(''); }}
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">-- Select a book --</option>
                {books.map((book) => (
                  <option key={book._id || book.id} value={book._id || book.id}>
                    {book.title} {book.author ? `— ${book.author}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center text-xs text-gray-500">— OR —</div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Enter Book ID manually</label>
              <input
                type="text"
                value={manualId}
                onChange={(e) => { setManualId(e.target.value); setSelectedBookId(''); }}
                placeholder="e.g. 6a4e8624e1dec4e4afea38e8"
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Book"}
              </button>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="bg-gray-700/40 hover:bg-gray-700 text-gray-300 font-medium px-5 py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Books list */}
        <div className="bg-[#1E2937] rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider font-semibold">
            All Books ({books.length})
          </div>
          {books.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">No books in the system yet.</p>
          ) : (
            <ul className="divide-y divide-gray-700/40">
              {books.map((book) => (
                <li key={book._id || book.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{book.title}</p>
                    <p className="text-xs text-gray-400">{book.author} • ISBN: {book.isbn}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;