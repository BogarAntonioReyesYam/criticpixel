import { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

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
const PriceAdmin = lazy(() => import('./views/PriceAdmin'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const ProfilePage = lazy(() => import('./views/ProfilePage'));
const AuthCallback = lazy(() => import('./views/AuthCallback'));
const AllGames = lazy(() => import('./views/AllGames'));
const SearchResults = lazy(() => import('./views/SearchResults'));
const AdminDashboard = lazy(() => import('./views/AdminDashboard'));
const GameCrud = lazy(() => import('./views/GameCrud'));
const UserManagement = lazy(() => import('./views/UserManagement'));
const Analytics = lazy(() => import('./views/Analytics'));
const Community = lazy(() => import('./views/Community'));
const ForumThread = lazy(() => import('./views/ForumThread'));
const Groups = lazy(() => import('./views/Groups'));
const Articles = lazy(() => import('./views/Articles'));
const Guides = lazy(() => import('./views/Guides'));
const Screenshots = lazy(() => import('./views/Screenshots'));
const LeaderboardPage = lazy(() => import('./views/LeaderboardPage'));
const Forum = lazy(() => import('./views/Forum'));

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
    if (q) navigate('/search?q=' + encodeURIComponent(q));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gamingBg text-gamingText">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home searchQuery={searchQuery} /></PageTransition>} />
            <Route path="/games" element={<PageTransition><AllGames /></PageTransition>} />
            <Route path="/game/:id" element={<PageTransition><GameDetails /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/rankings" element={<PageTransition><Rankings /></PageTransition>} />
            <Route path="/releases" element={<PageTransition><ReleasesCalendar /></PageTransition>} />
            <Route path="/guides" element={<PageTransition><BuyingGuide /></PageTransition>} />
            <Route path="/stats" element={<PageTransition><UserStats /></PageTransition>} />
            <Route path="/trailers" element={<PageTransition><TrailersPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
            <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/admin/games" element={
              <ProtectedRoute requireAdmin>
                <PageTransition><GameCrud /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin>
                <PageTransition><UserManagement /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/admin/prices" element={
              <ProtectedRoute requireAdmin>
                <PageTransition><PriceAdmin /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requireAdmin>
                <PageTransition><Analytics /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
            <Route path="/forum" element={<PageTransition><Forum /></PageTransition>} />
            <Route path="/forum/:id" element={<PageTransition><ForumThread /></PageTransition>} />
            <Route path="/groups" element={<PageTransition><Groups /></PageTransition>} />
            <Route path="/groups/:slug" element={<PageTransition><Groups /></PageTransition>} />
            <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
            <Route path="/articles/:slug" element={<PageTransition><Articles /></PageTransition>} />
            <Route path="/community-guides" element={<PageTransition><Guides /></PageTransition>} />
            <Route path="/guides/:slug" element={<PageTransition><Guides /></PageTransition>} />
            <Route path="/screenshots" element={<PageTransition><Screenshots /></PageTransition>} />
            <Route path="/leaderboard" element={<PageTransition><LeaderboardPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><Home searchQuery={searchQuery} /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
