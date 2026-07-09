import { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import { useTheme } from '../context/ThemeContext';
import useSEO from '../hooks/useSEO';

const ReleasesCalendar = () => {
  useSEO({
    title: 'Calendario de Lanzamientos',
    description: 'No te pierdas ningún lanzamiento importante. Calendario de próximos videojuegos.'
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const filteredGames = useMemo(() => {
    return games
      .filter(g => {
        if (!g.releaseDate) return false;
        const d = new Date(g.releaseDate);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      })
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }, [games, selectedMonth, selectedYear]);

  const upcomingGames = useMemo(() => {
    const now = new Date();
    return games
      .filter(g => g.releaseDate && new Date(g.releaseDate) >= now)
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
      .slice(0, 5);
  }, [games]);

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(y => y - 1);
    } else {
      setSelectedMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(y => y + 1);
    } else {
      setSelectedMonth(m => m + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-gamingOrange" />
          <h1 className={`text-4xl font-black italic tracking-tighter uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Calendario de <span className="text-gamingOrange">Lanzamientos</span>
          </h1>
        </div>
        <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
          No te pierdas ningún lanzamiento importante
        </p>
      </motion.div>

      {/* Upcoming Section */}
      {upcomingGames.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gamingOrange" />
            <h2 className={`text-lg font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Próximos Lanzamientos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingGames.map((game, i) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className={`group flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 ${
                  isLight
                    ? 'bg-white border border-gray-200 hover:shadow-md'
                    : 'bg-gamingCard/50 border border-white/5 hover:border-gamingOrange/30'
                }`}
              >
                <img src={game.image} alt={game.title} loading="lazy" className="w-14 h-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className={`font-bold text-sm truncate group-hover:text-gamingOrange transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {game.title}
                  </h3>
                  <p className="text-xs text-gamingOrange font-bold mt-0.5">
                    {new Date(game.releaseDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Month Navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-6 mb-8"
      >
        <button
          onClick={prevMonth}
          className={`p-2 rounded-lg transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-gray-400'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className={`text-2xl font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {months[selectedMonth]} {selectedYear}
          </h2>
        </div>
        <button
          onClick={nextMonth}
          className={`p-2 rounded-lg transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-gray-400'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Games for selected month */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className={`h-32 rounded-xl animate-pulse ${isLight ? 'bg-gray-100' : 'bg-gamingCard'}`} />
          ))}
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/game/${game.id}`}
                className={`group block p-4 rounded-xl transition-all hover:-translate-y-0.5 ${
                  isLight
                    ? 'bg-white border border-gray-200 hover:shadow-md'
                    : 'bg-gamingCard/50 border border-white/5 hover:border-gamingOrange/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={game.image} alt={game.title} loading="lazy" className="w-16 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className={`font-bold text-sm group-hover:text-gamingOrange transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {game.title}
                    </h3>
                    <p className="text-xs text-gamingOrange font-bold mt-1">
                      {new Date(game.releaseDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
                    </p>
                    <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                      {game.specs?.genero} · {game.globalScore}/10
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-16 rounded-2xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-gamingCard/30 border-white/5'}`}>
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className={`font-bold ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
            No hay lanzamientos este mes
          </p>
        </div>
      )}
    </div>
  );
};

export default ReleasesCalendar;
