import { useState } from 'react';
import { Dice5, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const RandomGame = ({ games }) => {
  const [randomGame, setRandomGame] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const pickRandom = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * games.length);
      setRandomGame(games[idx]);
      setIsSpinning(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`mb-10 p-6 rounded-2xl border ${
        isLight
          ? 'bg-gradient-to-r from-orange-50 to-white border-orange-200'
          : 'bg-gradient-to-r from-gamingOrange/10 to-gamingCard border-gamingOrange/20'
      }`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-gamingOrange" />
          <div>
            <h3 className={`font-black text-lg uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              ¿No sabes qué jugar?
            </h3>
            <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              Deja que el azar decida por ti
            </p>
          </div>
        </div>

        <motion.button
          onClick={pickRandom}
          whileTap={{ scale: 0.95 }}
          disabled={isSpinning}
          className="flex items-center gap-2 bg-gamingOrange text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-gamingOrange/90 transition-all disabled:opacity-50"
        >
          <motion.div
            animate={isSpinning ? { rotate: 360 } : {}}
            transition={{ duration: 0.6, ease: 'linear' }}
          >
            <Dice5 className="w-5 h-5" />
          </motion.div>
          {isSpinning ? 'Sorteando...' : 'Recomiéndame uno'}
        </motion.button>
      </div>

      <AnimatePresence>
        {randomGame && !isSpinning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Link
              to={`/game/${randomGame.id}`}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5 ${
                isLight
                  ? 'bg-white border border-gray-200 hover:shadow-md'
                  : 'bg-gamingCard/50 border border-white/10 hover:border-gamingOrange/30'
              }`}
            >
              <img
                src={randomGame.image}
                alt={randomGame.title}
                className="w-16 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {randomGame.title}
                </h4>
                <p className={`text-sm mt-0.5 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                  {randomGame.specs?.genero} · {randomGame.globalScore}/10
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gamingOrange flex-shrink-0" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RandomGame;
