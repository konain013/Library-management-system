
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books';   

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get All Books
export const getBooks = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeader() });
  return res.data;
};

// Add Book (Admin)
export const addBook = async (bookData) => {
  const res = await axios.post(`${API_URL}/add`, bookData, { headers: getAuthHeader() });
  return res.data;
};

// Delete Book (Admin)
export const deleteBook = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  return res.data;
};

