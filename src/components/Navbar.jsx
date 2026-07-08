import { Search, User, Gamepad2, Heart, X, Trophy, Newspaper, Info, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const { count } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const debouncedSearch = useCallback((val) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(val.trim());
    }, 300);
  }, [onSearch]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalQuery(val);
    debouncedSearch(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    onSearch(localQuery.trim());
  };

  const clearSearch = () => {
    setLocalQuery('');
    clearTimeout(debounceRef.current);
    onSearch('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 backdrop-blur-xl border-b transition-all duration-300"
         style={{ 
           backgroundColor: theme === 'dark' ? 'rgba(18,18,18,0.85)' : 'rgba(255,255,255,0.85)',
           borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
         }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={clearSearch}>
          <Gamepad2 className="w-8 h-8 text-gamingOrange group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tighter uppercase italic text-gamingText dark:text-white">
            Pixel<span className="text-gamingOrange">Verdict</span>
          </span>
        </Link>

        {/* Barra de Búsqueda */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md relative hidden md:block">
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gamingMuted hover:text-gamingOrange transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleChange}
            placeholder="Buscar juegos... (/)"
            className="w-full rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-gamingOrange/50 transition-all text-gamingText dark:text-white"
            style={{ 
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gamingMuted hover:text-gamingOrange transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-1 md:gap-2">
          <Link 
            to="/rankings" 
            className="p-2 rounded-full transition-all hover:bg-gamingOrange/10 group hidden md:block"
            title="Rankings"
          >
            <Trophy className="w-5 h-5 text-gamingMuted group-hover:text-gamingOrange transition-colors" />
          </Link>
          <Link 
            to="/blog" 
            className="p-2 rounded-full transition-all hover:bg-gamingOrange/10 group hidden md:block"
            title="Blog"
          >
            <Newspaper className="w-5 h-5 text-gamingMuted group-hover:text-gamingOrange transition-colors" />
          </Link>
          <Link 
            to="/about" 
            className="p-2 rounded-full transition-all hover:bg-gamingOrange/10 group hidden md:block"
            title="Acerca de"
          >
            <Info className="w-5 h-5 text-gamingMuted group-hover:text-gamingOrange transition-colors" />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all hover:bg-gamingOrange/10"
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gamingMuted hover:text-gamingOrange transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-gamingMuted hover:text-gamingOrange transition-colors" />
            )}
          </button>
          <Link 
            to="/wishlist" 
            className="p-2 rounded-full transition-all hover:bg-gamingOrange/10 relative group"
            title="Mi lista de deseos"
          >
            <Heart className="w-6 h-6 text-gamingMuted group-hover:text-red-500 transition-colors" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gamingOrange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full transition-all hover:bg-gamingOrange/10">
            <User className="w-6 h-6 text-gamingMuted" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
