import { Link } from 'react-router-dom';
import { Gamepad2, Heart, ExternalLink, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Gamepad2 className="w-7 h-7 text-gamingOrange group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-bold tracking-tighter uppercase italic">
                Pixel<span className="text-gamingOrange">Verdict</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Resenas honestas, scores reales. Tu guia definitiva para elegir el proximo juego.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Navegacion</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-gray-500 hover:text-gamingOrange text-sm transition-colors">
                Catalogo
              </Link>
              <Link to="/wishlist" className="text-gray-500 hover:text-gamingOrange text-sm transition-colors">
                Mi Lista de Deseados
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Comunidad</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-gamingOrange/20 hover:text-gamingOrange text-gray-500 transition-all" title="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-gamingOrange/20 hover:text-gamingOrange text-gray-500 transition-all" title="GitHub">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-gamingOrange/20 hover:text-gamingOrange text-gray-500 transition-all" title="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; 2026 PixelVerdict. Todos los derechos reservados.
          </p>
          <p className="text-gray-700 text-xs flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
