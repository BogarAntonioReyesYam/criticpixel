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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link 
        to={`/game/${game.id}`}
        className="group relative rounded-xl overflow-hidden block transition-all duration-300 hover:-translate-y-1.5"
        style={{ 
          backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
          boxShadow: theme === 'dark' 
            ? '0 4px 20px rgba(0,0,0,0.4)' 
            : '0 2px 12px rgba(0,0,0,0.08)',
          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        {/* Contenedor de Imagen */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70" />
          
          {/* Badge de Puntaje */}
          <div className="absolute top-3 left-3 bg-gamingOrange text-white font-black px-2.5 py-1 rounded-lg text-sm shadow-lg shadow-gamingOrange/30">
            {game.globalScore}
          </div>

          {/* Botón de Favorito */}
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

        {/* Información Compacta */}
        <div className="p-3 space-y-2">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 h-9 group-hover:text-gamingOrange transition-colors text-gamingText dark:text-white">
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {game.platforms.slice(0, 2).map((p) => (
                <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-md uppercase font-medium transition-colors"
                      style={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        color: theme === 'dark' ? '#999' : '#666',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
                      }}>
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
