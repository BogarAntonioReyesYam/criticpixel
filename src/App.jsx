import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import GameDetails from './views/GameDetails';
import Wishlist from './views/Wishlist';
import About from './views/About';
import Blog from './views/Blog';
import Rankings from './views/Rankings';
import ReleasesCalendar from './views/ReleasesCalendar';
import BuyingGuide from './views/BuyingGuide';
import UserStats from './views/UserStats';
import TrailersPage from './views/TrailersPage';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q) navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gamingBg text-gamingText">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home searchQuery={searchQuery} /></PageTransition>} />
          <Route path="/game/:id" element={<PageTransition><GameDetails /></PageTransition>} />
          <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/rankings" element={<PageTransition><Rankings /></PageTransition>} />
          <Route path="/releases" element={<PageTransition><ReleasesCalendar /></PageTransition>} />
          <Route path="/guides" element={<PageTransition><BuyingGuide /></PageTransition>} />
          <Route path="/stats" element={<PageTransition><UserStats /></PageTransition>} />
          <Route path="/trailers" element={<PageTransition><TrailersPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
