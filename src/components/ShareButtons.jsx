import { Share2, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ShareButtons = ({ game }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const shareUrl = `${window.location.origin}/game/${game.id}`;
  const shareText = `¡Mira esta reseña de ${game.title} en CriticPixel! Score: ${game.globalScore}/10`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
          isLight
            ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            : 'bg-gamingCard text-gray-400 border border-white/10 hover:text-white hover:border-gamingOrange/30'
        }`}
      >
        <Share2 className="w-4 h-4" />
        Compartir
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute right-0 mt-2 w-52 rounded-xl shadow-2xl z-20 overflow-hidden border ${
              isLight ? 'bg-white border-gray-200' : 'bg-gamingCard border-white/10'
            }`}
          >
            <button
              onClick={() => { shareOnTwitter(); setShowMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              Twitter / X
            </button>
            <button
              onClick={() => { shareOnFacebook(); setShowMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              Facebook
            </button>
            <button
              onClick={() => { handleCopyLink(); setShowMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4 text-gamingOrange" />}
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButtons;
