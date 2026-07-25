import { Search, User, Gamepad2, Heart, X, Trophy, Newspaper, Info, Sun, Moon, Calendar, Film, LogOut, Shield, Bell, Menu, ChevronRight, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const menuRef = useRef(null);
  const notifRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { count } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, isAdmin, signOut } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setShowMobileMenu(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    if (localQuery.trim()) navigate('/search?q=' + encodeURIComponent(localQuery.trim()));
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
      if (e.key === 'Escape') inputRef.current?.blur();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { to: '/games', label: 'Juegos', icon: Gamepad2 },
    { to: '/community', label: 'Comunidad', icon: Users },
    { to: '/rankings', label: 'Rankings', icon: Trophy },
    { to: '/blog', label: 'Blog', icon: Newspaper },
    { to: '/releases', label: 'Calendario', icon: Calendar },
    { to: '/trailers', label: 'Tráilers', icon: Film },
    { to: '/about', label: 'Acerca de', icon: Info },
  ];

  return (
    <nav className="bg-gamingBg/80 dark:bg-gamingBg/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 px-4 py-3"
         style={theme === 'light' ? { backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,0,0,0.08)' } : {}}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={clearSearch}>
          <Gamepad2 className="w-8 h-8 text-gamingOrange group-hover:rotate-12 transition-transform" />
          <span className={`text-xl font-bold tracking-tighter uppercase italic ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Critic<span className="text-gamingOrange">Pixel</span>
          </span>
        </Link>

        {/* Barra de Búsqueda - Desktop */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md relative hidden md:block">
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gamingOrange transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleChange}
            placeholder="Buscar juegos... (/)"
            className={`w-full rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:border-gamingOrange transition-colors ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                : 'bg-gamingCard border-white/5 text-white'
            }`}
          />
          {localQuery && (
            <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gamingOrange transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Desktop nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`p-2 hover:bg-white/5 rounded-full transition-colors group hidden lg:block ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
              title={link.label}
            >
              <link.icon className={`w-5 h-5 group-hover:text-gamingOrange transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className={`p-2 hover:bg-white/5 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-400 hover:text-gamingOrange transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 hover:text-gamingOrange transition-colors" />
            )}
          </button>

          <Link
            to="/wishlist"
            className={`p-2 hover:bg-white/5 rounded-full transition-colors relative group ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
            title="Mi lista de deseos"
          >
            <Heart className={`w-6 h-6 group-hover:text-red-500 transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gamingOrange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Notifications */}
          {user && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 hover:bg-white/5 rounded-full transition-colors relative ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
                title="Notificaciones"
              >
                <Bell className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gamingCard border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="font-bold text-white text-sm">Notificaciones</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-xs text-gamingOrange hover:underline">
                        Marcar todo leído
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markAsRead(notif.id);
                            if (notif.link) navigate(notif.link);
                            setShowNotifications(false);
                          }}
                          className={`px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                            !notif.read ? 'bg-gamingOrange/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-gamingOrange mt-1.5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-white truncate">{notif.title}</p>
                              <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <Bell className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No hay notificaciones</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User menu / Login */}
          <div className="relative" ref={menuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`p-2 hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
                >
                  <div className="w-7 h-7 rounded-full bg-gamingOrange/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-gamingOrange">
                      {(profile?.display_name || user.email)?.[0]?.toUpperCase()}
                    </span>
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gamingCard border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="font-bold text-white text-sm truncate">{profile?.display_name || 'Usuario'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      <User className="w-4 h-4" /> Mi perfil
                    </Link>
                    <Link to="/wishlist" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      <Heart className="w-4 h-4" /> Mi lista de deseos
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gamingOrange hover:bg-gamingOrange/10 transition-colors">
                        <Shield className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={() => { signOut(); setShowUserMenu(false); navigate('/'); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className={`p-2 hover:bg-white/5 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-gray-100' : ''}`} title="Iniciar sesión">
                <User className={`w-6 h-6 ${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`p-2 hover:bg-white/5 rounded-full transition-colors lg:hidden ${theme === 'light' ? 'hover:bg-gray-100' : ''}`}
          >
            <Menu className={`w-6 h-6 ${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden mt-4 border-t border-white/10 pt-4" ref={mobileMenuRef}>
          <form onSubmit={handleSubmit} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={localQuery}
              onChange={handleChange}
              placeholder="Buscar juegos..."
              className={`w-full rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gamingOrange transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                  : 'bg-gamingCard border border-white/5 text-white'
              }`}
            />
          </form>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-bold">{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
