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
    >
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-gamingOrange" />
        <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Lo Más Buscado
        </h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {trending.map((game, i) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className={`flex-shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 min-w-[180px] ${
              isLight
                ? 'bg-white border border-gray-200 hover:shadow-md'
                : 'bg-gamingCard/50 border border-white/5 hover:border-gamingOrange/30'
            }`}
          >
            <img src={game.image} alt={game.title} className="w-10 h-12 rounded-lg object-cover flex-shrink-0" />
            <div className="min-w-0">
              <h3 className={`font-bold text-xs truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {game.title}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-2.5 h-2.5 text-gamingOrange" />
                <span className="text-[10px] text-gamingOrange font-bold">{game.globalScore}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingNow;
