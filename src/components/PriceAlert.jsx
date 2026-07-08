import { useState } from 'react';
import { Bell, BellRing, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PriceAlert = ({ game }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleSetAlert = () => {
    if (targetPrice && Number(targetPrice) > 0) {
      setIsAlertActive(true);
      setShowInput(false);
    }
  };

  const handleRemoveAlert = () => {
    setIsAlertActive(false);
    setTargetPrice('');
  };

  return (
    <div className={`rounded-xl border p-4 ${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAlertActive ? (
            <BellRing className="w-5 h-5 text-gamingOrange" />
          ) : (
            <Bell className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Alerta de Precio
            </h4>
            {isAlertActive ? (
              <p className="text-xs text-gamingOrange font-bold">
                Te avisaremos cuando baje de ${Number(targetPrice).toLocaleString()}
              </p>
            ) : (
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                Recibe una notificación cuando el precio baje
              </p>
            )}
          </div>
        </div>

        {isAlertActive ? (
          <button
            onClick={handleRemoveAlert}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowInput(!showInput)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gamingOrange/10 text-gamingOrange rounded-lg text-xs font-bold hover:bg-gamingOrange/20 transition-colors"
          >
            <Bell className="w-3 h-3" />
            Activar
          </button>
        )}
      </div>

      <AnimatePresence>
        {showInput && !isAlertActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 flex gap-2"
          >
            <div className="flex-1 relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${isLight ? 'text-gray-400' : 'text-gamingMuted'}`}>
                $
              </span>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Precio objetivo"
                className={`w-full pl-7 pr-3 py-2 rounded-lg text-sm font-bold focus:outline-none focus:border-gamingOrange transition-colors ${
                  isLight
                    ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'
                    : 'bg-white/5 border border-white/10 text-white placeholder-gamingMuted'
                }`}
              />
            </div>
            <button
              onClick={handleSetAlert}
              className="px-4 py-2 bg-gamingOrange text-white rounded-lg text-sm font-bold hover:bg-gamingOrange/90 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceAlert;
