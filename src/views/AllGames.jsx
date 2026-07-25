import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Monitor, Gamepad2, Laptop, Disc, ChevronDown, ArrowUpDown, ArrowUpAZ, ArrowDownZA, ArrowUpNarrowWide, ArrowDownWideNarrow, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import GameListItem from '../components/GameListItem';
import useSEO from '../hooks/useSEO';

const ITEMS_PER_PAGE = 12;

const AllGames = () => {
  useSEO({
    title: 'Todos los Juegos',
    description: 'Explora nuestro catálogo completo de videojuegos. Filtra por plataforma, género y más.'
  });

  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef(null);

  const sortOptions = [
    { id: 'score-desc', label: 'Mayor Puntaje', icon: ArrowUpNarrowWide },
    { id: 'score-asc', label: 'Menor Puntaje', icon: ArrowDownWideNarrow },
    { id: 'alpha-asc', label: 'A-Z', icon: ArrowUpAZ },
    { id: 'alpha-desc', label: 'Z-A', icon: ArrowDownZA },
    { id: 'price-asc', label: 'Menor Precio', icon: DollarSign },
    { id: 'price-desc', label: 'Mayor Precio', icon: DollarSign },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('games').select('*');

      if (!error && data && data.length > 0) {
        const mockMap = new Map(mockGames.map(g => [g.id, g]));
        const supabaseFormatted = data.map(g => {
          const mock = mockMap.get(g.id);
          return {
            ...mock,
            ...g,
            globalScore: parseFloat(g.global_score) || (mock?.globalScore || 0),
            releaseDate: g.release_date || mock?.releaseDate || null,
            price: g.price || mock?.price || 0,
          };
        });
        const supabaseIds = new Set(data.map(g => g.id));
        const additionalGames = mockGames.filter(g => !supabaseIds.has(g.id));
        setGames([...supabaseFormatted, ...additionalGames]);
      } else {
        setGames(mockGames);
      }
      setIsLoading(false);
    };

    fetchGames();
  }, []);

  const platforms = [
    { id: 'all', label: 'Todo', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'PC', label: 'PC', icon: <Monitor className="w-4 h-4" /> },
    { id: 'PS5', label: 'PlayStation', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'Xbox', label: 'Xbox', icon: <Laptop className="w-4 h-4" /> },
    { id: 'Switch', label: 'Nintendo', icon: <Disc className="w-4 h-4" /> },
  ];

  const filteredGames = useMemo(() => {
    let result = [...games];

    if (platformFilter !== 'all') {
      result = result.filter(game =>
        game.platforms?.some(p => p.includes(platformFilter))
      );
    }

    return result.sort((a, b) => {
      switch (sortOrder) {
        case 'score-desc': return b.globalScore - a.globalScore;
        case 'score-asc': return a.globalScore - b.globalScore;
        case 'alpha-asc': return a.title.localeCompare(b.title);
        case 'alpha-desc': return b.title.localeCompare(a.title);
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        default: return 0;
      }
    });
  }, [sortOrder, platformFilter, games]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [platformFilter, sortOrder]);

  useEffect(() => {
    const handleClickOutside = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortMenu(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
          Todos los <span className="text-gamingOrange">Juegos</span>
        </h1>
        <p className="text-gray-400 text-sm">{filteredGames.length} juegos en el catálogo</p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2 p-1.5 bg-gamingCard/50 border border-white/5 rounded-2xl">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatformFilter(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                platformFilter === p.id
                  ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        <div ref={sortRef} className="relative">
          <button onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:border-gamingOrange/40 hover:text-gamingOrange transition-colors focus:outline-none">
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOptions.find(o => o.id === sortOrder)?.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showSortMenu && (
              <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-52 bg-gamingCard border border-white/10 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
                {sortOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button key={opt.id} onClick={() => { setSortOrder(opt.id); setShowSortMenu(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold transition-colors ${
                        sortOrder === opt.id
                          ? 'bg-gamingOrange/10 text-gamingOrange'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}>
                      <Icon className="w-4 h-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-0.5 bg-gamingCard/50 border border-white/5 rounded-lg p-0.5 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gamingOrange text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gamingOrange text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginatedGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedGames.map((game, i) => (
            <GameListItem key={game.id} game={game} index={i} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gamingCard border border-white/10 text-gray-400 hover:text-white hover:border-gamingOrange disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (totalPages > 7 && page > 3 && page < totalPages - 2 && Math.abs(page - currentPage) > 1) {
              if (page === 4 || page === totalPages - 3) {
                return <span key={page} className="text-gray-600">...</span>;
              }
              return null;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  currentPage === page
                    ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20'
                    : 'bg-gamingCard border border-white/10 text-gray-400 hover:text-white hover:border-gamingOrange'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-gamingCard border border-white/10 text-gray-400 hover:text-white hover:border-gamingOrange disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllGames;
