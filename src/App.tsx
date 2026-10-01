import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvatarSelection from './pages/AvatarSelection';
import FinalResults from './pages/FinalResults';
import GameSession from './pages/GameSession';
import Home from './pages/Home';
import MathFlow from './pages/MathFlow';
import SubjectHub from './pages/SubjectHub';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatar" element={<AvatarSelection />} />
        <Route path="/hub" element={<SubjectHub />} />
        <Route path="/math-flow" element={<MathFlow />} />
        <Route path="/game" element={<GameSession />} />
        <Route path="/results" element={<FinalResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
