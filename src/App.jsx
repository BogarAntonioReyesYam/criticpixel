import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import GameDetails from './views/GameDetails';

function App() {
  return (
    <div className="min-h-screen bg-gamingBg text-gamingText">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </main>
      
      {/* Footer Placeholder */}
      <footer className="border-t border-white/5 py-10 text-center text-gray-500 text-sm mt-20">
        <p>&copy; 2026 PIXELVERDICT. ALPHA VERSION.</p>
      </footer>
    </div>
  );
}

export default App;
