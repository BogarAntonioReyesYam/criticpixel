import { Search, User, Gamepad2, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery.trim());
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <nav className="bg-gamingBg border-b border-white/10 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={clearSearch}>
          <Gamepad2 className="w-8 h-8 text-gamingOrange group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tighter uppercase italic">
            Pixel<span className="text-gamingOrange">Verdict</span>
          </span>
        </Link>

        {/* Barra de Búsqueda */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md relative hidden md:block">
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Buscar juegos, reseñas..."
            className="w-full bg-gamingCard border border-white/5 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:border-gamingOrange transition-colors"
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/wishlist" 
            className="p-2 hover:bg-white/5 rounded-full transition-colors relative group"
            title="Mi lista de deseos"
          >
            <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
          </Link>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;