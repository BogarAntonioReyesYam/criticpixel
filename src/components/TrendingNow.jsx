import { Flame, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TrendingNow = ({ games }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const trending = [...games]
    .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
    .slice(0, 5);

  if (trending.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-gamingOrange" />
        <h2 className={`text-lg font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Lo Más Buscado
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {trending.map((game, i) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 min-w-[200px] ${
              isLight
                ? 'bg-white border border-gray-200 hover:shadow-md'
                : 'bg-gamingCard/50 border border-white/5 hover:border-gamingOrange/30'
            }`}
          >
            <span className="text-2xl font-black text-gamingOrange/30">#{i + 1}</span>
            <div className="min-w-0">
              <h3 className={`font-bold text-sm truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {game.title}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-gamingOrange" />
                <span className="text-xs text-gamingOrange font-bold">{game.globalScore}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingNow;
