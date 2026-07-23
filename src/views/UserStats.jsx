import { useState, useMemo } from 'react';
import { BarChart3, Heart, Clock, Trophy, TrendingUp, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import { useTheme } from '../context/ThemeContext';
import Achievements from '../components/Achievements';
import useSEO from '../hooks/useSEO';

const UserStats = () => {
  useSEO({
    title: 'Mis Estadísticas',
    description: 'Resumen de tu actividad en CriticPixel. Juegos, scores y plataformas.'
  });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { wishlistIds } = useWishlist();

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

  const stats = useMemo(() => {
    const totalGames = games.length;
    const avgScore = games.length > 0
      ? (games.reduce((acc, g) => acc + g.globalScore, 0) / games.length).toFixed(1)
      : 0;
    const topGenre = games.reduce((acc, g) => {
      const genre = g.genre || g.specs?.genero || 'Desconocido';
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    const topGenreName = Object.entries(topGenre).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const avgPrice = games.length > 0
      ? Math.round(games.reduce((acc, g) => acc + (g.price || 0), 0) / games.length)
      : 0;
    const gamesByPlatform = games.reduce((acc, g) => {
      g.platforms?.forEach(p => {
        acc[p] = (acc[p] || 0) + 1;
      });
      return acc;
    }, {});
    const wishlistCount = wishlistIds?.length || 0;

    return {
      totalGames,
      avgScore,
      topGenreName,
      avgPrice,
      gamesByPlatform,
      wishlistCount,
    };
  }, [games, wishlistIds]);

  const statCards = [
    { label: 'Juegos en Catálogo', value: stats.totalGames, icon: <Gamepad2 className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Score Promedio', value: stats.avgScore, icon: <Trophy className="w-5 h-5" />, color: 'text-gamingOrange' },
    { label: 'Género Top', value: stats.topGenreName, icon: <TrendingUp className="w-5 h-5" />, color: 'text-purple-500' },
    { label: 'Precio Promedio', value: `$${stats.avgPrice.toLocaleString()}`, icon: <BarChart3 className="w-5 h-5" />, color: 'text-green-500' },
    { label: 'Mi Lista de Deseos', value: stats.wishlistCount, icon: <Heart className="w-5 h-5" />, color: 'text-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-gamingOrange" />
          <h1 className={`text-4xl font-black italic tracking-tighter uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Mis <span className="text-gamingOrange">Estadísticas</span>
          </h1>
        </div>
        <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
          Resumen de tu actividad en CriticPixel
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border p-5 text-center ${
              isLight
                ? 'bg-white border-gray-200'
                : 'bg-gamingCard/50 border-white/10'
            }`}
          >
            <div className={`${stat.color} mb-2 flex justify-center`}>{stat.icon}</div>
            <div className={`text-2xl font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>{stat.value}</div>
            <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-2xl border p-6 mb-10 ${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'}`}
      >
        <h3 className={`font-black text-sm uppercase tracking-wider mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Juegos por Plataforma
        </h3>
        <div className="space-y-3">
          {Object.entries(stats.gamesByPlatform)
            .sort((a, b) => b[1] - a[1])
            .map(([platform, count]) => (
              <div key={platform} className="flex items-center gap-3">
                <span className={`text-sm font-bold w-20 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{platform}</span>
                <div className="flex-1 h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.totalGames) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full bg-gamingOrange rounded-full"
                  />
                </div>
                <span className={`text-xs font-bold ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>{count}</span>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`rounded-2xl border p-6 mb-10 ${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'}`}
      >
        <Achievements />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'}`}
      >
        <h3 className={`font-black text-sm uppercase tracking-wider mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Acceso Rápido
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Catálogo', path: '/', icon: <Gamepad2 className="w-4 h-4" /> },
            { label: 'Rankings', path: '/rankings', icon: <Trophy className="w-4 h-4" /> },
            { label: 'Calendario', path: '/releases', icon: <Clock className="w-4 h-4" /> },
            { label: 'Tráilers', path: '/trailers', icon: <TrendingUp className="w-4 h-4" /> },
          ].map((action) => (
            <a
              key={action.label}
              href={action.path}
              className={`flex items-center gap-2 p-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${
                isLight
                  ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <span className="text-gamingOrange">{action.icon}</span>
              {action.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserStats;
