import { useState, useMemo, useEffect } from 'react';
import { Film, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockGames } from '../data/mockGames';
import { useTheme } from '../context/ThemeContext';

const TrailersPage = () => {
  const [games] = useState(() => mockGames);
  const [isLoading] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
        <div className="space-y-8">
          {[1,2,3].map(i => (
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
              <div className={`rounded-2xl overflow-hidden border ${
                isLight ? 'bg-white border-gray-200' : 'bg-gamingCard border-white/10'
              }`}>
                {/* Video embed */}
                <div className="relative aspect-video">
                  {activeTrailer === game.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${game.trailer}?autoplay=1&rel=0`}
                      title={`${game.title} Trailer`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={game.image}
                        alt={game.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <button
                        onClick={() => setActiveTrailer(game.id)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-14 h-14 rounded-full bg-gamingOrange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-gamingOrange/30">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </button>
                    </>
                  )}
                </div>

                {/* Info bar */}
                <div className={`flex items-center justify-between p-4 ${isLight ? 'bg-gray-50' : 'bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/game/${game.id}`}
                      className={`font-black text-lg hover:text-gamingOrange transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}
                    >
                      {game.title}
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gamingOrange">{game.globalScore}/10</span>
                      {game.specs?.genero && (
                        <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                          · {game.specs.genero}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${game.trailer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                      isLight ? 'text-gray-500 hover:text-red-600' : 'text-gamingMuted hover:text-red-400'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    YouTube
                  </a>
                </div>
              </div>
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
