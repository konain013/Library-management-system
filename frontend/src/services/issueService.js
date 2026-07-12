import axios from 'axios';

const API_URL = 'http://localhost:3000/api/issuebook';   

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Borrow / Issue Book
export const issueBook = async (payload) => {
  const res = await axios.post(`${API_URL}/bookissue`, payload, { headers: getAuthHeader() });
  return res.data;
};

// Return Book
export const returnBook = async (issueId) => {
  const res = await axios.put(`${API_URL}/return/${issueId}`, {}, { headers: getAuthHeader() });
  return res.data;
};


export const getMyIssuedBooks = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeader() }); 
  return res.data;
};

// Admin: Get All Issued Books
export const getAllIssuedBooks = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeader() });
  return res.data;
};