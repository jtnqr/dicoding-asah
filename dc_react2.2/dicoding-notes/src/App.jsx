import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivedPage from './pages/ArchivedPage';
import Navbar from './components/Navbar';
import { AuthContext } from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';

export default function App() {
  const { initializing } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // const bgClasses = theme === 'light' ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white';

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (initializing) return <div style={{ padding: 20 }}>Initializing...</div>;

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/add" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/archived" element={<ArchivedPage />} />

          <Route path="/" element={<Navigate to="/notes" replace />} />
        </Routes>
      </div>
    </div>
  );
}
