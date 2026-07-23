import { Link } from 'react-router-dom';
import { Gamepad2, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer className={`mt-20 border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Gamepad2 className="w-7 h-7 text-gamingOrange group-hover:rotate-12 transition-transform" />
              <span className={`text-lg font-bold tracking-tighter uppercase italic ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Critic<span className="text-gamingOrange">Pixel</span>
              </span>
            </Link>
            <p className={`text-sm leading-relaxed max-w-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              Resenas honestas, scores reales. Tu guia definitiva para elegir el proximo juego.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-gamingMuted'}`}>Navegacion</h4>
            <nav className="flex flex-col gap-2">
              {['Todos los Juegos', 'Catálogo', 'Comunidad', 'Foro', 'Grupos', 'Rankings', 'Blog & Noticias', 'Artículos', 'Guías de la Comunidad', 'Screenshots', 'Leaderboard', 'Mi Lista de Deseados', 'Calendario', 'Tráilers', 'Estadísticas', 'Acerca de'].map((item, i) => {
                const paths = ['/games', '/', '/community', '/community', '/groups', '/rankings', '/blog', '/articles', '/community-guides', '/screenshots', '/leaderboard', '/wishlist', '/releases', '/trailers', '/stats', '/about'];
                return (
                  <Link key={item} to={paths[i]} className={`text-sm transition-colors hover:text-gamingOrange ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                    {item}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
          <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-gamingMuted'}`}>
            &copy; 2026 CriticPixel. Todos los derechos reservados.
          </p>
          <p className={`text-xs flex items-center gap-1 ${isLight ? 'text-gray-400' : 'text-gamingMuted'}`}>
            Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
