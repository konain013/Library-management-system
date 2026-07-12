import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyBooks from './pages/MyBooks';
import AdminDashboard from './pages/AdminDashboard';
import ManageBooks from './pages/ManageBook';

function App() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <Navbar />
              <MyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Navbar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 FIX: path ab Navbar ke Link (/admin/manage-books) se match karta
            hai, aur ye ab ProtectedRoute + adminOnly ke andar hai (pehle
            public tha aur galat path pe tha, isliye login pe redirect ho
            raha tha) */}
        <Route
          path="/admin/manage-books"
          element={
            <ProtectedRoute adminOnly={true}>
              <Navbar />
              <ManageBooks />
            </ProtectedRoute>
          }
        />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;