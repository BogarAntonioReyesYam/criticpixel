import { Link } from 'react-router-dom';
import { Gamepad2, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="mt-20 transition-all duration-300"
            style={{ 
              borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
            }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Gamepad2 className="w-7 h-7 text-gamingOrange group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-bold tracking-tighter uppercase italic text-gamingText dark:text-white">
                Pixel<span className="text-gamingOrange">Verdict</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gamingMuted">
              Resenas honestas, scores reales. Tu guia definitiva para elegir el proximo juego.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gamingMuted">Navegacion</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm transition-colors text-gamingMuted hover:text-gamingOrange">
                Catalogo
              </Link>
              <Link to="/rankings" className="text-sm transition-colors text-gamingMuted hover:text-gamingOrange">
                Rankings
              </Link>
              <Link to="/blog" className="text-sm transition-colors text-gamingMuted hover:text-gamingOrange">
                Blog & Noticias
              </Link>
              <Link to="/wishlist" className="text-sm transition-colors text-gamingMuted hover:text-gamingOrange">
                Mi Lista de Deseados
              </Link>
              <Link to="/about" className="text-sm transition-colors text-gamingMuted hover:text-gamingOrange">
                Acerca de
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ 
               borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
             }}>
          <p className="text-xs text-gamingMuted">
            &copy; 2026 PixelVerdict. Todos los derechos reservados.
          </p>
          <p className="text-xs flex items-center gap-1 text-gamingMuted">
            Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
