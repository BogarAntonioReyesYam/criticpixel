import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, TrendingUp, Monitor, Gamepad2, Laptop, Disc } from 'lucide-react';
import { mockGames } from '../data/mockGames';
import useSEO from '../hooks/useSEO';

const rankingFilters = [
  { id: 'global', label: 'Global', icon: <Trophy className="w-4 h-4" /> },
  { id: 'PC', label: 'PC', icon: <Monitor className="w-4 h-4" /> },
  { id: 'PS5', label: 'PlayStation', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'Xbox', label: 'Xbox', icon: <Laptop className="w-4 h-4" /> },
  { id: 'Switch', label: 'Nintendo', icon: <Disc className="w-4 h-4" /> },
];

const genreFilters = [
  'Todos', 'Accion', 'Aventura', 'RPG', 'Shooter', 'Estrategia', 'Deportes', 'Simulacion', 'Puzzle'
];

const getScoreColor = (score) => {
  if (score >= 9) return '#ff6b00';
  if (score >= 8) return '#facc15';
  if (score >= 7) return '#22c55e';
  if (score >= 6) return '#f97316';
  return '#ef4444';
};

const getRankBadge = (rank) => {
  if (rank === 1) return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' };
  if (rank === 2) return { bg: 'bg-gray-300/20', border: 'border-gray-300/50', text: 'text-gray-300' };
  if (rank === 3) return { bg: 'bg-orange-700/20', border: 'border-orange-700/50', text: 'text-orange-400' };
  return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-gray-500' };
};

const Rankings = () => {
  useSEO({
    title: 'Top Rankings',
    description: 'Los juegos mejor calificados de nuestro catálogo. Rankings globales y por plataforma.'
  });
  const [platformFilter, setPlatformFilter] = useState('global');
  const [genreFilter, setGenreFilter] = useState('Todos');

  const rankedGames = useMemo(() => {
    let filtered = [...mockGames];

    if (platformFilter !== 'global') {
      filtered = filtered.filter(g => g.platforms?.some(p => p.includes(platformFilter)));
    }

    if (genreFilter !== 'Todos') {
      filtered = filtered.filter(g => g.specs?.genero?.toLowerCase().includes(genreFilter.toLowerCase()));
    }

    return filtered.sort((a, b) => b.globalScore - a.globalScore).slice(0, 10);
  }, [platformFilter, genreFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al catalogo
        </Link>

        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-gamingOrange/10 p-3 rounded-2xl border border-gamingOrange/20">
              <Trophy className="w-8 h-8 text-gamingOrange" />
            </div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                Top <span className="text-gamingOrange">Rankings</span>
              </h1>
              <p className="text-gray-400">Los juegos mejor calificados de nuestro catalogo.</p>
            </div>
          </div>
        </div>

        {/* Filtros de plataforma */}
        <div className="flex flex-wrap gap-2 mb-6">
          {rankingFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setPlatformFilter(f.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                platformFilter === f.id
                  ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20'
                  : 'bg-gamingCard text-gray-500 hover:text-white border border-white/5'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Filtros de género */}
        <div className="flex flex-wrap gap-2 mb-10">
          {genreFilters.map(g => (
            <button
              key={g}
              onClick={() => setGenreFilter(g)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                genreFilter === g
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Lista de rankings */}
        <div className="space-y-3">
          {rankedGames.map((game, i) => {
            const rank = i + 1;
            const badge = getRankBadge(rank);
            const color = getScoreColor(game.globalScore);

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/game/${game.id}`}
                  className="group flex items-center gap-4 bg-gamingCard rounded-xl p-4 border border-white/5 hover:border-gamingOrange/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Rank */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${badge.bg} ${badge.border}`}>
                    <span className={`text-lg font-black ${badge.text}`}>{rank}</span>
                  </div>

                  {/* Imagen */}
                  <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden">
                    <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold group-hover:text-gamingOrange transition-colors truncate">{game.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {game.platforms?.slice(0, 3).map(p => (
                        <span key={p} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-gray-500 uppercase font-medium">
                          {p === 'Xbox Series X' ? 'XSX' : p}
                        </span>
                      ))}
                      {game.specs?.genero && (
                        <span className="text-[8px] text-gamingOrange font-bold uppercase">{game.specs.genero}</span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-black" style={{ color }}>{game.globalScore}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">/ 10</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {rankedGames.length === 0 && (
            <div className="text-center py-20 bg-gamingCard/30 rounded-3xl border border-dashed border-white/10">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-bold italic">No hay juegos para estos filtros.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Rankings;
