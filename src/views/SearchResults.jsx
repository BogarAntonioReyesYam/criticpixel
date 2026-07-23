import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, ArrowUpDown, ArrowUpNarrowWide, ArrowDownWideNarrow, ArrowUpAZ, DollarSign, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import GameListItem from '../components/GameListItem';
import useSEO from '../hooks/useSEO';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const sortRef = useRef(null);
  const genreRef = useRef(null);

  const sortOptions = [
    { id: 'relevance', label: 'Relevancia', icon: Target },
    { id: 'score-desc', label: 'Mayor Puntaje', icon: ArrowUpNarrowWide },
    { id: 'score-asc', label: 'Menor Puntaje', icon: ArrowDownWideNarrow },
    { id: 'price-asc', label: 'Menor Precio', icon: DollarSign },
    { id: 'price-desc', label: 'Mayor Precio', icon: DollarSign },
    { id: 'alpha', label: 'A-Z', icon: ArrowUpAZ },
  ];

  useSEO({
    title: `Resultados: ${query}`,
    description: `Resultados de búsqueda para "${query}" en CriticPixel.`
  });

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const { data } = await supabase.from('games').select('*');
      if (data && data.length > 0) {
        const mockMap = new Map(mockGames.map(g => [g.id, g]));
        const supabaseFormatted = data.map(g => {
          const mock = mockMap.get(g.id);
          return {
            ...mock,
            ...g,
            globalScore: parseFloat(g.global_score) || (mock?.globalScore || 0),
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortMenu(false);
      if (genreRef.current && !genreRef.current.contains(e.target)) setShowGenreMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const genres = useMemo(() => {
    const genreSet = new Set(games.map(g => g.genre || g.specs?.genero).filter(Boolean));
    return ['all', ...Array.from(genreSet)];
  }, [games]);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();

    let filtered = games.filter(game =>
      game.title?.toLowerCase().includes(q) ||
      game.description?.toLowerCase().includes(q) ||
      game.about?.toLowerCase().includes(q) ||
      game.platforms?.some(p => p.toLowerCase().includes(q)) ||
      game.genre?.toLowerCase().includes(q) ||
      game.specs?.genero?.toLowerCase().includes(q) ||
      game.specs?.desarrollador?.toLowerCase().includes(q) ||
      game.specs?.editor?.toLowerCase().includes(q) ||
      game.reviews?.some(r => r.text?.toLowerCase().includes(q))
    );

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(game =>
        game.genre?.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        game.specs?.genero?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'score-desc': return filtered.sort((a, b) => b.globalScore - a.globalScore);
      case 'score-asc': return filtered.sort((a, b) => a.globalScore - b.globalScore);
      case 'price-asc': return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc': return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'alpha': return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default: return filtered;
    }
  }, [query, games, sortBy, selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            Resultados para "<span className="text-gamingOrange">{query}</span>"
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          {results.length} juego{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div ref={sortRef} className="relative">
          <button onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:border-gamingOrange/40 hover:text-gamingOrange transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOptions.find(o => o.id === sortBy)?.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showSortMenu && (
              <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-48 bg-gamingCard border border-white/10 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
                {sortOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button key={opt.id} onClick={() => { setSortBy(opt.id); setShowSortMenu(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold transition-colors ${
                        sortBy === opt.id ? 'bg-gamingOrange/10 text-gamingOrange' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}>
                      <Icon className="w-4 h-4" /> {opt.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={genreRef} className="relative">
          <button onClick={() => setShowGenreMenu(!showGenreMenu)}
            className="flex items-center gap-2 bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:border-gamingOrange/40 hover:text-gamingOrange transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {selectedGenre === 'all' ? 'Todos los géneros' : selectedGenre}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showGenreMenu ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showGenreMenu && (
              <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-48 bg-gamingCard border border-white/10 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden max-h-60 overflow-y-auto">
                {genres.map((g) => (
                  <button key={g} onClick={() => { setSelectedGenre(g); setShowGenreMenu(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-left transition-colors ${
                      selectedGenre === g ? 'bg-gamingOrange/10 text-gamingOrange' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}>
                    {g === 'all' ? 'Todos los géneros' : g}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((game, i) => (
              <GameListItem key={game.id} game={game} index={i} />
            ))}
          </div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gamingCard/30 rounded-3xl border border-dashed border-white/10"
        >
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-xl font-bold italic mb-4">
            No se encontraron resultados para "<span className="text-gamingOrange">{query}</span>"
          </p>
          <p className="text-gray-600 text-sm">Intenta con otros términos de búsqueda</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;
