import { useState, useMemo } from 'react';
import { Film, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import { useTheme } from '../context/ThemeContext';
import useSEO from '../hooks/useSEO';

const TrailersPage = () => {
  useSEO({
    title: 'Tráilers Destacados',
    description: 'Los tráilers más esperados de la industria gaming.'
  });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useState(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (!error && data && data.length > 0) {
        setGames(data.map(g => ({ ...g, globalScore: parseFloat(g.global_score) })));
      } else {
        setGames(mockGames);
      }
      setIsLoading(false);
    };
    fetchGames();
  }, []);

  const gamesWithTrailers = useMemo(() => games.filter(g => g.trailer), [games]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <Film className="w-8 h-8 text-gamingOrange" />
          <h1 className={`text-4xl font-black italic tracking-tighter uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
            <span className="text-gamingOrange">Tráilers</span> Destacados
          </h1>
        </div>
        <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
          Los tráilers más esperados de la industria gaming
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className={`aspect-video rounded-2xl animate-pulse ${isLight ? 'bg-gray-100' : 'bg-gamingCard'}`} />
          ))}
        </div>
      ) : gamesWithTrailers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gamesWithTrailers.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/game/${game.id}`}
                className={`group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${
                  isLight
                    ? 'bg-white border-gray-200 hover:shadow-lg'
                    : 'bg-gamingCard border-white/10 hover:border-gamingOrange/30'
                }`}
              >
                <div className="relative aspect-video">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gamingOrange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gamingOrange/30">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-black text-xl text-white">{game.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-bold text-gamingOrange">{game.globalScore}/10</span>
                      <span className="text-sm text-gray-300">{game.specs?.genero}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 rounded-2xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-gamingCard/30 border-white/5'}`}>
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className={`font-bold ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
            No hay tráilers disponibles aún
          </p>
        </div>
      )}
    </div>
  );
};

export default TrailersPage;
