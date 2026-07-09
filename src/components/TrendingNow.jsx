import { Flame, TrendingUp, Crown, Medal, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const rankStyles = [
  { bg: 'from-yellow-500/20 to-orange-500/10', border: 'border-yellow-500/30', icon: <Crown className="w-3.5 h-3.5 text-yellow-400" />, glow: 'shadow-yellow-500/20', numColor: 'text-yellow-400' },
  { bg: 'from-gray-300/10 to-gray-400/5', border: 'border-gray-400/20', icon: <Medal className="w-3.5 h-3.5 text-gray-300" />, glow: 'shadow-gray-400/10', numColor: 'text-gray-300' },
  { bg: 'from-amber-600/10 to-amber-700/5', border: 'border-amber-600/20', icon: <Award className="w-3.5 h-3.5 text-amber-600" />, glow: 'shadow-amber-600/10', numColor: 'text-amber-600' },
];

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
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gamingOrange/10">
          <Flame className="w-3.5 h-3.5 text-gamingOrange" />
        </div>
        <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Lo Más Buscado
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gamingOrange/30 to-transparent ml-2" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {trending.map((game, i) => {
          const isTop3 = i < 3;
          const style = isTop3 ? rankStyles[i] : null;

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <Link
                to={`/game/${game.id}`}
                className={`group relative flex-shrink-0 w-[200px] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 block ${
                  isTop3 && !isLight
                    ? `bg-gradient-to-br ${style.bg} border ${style.border} hover:${style.glow} hover:shadow-lg`
                    : isLight
                      ? 'bg-white border border-gray-200 hover:shadow-lg'
                      : 'bg-gamingCard/50 border border-white/5 hover:border-gamingOrange/30 hover:shadow-lg'
                }`}
              >
                {/* Imagen de fondo sutil */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img src={game.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                </div>

                <div className="relative p-3 flex items-center gap-3">
                  {/* Rank number */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    isTop3
                      ? `${style.numColor} bg-white/5`
                      : isLight
                        ? 'text-gray-400 bg-gray-100'
                        : 'text-gray-600 bg-white/5'
                  }`}>
                    {isTop3 ? style.icon : `#${i + 1}`}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-bold text-xs truncate transition-colors ${
                      isLight ? 'text-gray-900 group-hover:text-gamingOrange' : 'text-white group-hover:text-gamingOrange'
                    }`}>
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center gap-0.5 bg-gamingOrange/10 px-1.5 py-0.5 rounded-md">
                        <TrendingUp className="w-2.5 h-2.5 text-gamingOrange" />
                        <span className="text-[10px] text-gamingOrange font-black">{game.globalScore}</span>
                      </div>
                      {game.genre && (
                        <span className={`text-[9px] font-medium truncate ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                          {game.genre}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default TrendingNow;
