import { Film, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TrailerSection = ({ games }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const gamesWithTrailers = games.filter(g => g.trailer);

  if (gamesWithTrailers.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <Film className="w-4 h-4 text-gamingOrange" />
        <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Tráilers Destacados
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-carousel">
        {gamesWithTrailers.slice(0, 6).map((game, i) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className={`group relative flex-shrink-0 w-[240px] rounded-xl overflow-hidden aspect-video ${
              isLight
                ? 'bg-gray-100 border border-gray-200'
                : 'bg-gamingCard border border-white/10'
            }`}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gamingOrange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gamingOrange/30">
                <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="font-bold text-xs text-white leading-tight truncate">{game.title}</h3>
              <p className="text-[10px] text-gray-300 mt-0.5">{game.globalScore}/10</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default TrailerSection;
