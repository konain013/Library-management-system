// src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(formData);
      authLogin(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="bg-[#1E2937] p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-gray-400 mt-2">Access your library account</p>
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#334155] border border-gray-600 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22C55E]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#334155] border border-gray-600 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22C55E]"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-black font-semibold py-4 rounded-2xl transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#22C55E] hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;