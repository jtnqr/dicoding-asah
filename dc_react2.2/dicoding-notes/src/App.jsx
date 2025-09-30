import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivedPage from './pages/ArchivedPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useTheme } from './contexts/ThemeContext';

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          {/* Rute Publik */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rute Terproteksi */}
          <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
          <Route path="/notes/add" element={<ProtectedRoute><AddNotePage /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
          <Route path="/archived" element={<ProtectedRoute><ArchivedPage /></ProtectedRoute>} />

          {/* Redirect dari root path */}
          <Route path="/" element={<Navigate to="/notes" replace />} />
        </Routes>
      </div>
    </div>
  );
}
