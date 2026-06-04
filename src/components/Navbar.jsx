import { Search, User, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gamingBg border-b border-white/10 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Gamepad2 className="w-8 h-8 text-gamingOrange group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tighter uppercase italic">
            Pixel<span className="text-gamingOrange">Verdict</span>
          </span>
        </Link>

        {/* Barra de Búsqueda */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar juegos, reseñas..."
            className="w-full bg-gamingCard border border-white/5 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-gamingOrange transition-colors"
          />
        </div>

        {/* Perfil */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
