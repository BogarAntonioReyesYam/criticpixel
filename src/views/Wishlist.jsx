import { useState, useEffect } from 'react';
import { Heart, ChevronLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import { useWishlist } from '../context/WishlistContext';
import { GameGridSkeleton } from '../components/Skeletons';
import useSEO from '../hooks/useSEO';

const Wishlist = () => {
  useSEO({
    title: 'Mi Lista de Deseados',
    description: 'Tus juegos favoritos guardados en un solo lugar.'
  });
  const { wishlistIds } = useWishlist();
  const [wishlistGames, setWishlistGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);

      if (wishlistIds.length === 0) {
        setWishlistGames([]);
        setIsLoading(false);
        return;
      }

      // Intentar cargar desde Supabase
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .in('id', wishlistIds);

      if (data && data.length > 0) {
        // Ordenar según el orden en wishlistIds
        const ordered = wishlistIds
          .map(id => data.find(g => g.id === id))
          .filter(Boolean);
        setWishlistGames(ordered);
      } else {
        // Fallback a mockGames
        const filtered = mockGames.filter(game => wishlistIds.includes(game.id));
        setWishlistGames(filtered);
      }

      setIsLoading(false);
    };

    loadGames();
  }, [wishlistIds]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 space-y-4">
          <div className="h-5 w-40 bg-white/5 rounded animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 rounded-2xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-64 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <GameGridSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 space-y-4"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
          <ChevronLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>
        <div className="flex items-center gap-4">
          <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              Mi Lista de <span className="text-red-500">Deseados</span>
            </h1>
            <p className="text-gray-400">
              {wishlistGames.length === 0
                ? 'Tu lista esta vacia.'
                : `Tienes ${wishlistGames.length} juego${wishlistGames.length !== 1 ? 's' : ''} guardado${wishlistGames.length !== 1 ? 's' : ''}.`}
            </p>
          </div>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {wishlistGames.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {wishlistGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-32 bg-gamingCard/30 rounded-[3rem] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-6"
          >
            <div className="bg-white/5 p-6 rounded-full">
              <Gamepad2 className="w-16 h-12 text-gray-700" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-400">Tu lista esta vacia</h2>
              <p className="text-gray-600 max-w-xs mx-auto">
                Explora el catalogo y marca tus juegos favoritos con el corazon para verlos aqui.
              </p>
            </div>
            <Link 
              to="/" 
              className="bg-gamingOrange text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gamingOrange/20"
            >
              Explorar Juegos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;
