import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpellingBeeContainer from './components/SpellingBeeContainer';
import AdminPage from './components/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpellingBeeContainer />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
