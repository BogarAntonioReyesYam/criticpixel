import { Link } from 'react-router-dom';
import { Heart, Star, Monitor, Gamepad2, Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const platformIcons = {
  PC: <Monitor className="w-3 h-3" />,
  PS5: <Gamepad2 className="w-3 h-3" />,
  Switch: <Disc className="w-3 h-3" />,
  'Xbox Series X': <Monitor className="w-3 h-3" />,
};

const GameListItem = ({ game, index = 0 }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { theme } = useTheme();
  const wishlisted = isWishlisted(game.id);
  const isLight = theme === 'light';

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        to={`/game/${game.id}`}
        className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
          isLight
            ? 'bg-white border border-gray-200 hover:shadow-md'
            : 'bg-gamingCard border border-transparent hover:border-gamingOrange/30'
        }`}
      >
        <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-sm leading-tight truncate group-hover:text-gamingOrange transition-colors ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            {game.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-1">
              {game.platforms?.slice(0, 3).map((p) => (
                <span key={p} className={`text-[9px] px-1.5 py-0.5 rounded-md uppercase font-medium ${
                  isLight ? 'bg-gray-100 text-gray-600' : 'bg-white/5 text-gamingMuted'
                }`}>
                  {p === 'Xbox Series X' ? 'XSX' : p}
                </span>
              ))}
            </div>
            {game.genre && (
              <span className="text-[10px] text-gamingOrange font-bold">
                {game.genre}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {game.price && (
            <span className={`text-sm font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>
              ${game.price.toLocaleString()}
            </span>
          )}
          <div className="flex items-center gap-1 bg-gamingOrange/10 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-gamingOrange fill-gamingOrange" />
            <span className="text-sm font-black text-gamingOrange">{game.globalScore}</span>
          </div>
          <motion.button
            onClick={handleToggle}
            whileTap={{ scale: 0.8 }}
            className={`p-2 rounded-full transition-all ${
              wishlisted
                ? 'bg-red-500/20 text-red-500'
                : isLight
                  ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-500/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameListItem;
