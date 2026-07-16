import { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ReviewForm = ({ gameId, onReviewAdded }) => {
  const { user, profile } = useAuth();
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [hoverScore, setHoverScore] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (score === 0 || !text.trim()) {
      addToast('Selecciona un puntaje y escribe tu reseña', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        game_id: parseInt(gameId),
        user_id: user.id,
        user_name: profile?.display_name || user.email?.split('@')[0] || 'Anónimo',
        score: score,
        text: text.trim(),
      });

      if (error) throw error;

      addToast('¡Reseña publicada!', 'success');
      setIsOpen(false);
      setScore(0);
      setText('');
      onReviewAdded?.();
    } catch (err) {
      console.error('Error posting review:', err);
      addToast('Error al publicar reseña', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 rounded-xl border border-dashed border-gamingOrange/30 text-gamingOrange font-bold uppercase tracking-widest text-sm hover:bg-gamingOrange/10 transition-all"
      >
        + Escribir reseña
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-gamingCard rounded-2xl p-6 border border-gamingOrange/20 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Tu Reseña</h4>
                <button type="button" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Puntaje:</span>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setHoverScore(i + 1)}
                      onMouseLeave={() => setHoverScore(0)}
                      onClick={() => setScore(i + 1)}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < (hoverScore || score)
                            ? 'fill-gamingOrange text-gamingOrange'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {score > 0 && (
                  <span className="text-sm font-black text-gamingOrange">{score}/10</span>
                )}
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu opinión sobre este juego..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange resize-none transition-colors"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || score === 0 || !text.trim()}
                  className="px-4 py-2 rounded-lg bg-gamingOrange text-white font-bold text-sm uppercase tracking-wider hover:bg-gamingOrange/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Enviando...' : 'Publicar'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewForm;
