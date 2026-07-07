import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import GameDetails from './views/GameDetails';
import Wishlist from './views/Wishlist';

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q) navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gamingBg text-gamingText">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      <main>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
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
