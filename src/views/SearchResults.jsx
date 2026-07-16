import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
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

  useSEO({
    title: `Resultados: ${query}`,
    description: `Resultados de búsqueda para "${query}" en PixelVerdict.`
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 focus:outline-none focus:border-gamingOrange"
        >
          <option value="relevance">Relevancia</option>
          <option value="score-desc">Mayor Puntaje</option>
          <option value="score-asc">Menor Puntaje</option>
          <option value="price-asc">Menor Precio</option>
          <option value="price-desc">Mayor Precio</option>
          <option value="alpha">A-Z</option>
        </select>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 focus:outline-none focus:border-gamingOrange"
        >
          {genres.map(g => (
            <option key={g} value={g}>{g === 'all' ? 'Todos los géneros' : g}</option>
          ))}
        </select>
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
