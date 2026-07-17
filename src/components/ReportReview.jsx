import { useState } from 'react';
import { Flag, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const reportReasons = [
  { value: 'spam', label: 'Spam' },
  { value: 'harassment', label: 'Acoso' },
  { value: 'inappropriate', label: 'Contenido inapropiado' },
  { value: 'spoiler', label: 'Spoiler sin advertencia' },
  { value: 'fake', label: 'Reseña falsa' },
  { value: 'other', label: 'Otro' },
];

const ReportReview = ({ reviewId }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason || !user) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('review_reports').insert({
      review_id: reviewId,
      reporter_id: user.id,
      reason,
      description,
    });

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setReason('');
        setDescription('');
      }, 2000);
    }
    setIsSubmitting(false);
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
      >
        <Flag className="w-3 h-3" /> Reportar
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gamingCard rounded-2xl border border-white/10 shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gamingOrange mx-auto mb-3" />
                  <p className="text-white font-bold">Reporte enviado</p>
                  <p className="text-sm text-gray-500 mt-1">Gracias, revisaremos tu reporte pronto.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Flag className="w-4 h-4 text-red-400" /> Reportar Reseña
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1">Razón</label>
                      <div className="grid grid-cols-2 gap-2">
                        {reportReasons.map((r) => (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => setReason(r.value)}
                            className={`text-xs px-3 py-2 rounded-lg border transition-colors text-left ${
                              reason === r.value
                                ? 'border-red-400 bg-red-400/10 text-red-400'
                                : 'border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1">Descripción (opcional)</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Detalles adicionales..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-400/50 resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={!reason || isSubmitting}
                        className="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-500/80 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReportReview;
