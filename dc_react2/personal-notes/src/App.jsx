import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NewNotePage from './pages/NewNotePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import ArchivePage from './pages/ArchivedPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/new" element={<NewNotePage />} />
        <Route path="/notes/:id" element={<DetailPage />} />
        <Route path="/archived" element={<ArchivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
