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
      className={`h-full rounded-2xl border p-5 flex flex-col justify-between ${
        isLight
          ? 'bg-gradient-to-br from-orange-50 to-white border-orange-200'
          : 'bg-gradient-to-br from-gamingOrange/10 to-gamingCard border-gamingOrange/20'
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-gamingOrange" />
          <h3 className={`font-black text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
            ¿No sabes qué jugar?
          </h3>
        </div>
        <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
          Deja que el azar decida por ti
        </p>
      </div>

      <div className="mt-4">
        <motion.button
          onClick={pickRandom}
          whileTap={{ scale: 0.95 }}
          disabled={isSpinning}
          className="w-full flex items-center justify-center gap-2 bg-gamingOrange text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gamingOrange/90 transition-all disabled:opacity-50"
        >
          <motion.div
            animate={isSpinning ? { rotate: 360 } : {}}
            transition={{ duration: 0.6, ease: 'linear' }}
          >
            <Dice5 className="w-4 h-4" />
          </motion.div>
          {isSpinning ? 'Sorteando...' : 'Recomiéndame uno'}
        </motion.button>

        <AnimatePresence>
          {randomGame && !isSpinning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <Link
                to={`/game/${randomGame.id}`}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all hover:-translate-y-0.5 ${
                  isLight
                    ? 'bg-white border border-gray-200 hover:shadow-md'
                    : 'bg-gamingCard/50 border border-white/10 hover:border-gamingOrange/30'
                }`}
              >
                <img
                  src={randomGame.image}
                  alt={randomGame.title}
                  className="w-10 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className={`font-bold text-xs truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {randomGame.title}
                  </h4>
                  <p className={`text-[10px] mt-0.5 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                    {randomGame.specs?.genero} · {randomGame.globalScore}/10
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gamingOrange flex-shrink-0" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RandomGame;
