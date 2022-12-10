import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PuzzlePage from "./pages/PuzzlePage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/puzzles/:id" element={<PuzzlePage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
