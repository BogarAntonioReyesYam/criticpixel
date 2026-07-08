import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const GameCard = ({ game, index = 0 }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { theme } = useTheme();
  const wishlisted = isWishlisted(game.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game.id);
  };

  const isLight = theme === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link 
        to={`/game/${game.id}`}
        className={`group relative rounded-xl overflow-hidden block transition-all duration-300 hover:-translate-y-1.5 ${
          isLight 
            ? 'bg-white border border-gray-200 shadow-md hover:shadow-lg' 
            : 'bg-gamingCard border border-transparent hover:border-gamingOrange/30 shadow-2xl'
        }`}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70" />
          
          <div className="absolute top-3 left-3 bg-gamingOrange text-white font-black px-2.5 py-1 rounded-lg text-sm shadow-lg shadow-gamingOrange/30">
            {game.globalScore}
          </div>

          <motion.button
            onClick={handleToggle}
            whileTap={{ scale: 0.8 }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-200 ${
              wishlisted
                ? 'bg-red-500/30 border-red-500/50'
                : 'bg-black/30 border-white/10 hover:bg-red-500/20 hover:border-red-500/30'
            }`}
            title={wishlisted ? 'Quitar de deseados' : 'Añadir a deseados'}
          >
            <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </motion.button>
        </div>

        <div className="p-3 space-y-2">
          <h3 className={`font-bold text-sm leading-tight line-clamp-2 h-9 group-hover:text-gamingOrange transition-colors ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {game.platforms.slice(0, 2).map((p) => (
                <span key={p} className={`text-[9px] px-1.5 py-0.5 rounded-md uppercase font-medium ${
                  isLight 
                    ? 'bg-gray-100 text-gray-600 border border-gray-200' 
                    : 'bg-white/5 text-gamingMuted border border-white/5'
                }`}>
                  {p === "Xbox Series X" ? "XSX" : p}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-gamingOrange font-bold uppercase tracking-tighter">
              Ver Reseña
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
