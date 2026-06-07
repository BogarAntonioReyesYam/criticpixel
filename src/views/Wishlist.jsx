import { useState, useEffect } from 'react';
import { Heart, ChevronLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';

const Wishlist = () => {
  const [wishlistGames, setWishlistGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar IDs desde LocalStorage
    const savedIds = JSON.parse(localStorage.getItem('pixelVerdict_wishlist') || '[]');
    
    // Filtrar los juegos del mock que coincidan con los IDs guardados
    const filtered = mockGames.filter(game => savedIds.includes(game.id));
    
    setWishlistGames(filtered);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gamingOrange"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10 space-y-4">
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
            <p className="text-gray-400">Tienes {wishlistGames.length} juegos guardados en tu colección privada.</p>
          </div>
        </div>
      </header>

      {wishlistGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {wishlistGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gamingCard/30 rounded-[3rem] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-white/5 p-6 rounded-full">
            <Gamepad2 className="w-16 h-12 text-gray-700" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-400">Tu lista está vacía</h2>
            <p className="text-gray-600 max-w-xs mx-auto">Explora el catálogo y marca tus juegos favoritos con el corazón para verlos aquí.</p>
          </div>
          <Link 
            to="/" 
            className="bg-gamingOrange text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gamingOrange/20"
          >
            Explorar Juegos
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
