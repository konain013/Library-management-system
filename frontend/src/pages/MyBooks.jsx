import React, { useState, useEffect } from 'react';
import { getMyIssuedBooks, returnBook } from '../services/issueService';
import toast, { Toaster } from 'react-hot-toast';

const MyBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FIX #1: track WHICH book is returning, not a single global boolean.
  // Isse sirf uss book ka button disable hoga, baaki sab active rahenge.
  const [returningId, setReturningId] = useState(null);

  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      const data = await getMyIssuedBooks();
      console.log("📥 Full API Response Inside MyBooks Component:", data);

      // 🔥 ROOT FIX: /api/issuebook endpoint saari records deta hai (returned +
      // not-returned dono). Isliye frontend pe hi sirf "abhi tak wapas nahi
      // hui" wali books ko rakho — jinka returnDate null/undefined hai.
      const onlyActive = (arr) => arr.filter(issue => !issue.returnDate);

      if (Array.isArray(data)) {
        setIssuedBooks(onlyActive(data));
      } else if (data && Array.isArray(data.issues)) {
        setIssuedBooks(onlyActive(data.issues));
      } else if (data && Array.isArray(data.data)) {
        setIssuedBooks(onlyActive(data.data));
      } else {
        setIssuedBooks([]);
      }
    } catch (err) {
      console.error("❌ Error loading borrowed books:", err);
      toast.error(err.response?.data?.message || "Failed to load borrowed books history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  // ↩️ Book Return handler with LIVE REMOVAL FIX
  const handleReturn = async (issueId) => {
    if (!issueId) {
      toast.error("Invalid Record ID. Cannot return book.");
      return;
    }

    // 🔥 FIX #2: normalize to string upfront, taake baad me comparison
    // kabhi type-mismatch (ObjectId vs string vs number) ki wajah se fail na ho.
    const targetId = String(issueId);

    try {
      setReturningId(targetId);
      const loadingToast = toast.loading("Processing book return...");

      const res = await returnBook(targetId);
      console.log("✅ Return Book API Response:", res);

      toast.dismiss(loadingToast);
      toast.success("Book returned successfully!");

      // 🔥 FIX #3: String() dono taraf lagao — ye asli bug tha.
      // Pehle currentId aur issueId ka type kabhi kabhi mismatch ho sakta tha
      // (e.g. ObjectId object vs plain string), isliye filter kabhi match hi
      // nahi karta tha aur book list se remove nahi hoti thi.
      setIssuedBooks(prevBooks =>
        prevBooks.filter(issue => {
          const currentId = String(issue._id || issue.id || "");
          return currentId !== targetId;
        })
      );
    } catch (err) {
      toast.dismiss();
      console.error("❌ Return Book Error:", err);

      const serverError = err.response?.data?.message || err.response?.data || "Failed to return book";
      toast.error(typeof serverError === 'string' ? serverError : "Request Error (400)");

      // 🔥 FIX #4 (safety net): agar backend me return fail hua tha lekin
      // hamara local state kisi wajah se already out-of-sync ho gaya ho,
      // to server se dobara sync kar lo taake UI hamesha sach dikhaye.
      fetchMyBooks();
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="text-2xl text-gray-400 animate-pulse">Loading all issued records...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <span>📚</span> Issued Books Logs (Admin View)
          </h1>
          <p className="text-gray-400 mt-2">Showing all active rentals across the system</p>
        </div>

        {issuedBooks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-3xl bg-[#1E2937]/30 animate-in fade-in duration-350">
            <p className="text-gray-400 text-xl font-medium mb-2">No issued books active in the system</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#1E2937] rounded-3xl border border-gray-700/60 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-5">Book Info</th>
                  <th className="p-5">Borrower Info</th>
                  <th className="p-5">Due Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((issue) => {
                  const currentBook = issue.BookId || issue.bookId || issue.book;
                  const currentUser = issue.UserID || issue.userId || issue.user;
                  const targetIssueId = String(issue._id || issue.id || "");
                  const isThisReturning = returningId === targetIssueId;

                  const displayTitle = currentBook?.title || currentBook?.bookTitle || issue.bookTitle ||
                    (typeof currentBook === 'string' ? `ID: ${currentBook.substring(0, 8)}...` : "Raw Reference ID");

                  const displayUser = currentUser?.name || currentUser?.username || currentUser?.email ||
                    (typeof currentUser === 'string' ? `User: ${currentUser.substring(0, 8)}...` : "Raw User ID");

                  return (
                    <tr key={targetIssueId} className="border-b border-gray-700/40 hover:bg-gray-700/20 transition-all duration-200">
                      <td className="p-5 font-semibold text-white">
                        <span className="text-emerald-400 mr-2">📖</span> {displayTitle}
                      </td>

                      <td className="p-5 text-gray-300 font-medium">
                        <span className="text-blue-400 mr-1">👤</span> {displayUser}
                      </td>

                      <td className="p-5 text-amber-400 font-mono text-sm">
                        {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString('en-US', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        }) : "No Due Date"}
                      </td>

                      <td className="p-5">
                        <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 text-[#22C55E] text-xs rounded-full font-semibold">
                          Issued
                        </span>
                      </td>

                      <td className="p-5 text-center">
                        <button
                          onClick={() => handleReturn(targetIssueId)}
                          disabled={isThisReturning}
                          className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 font-medium px-4 py-2 rounded-xl text-sm transition disabled:opacity-50"
                        >
                          {isThisReturning ? "Returning..." : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;