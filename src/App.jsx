import { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { GameGridSkeleton } from './components/Skeletons';

const Home = lazy(() => import('./views/Home'));
const GameDetails = lazy(() => import('./views/GameDetails'));
const Wishlist = lazy(() => import('./views/Wishlist'));
const About = lazy(() => import('./views/About'));
const Blog = lazy(() => import('./views/Blog'));
const Rankings = lazy(() => import('./views/Rankings'));
const ReleasesCalendar = lazy(() => import('./views/ReleasesCalendar'));
const BuyingGuide = lazy(() => import('./views/BuyingGuide'));
const UserStats = lazy(() => import('./views/UserStats'));
const TrailersPage = lazy(() => import('./views/TrailersPage'));

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-gamingOrange border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Cargando...</p>
    </div>
  </div>
);

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
        <Suspense fallback={<PageFallback />}>
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
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
