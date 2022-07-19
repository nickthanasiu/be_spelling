import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpellingBeeContainer from './components/SpellingBeeContainer';
import AdminPage from './components/admin/AdminPage';
import LandingPage from './components/LandingPage';
import PuzzlePage from './pages/PuzzlePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/puzzles/:id" element={<PuzzlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
