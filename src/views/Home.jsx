import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, SortAsc, SortDesc, Type, LayoutGrid, List, Monitor, Laptop, Gamepad2, Disc, Search as SearchIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import GameListItem from '../components/GameListItem';
import AdvancedFilters from '../components/AdvancedFilters';
import TrendingNow from '../components/TrendingNow';
import RandomGame from '../components/RandomGame';
import TrailerSection from '../components/TrailerSection';
import { GameGridSkeleton } from '../components/Skeletons';
import useSEO from '../hooks/useSEO';

const ITEMS_PER_PAGE = 8;

const Home = ({ searchQuery }) => {
  useSEO({
    title: 'Catálogo de Juegos',
    description: 'Explora los títulos más destacados de la industria gaming. Reseñas honestas, scores reales.'
  });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ genre: 'Todos', priceRange: 'all', dateRange: 'all' });
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*');
      
      if (!error && data && data.length > 0) {
        const mockMap = new Map(mockGames.map(g => [g.id, g]));
        const supabaseFormatted = data.map(g => {
          const mock = mockMap.get(g.id);
          return {
            ...mock,
            ...g,
            globalScore: parseFloat(g.global_score) || (mock?.globalScore || 0),
            releaseDate: g.release_date || mock?.releaseDate || null,
            trailer: g.trailer || mock?.trailer || null,
            price: g.price || mock?.price || 0,
          };
        });
        const supabaseIds = new Set(data.map(g => g.id));
        const additionalGames = mockGames.filter(g => !supabaseIds.has(g.id));
        setGames([...supabaseFormatted, ...additionalGames]);
      } else {
        if (error) console.error('Supabase error:', error);
        setGames(mockGames);
      }
      setIsLoading(false);
    };

    fetchGames();
  }, []);

  const sortOptions = [
    { id: 'score-desc', label: 'Mayor a Menor (Puntaje)', icon: <SortDesc className="w-4 h-4" /> },
    { id: 'score-asc', label: 'Menor a Mayor (Puntaje)', icon: <SortAsc className="w-4 h-4" /> },
    { id: 'alpha-asc', label: 'A-Z (Nombre)', icon: <Type className="w-4 h-4" /> },
    { id: 'alpha-desc', label: 'Z-A (Nombre)', icon: <Type className="w-4 h-4" /> },
  ];

  const platforms = [
    { id: 'all', label: 'Todo', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'PC', label: 'PC', icon: <Monitor className="w-4 h-4" /> },
    { id: 'PS5', label: 'PlayStation', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'Xbox', label: 'Xbox', icon: <Laptop className="w-4 h-4" /> },
    { id: 'Switch', label: 'Nintendo', icon: <Disc className="w-4 h-4" /> },
  ];

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(game =>
        game.title?.toLowerCase().includes(q) ||
        game.description?.toLowerCase().includes(q) ||
        game.about?.toLowerCase().includes(q) ||
        game.platforms?.some(p => p.toLowerCase().includes(q)) ||
        game.specs?.genero?.toLowerCase().includes(q) ||
        game.specs?.desarrollador?.toLowerCase().includes(q) ||
        game.specs?.editor?.toLowerCase().includes(q) ||
        game.editions?.some(e => e.name?.toLowerCase().includes(q)) ||
        game.reviews?.some(r => r.text?.toLowerCase().includes(q) || r.user?.toLowerCase().includes(q))
      );
    }

    if (platformFilter !== 'all') {
      result = result.filter(game => 
        game.platforms?.some(p => p.includes(platformFilter))
      );
    }

    // Advanced Filters
    if (filters.genre !== 'Todos') {
      result = result.filter(game =>
        game.genre?.toLowerCase().includes(filters.genre.toLowerCase()) ||
        game.specs?.genero?.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    if (filters.priceRange !== 'all') {
      result = result.filter(game => {
        const price = game.price || 0;
        switch (filters.priceRange) {
          case '0-800': return price < 800;
          case '800-1200': return price >= 800 && price <= 1200;
          case '1200-1500': return price >= 1200 && price <= 1500;
          case '1500+': return price > 1500;
          default: return true;
        }
      });
    }

    if (filters.dateRange !== 'all') {
      result = result.filter(game => {
        if (!game.releaseDate) return false;
        const year = new Date(game.releaseDate).getFullYear();
        if (filters.dateRange === 'future') {
          return new Date(game.releaseDate) > new Date();
        }
        return year === parseInt(filters.dateRange);
      });
    }

    return result.sort((a, b) => {
      switch (sortOrder) {
        case 'score-desc':
          return b.globalScore - a.globalScore;
        case 'score-asc':
          return a.globalScore - b.globalScore;
        case 'alpha-asc':
          return a.title.localeCompare(b.title);
        case 'alpha-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [sortOrder, platformFilter, games, searchQuery, filters]);

  const visibleGames = useMemo(() => {
    return filteredAndSortedGames.slice(0, visibleCount);
  }, [filteredAndSortedGames, visibleCount]);

  const hasMore = visibleCount < filteredAndSortedGames.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 400);
  }, [isLoadingMore, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, platformFilter, sortOrder, filters]);

  const activeFilterCount = (filters.genre !== 'Todos' ? 1 : 0) + (filters.priceRange !== 'all' ? 1 : 0) + (filters.dateRange !== 'all' ? 1 : 0);

  const currentSortOption = sortOptions.find(opt => opt.id === sortOrder);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="h-10 w-64 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-80 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="h-10 w-56 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-10 w-24 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <GameGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-1">
              Reseñas <span className="text-gamingOrange">Populares</span>
            </h1>
            <p className="text-gray-400 text-sm">Explora los títulos más destacados de la industria.</p>
            {searchQuery && (
              <p className="text-sm text-gamingOrange font-bold mt-1">
                {filteredAndSortedGames.length} resultado{filteredAndSortedGames.length !== 1 ? 's' : ''} para "<span className="text-white">{searchQuery}</span>"
              </p>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gamingCard border border-white/10 px-4 py-2 rounded-lg hover:border-gamingOrange transition-colors min-w-[200px] justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {currentSortOption.icon}
                {currentSortOption.label}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-gamingCard border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => { setSortOrder(option.id); setIsDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors text-left ${
                      sortOrder === option.id ? 'text-gamingOrange' : 'text-gray-400'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2 p-1.5 bg-gamingCard/50 border border-white/5 rounded-2xl">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatformFilter(p.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
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

          <div className="flex items-center gap-2 ml-auto">
            <AdvancedFilters filters={filters} onFilterChange={setFilters} activeFilterCount={activeFilterCount} />

            <div className="flex items-center gap-0.5 bg-gamingCard/50 border border-white/5 rounded-lg p-0.5">
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
        </div>
      </motion.header>

      {!searchQuery && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <TrendingNow games={games} />
          </div>
          <div className="lg:col-span-1">
            <RandomGame games={games} />
          </div>
        </div>
      )}

      {!searchQuery && <TrailerSection games={games} />}

      {visibleGames.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleGames.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {visibleGames.map((game, i) => (
                <GameListItem key={game.id} game={game} index={i} />
              ))}
            </div>
          )}

          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-8">
              {isLoadingMore ? (
                <Loader2 className="w-6 h-6 text-gamingOrange animate-spin" />
              ) : (
                <div className="h-1" />
              )}
            </div>
          )}

          {!hasMore && filteredAndSortedGames.length > ITEMS_PER_PAGE && (
            <p className="text-center text-gray-600 text-xs py-6">Todos los juegos cargados</p>
          )}
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gamingCard/30 rounded-3xl border border-dashed border-white/10"
        >
          <SearchIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          {searchQuery ? (
            <p className="text-gray-500 text-xl font-bold italic">No se encontraron resultados para "<span className="text-gamingOrange">{searchQuery}</span>".</p>
          ) : (
            <p className="text-gray-500 text-xl font-bold italic">No hay juegos disponibles para esta plataforma.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
