import { useState, useEffect } from 'react';
import { Bell, BellRing, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { usePriceAlerts } from '../hooks/usePriceAlerts';

const PriceAlert = ({ game }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { hasActiveAlert, createAlert, removeAlert } = usePriceAlerts();
  const isLight = theme === 'light';
  const [isActive, setIsActive] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setIsActive(hasActiveAlert(game.id));
  }, [game.id, hasActiveAlert]);

  const handleToggle = async () => {
    if (!user) return;
    setSaving(true);
    if (isActive) {
      const { error } = await removeAlert(game.id);
      if (!error) setIsActive(false);
    } else {
      const { error } = await createAlert(game.id, game.price || 0);
      if (!error) setIsActive(true);
    }
    setSaving(false);
  };

  return (
    <div className={`rounded-xl border p-4 ${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isActive ? (
            <BellRing className="w-5 h-5 text-gamingOrange" />
          ) : (
            <Bell className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Alerta de Precio
            </h4>
            <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              {isActive
                ? `Te notificamos si baja de $${game.price?.toLocaleString('es-MX') || '---'} MXN`
                : 'Recibe una notificación cuando el precio baje'}
            </p>
          </div>
        </div>

        {!user ? (
          <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
            Inicia sesión
          </span>
        ) : isActive ? (
          <button
            onClick={handleToggle}
            disabled={saving}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            <X className="w-3 h-3" />
            Desactivar
          </button>
        ) : (
          <button
            onClick={handleToggle}
            disabled={saving}
            className="flex items-center gap-1 px-3 py-1.5 bg-gamingOrange/10 text-gamingOrange rounded-lg text-xs font-bold hover:bg-gamingOrange/20 transition-colors disabled:opacity-50"
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
