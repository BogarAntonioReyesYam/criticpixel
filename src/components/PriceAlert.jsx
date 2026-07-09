import { useState } from 'react';
import { Bell, BellRing, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PriceAlert = ({ game }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
            <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              Recibe una notificación cuando el precio baje
            </p>
          </div>
        </div>

        {isAlertActive ? (
          <button
            onClick={() => setIsAlertActive(false)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsAlertActive(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gamingOrange/10 text-gamingOrange rounded-lg text-xs font-bold hover:bg-gamingOrange/20 transition-colors"
          >
            <Bell className="w-3 h-3" />
            Activar
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceAlert;
