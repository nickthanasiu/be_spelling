import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/admin/AdminPage";
import LandingPage from "./components/LandingPage";
import PuzzlePage from "./components/PuzzlePage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/puzzles/:id" element={<PuzzlePage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
