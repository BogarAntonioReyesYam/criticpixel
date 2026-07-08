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
      className="mb-10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Film className="w-5 h-5 text-gamingOrange" />
        <h2 className={`text-lg font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Tráilers Destacados
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesWithTrailers.slice(0, 6).map((game, i) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className={`group relative rounded-xl overflow-hidden aspect-video ${
              isLight
                ? 'bg-gray-100 border border-gray-200'
                : 'bg-gamingCard border border-white/10'
            }`}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gamingOrange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gamingOrange/30">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-bold text-sm text-white leading-tight">{game.title}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{game.globalScore}/10</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default TrailerSection;
