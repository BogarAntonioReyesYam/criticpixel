import { useState, useCallback, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X, Heart, HeartOff } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ToastContext = createContext();

const icons = {
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  wishlist: <Heart className="w-4 h-4 text-red-500 fill-red-500" />,
  unwishlist: <HeartOff className="w-4 h-4 text-gamingMuted" />,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const { theme } = useTheme();

  const addToast = useCallback((message, type = 'success', duration = 2500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 min-w-[220px]"
              style={{ 
                backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: theme === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.4)' 
                  : '0 8px 32px rgba(0,0,0,0.12)'
              }}
            >
              {icons[toast.type] || icons.success}
              <span className="text-sm font-medium text-gamingText dark:text-gray-200">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto text-gamingMuted hover:text-gamingOrange transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
